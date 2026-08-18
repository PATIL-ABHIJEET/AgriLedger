const modal = document.getElementById("inventoryModal");

const addBtn = document.getElementById("addInventoryBtn");

const closeBtn = document.getElementById("closeInventoryModal");

const saveBtn = document.getElementById("saveInventory");

const grid = document.getElementById("inventoryGrid");


// Open Modal
addBtn.onclick = () => {

    modal.style.display = "flex";

};


// Close Modal
closeBtn.onclick = () => {

    modal.style.display = "none";

};


// Close when clicking outside
window.onclick = (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

};


// Add Inventory
saveBtn.onclick = () => {

    const name =
        document.getElementById("itemName").value.trim();

    const category =
        document.getElementById("itemCategory").value;

    const quantity =
        document.getElementById("itemQuantity").value;

    const unit =
        document.getElementById("itemUnit").value.trim();

    const price =
        document.getElementById("itemPrice").value;


    if (
        name === "" ||
        category === "" ||
        quantity === "" ||
        unit === "" ||
        price === ""
    ) {

        alert("Please complete all fields.");

        return;

    }


    const totalValue =
        Number(quantity) * Number(price);


    const card =
        document.createElement("div");

    card.className = "inventory-card";


    card.innerHTML = `

        <h2>📦 ${name}</h2>

        <p>
            <strong>Category:</strong>
            ${category}
        </p>

        <p>
            <strong>Stock:</strong>
            ${quantity} ${unit}
        </p>

        <p>
            <strong>Price / Unit:</strong>
            ₹${Number(price).toLocaleString("en-IN")}
        </p>

        <p class="stock-value">
            Stock Value:
            ₹${totalValue.toLocaleString("en-IN")}
        </p>

        ${
            Number(quantity) <= 10
            ?
            `<span class="low-stock">
                ⚠ Low Stock
            </span>`
            :
            ""
        }

        <div class="inventory-actions">

            <button class="delete-item">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>

        </div>

    `;


    grid.appendChild(card);


    attachDelete(
        card.querySelector(".delete-item")
    );


    saveData();

    updateSummary();


    modal.style.display = "none";


    // Clear form

    document.getElementById("itemName").value = "";

    document.getElementById("itemCategory").value = "";

    document.getElementById("itemQuantity").value = "";

    document.getElementById("itemUnit").value = "";

    document.getElementById("itemPrice").value = "";

};


// Delete Inventory
function attachDelete(button) {

    button.addEventListener("click", () => {

        if (confirm("Delete this inventory item?")) {

            button
                .closest(".inventory-card")
                .remove();

            saveData();

            updateSummary();

        }

    });

}


// Save to Local Storage
function saveData() {

    localStorage.setItem(
        "inventoryData",
        grid.innerHTML
    );

}


// Load from Local Storage
function loadData() {

    const data =
        localStorage.getItem("inventoryData");


    if (data) {

        grid.innerHTML = data;


        document
            .querySelectorAll(".delete-item")
            .forEach(button => {

                attachDelete(button);

            });

    }


    updateSummary();

}


// Update Summary
function updateSummary() {

    const cards =
        document.querySelectorAll(".inventory-card");


    let totalValue = 0;

    let lowStock = 0;


    cards.forEach(card => {

        const value =
            card
                .querySelector(".stock-value")
                .innerText
                .replace("Stock Value:", "")
                .replace("₹", "")
                .replace(/,/g, "")
                .trim();


        totalValue += Number(value);


        if (
            card.querySelector(".low-stock")
        ) {

            lowStock++;

        }

    });


    document.getElementById("totalItems").innerText =
        cards.length;


    document.getElementById("totalValue").innerText =
        "₹" + totalValue.toLocaleString("en-IN");


    document.getElementById("lowStock").innerText =
        lowStock;

}


// Search Inventory
const search =
    document.getElementById("searchInventory");


search.addEventListener("keyup", () => {

    const value =
        search.value.toLowerCase();


    document
        .querySelectorAll(".inventory-card")
        .forEach(card => {

            const name =
                card
                    .querySelector("h2")
                    .innerText
                    .toLowerCase();


            card.style.display =
                name.includes(value)
                ? "block"
                : "none";

        });

});


// Category Filter
const filter =
    document.getElementById("inventoryFilter");


filter.addEventListener("change", () => {

    const value =
        filter.value.toLowerCase();


    document
        .querySelectorAll(".inventory-card")
        .forEach(card => {

            const category =
                card
                    .querySelectorAll("p")[0]
                    .innerText
                    .replace("Category:", "")
                    .trim()
                    .toLowerCase();


            if (
                value === "all items" ||
                category === value
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

});


// Start Application
loadData();