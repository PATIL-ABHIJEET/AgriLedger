const modal = document.getElementById("saleModal");

const addBtn = document.getElementById("addSaleBtn");

const closeBtn = document.getElementById("closeSaleModal");

const saveBtn = document.getElementById("saveSale");

const grid = document.getElementById("salesGrid");


// Open modal

addBtn.onclick = () => {

    modal.style.display = "flex";

};


// Close modal

closeBtn.onclick = () => {

    modal.style.display = "none";

};


// Close by clicking outside

window.onclick = (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

};


// Save Sale

saveBtn.onclick = () => {

    const crop =
        document.getElementById("saleCrop").value;

    const quantity =
        document.getElementById("saleQuantity").value;

    const amount =
        document.getElementById("saleAmount").value;

    const date =
        document.getElementById("saleDate").value;

    const buyer =
        document.getElementById("buyerName").value;


    if(crop === "" || quantity === "" || amount === ""){

        alert("Please complete all required fields.");

        return;

    }


    const card = document.createElement("div");

    card.className = "sale-card";


    card.innerHTML = `

        <h2>🌾 ${crop}</h2>

        <p>
            <strong>Quantity:</strong>
            ${quantity} Tons
        </p>

        <p class="sale-amount">
            ₹ ${Number(amount).toLocaleString("en-IN")}
        </p>

        <p>
            <strong>Buyer:</strong>
            ${buyer || "Not specified"}
        </p>

        <p>
            <strong>Date:</strong>
            ${date || "Not specified"}
        </p>

        <button class="delete-sale">
            Delete
        </button>

    `;


    grid.appendChild(card);


    attachDelete(
        card.querySelector(".delete-sale")
    );


    saveData();

    updateSummary();


    modal.style.display = "none";


    // Clear form

    document.getElementById("saleCrop").value = "";

    document.getElementById("saleQuantity").value = "";

    document.getElementById("saleAmount").value = "";

    document.getElementById("saleDate").value = "";

    document.getElementById("buyerName").value = "";

};


// Delete

function attachDelete(button){

    button.addEventListener("click", () => {

        if(confirm("Delete this sale?")){

            button.closest(".sale-card").remove();

            saveData();

            updateSummary();

        }

    });

}


// Local Storage

function saveData(){

    localStorage.setItem(
        "salesData",
        grid.innerHTML
    );

}


// Load

function loadData(){

    const data =
        localStorage.getItem("salesData");


    if(data){

        grid.innerHTML = data;


        document
            .querySelectorAll(".delete-sale")
            .forEach(button => {

                attachDelete(button);

            });

    }


    updateSummary();

}


// Summary

function updateSummary(){

    const cards =
        document.querySelectorAll(".sale-card");


    let total = 0;


    cards.forEach(card => {

        const amount =
            card
                .querySelector(".sale-amount")
                .innerText
                .replace("₹","")
                .replace(/,/g,"")
                .trim();


        total += Number(amount);

    });


    document.getElementById("totalSales").innerText =

        "₹" + total.toLocaleString("en-IN");


    document.getElementById("totalTransactions").innerText =

        cards.length;

}


// Search

const search =
    document.getElementById("searchSale");


search.addEventListener("keyup", () => {

    const value =
        search.value.toLowerCase();


    document
        .querySelectorAll(".sale-card")
        .forEach(card => {

            const crop =
                card
                    .querySelector("h2")
                    .innerText
                    .toLowerCase();


            card.style.display =
                crop.includes(value)
                ? "block"
                : "none";

        });

});


// Crop Filter

const saleFilter =
    document.getElementById("saleFilter");


saleFilter.addEventListener("change", () => {

    const value =
        saleFilter.value.toLowerCase();


    document
        .querySelectorAll(".sale-card")
        .forEach(card => {

            const crop =
                card
                    .querySelector("h2")
                    .innerText
                    .toLowerCase();


            if(
                value === "all crops" ||
                crop.includes(value)
            ){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

});


// Start

loadData();