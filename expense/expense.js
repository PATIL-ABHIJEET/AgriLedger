const modal=document.getElementById("expenseModal");

const addBtn=document.getElementById("addExpenseBtn");

const closeBtn=document.getElementById("closeModal");

const saveBtn=document.getElementById("saveExpense");

const grid=document.getElementById("expenseGrid");

addBtn.onclick=()=>{

modal.style.display="flex";

}

closeBtn.onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

}

saveBtn.onclick=()=>{

const title=document.getElementById("expenseTitle").value;

const amount=document.getElementById("expenseAmount").value;

const category=document.getElementById("expenseCategory").value;

const date=document.getElementById("expenseDate").value;

const note=document.getElementById("expenseNote").value;

if(title===""||amount===""||category===""){

alert("Please fill all fields");

return;

}

const card=document.createElement("div");

card.className="expense-card";

card.innerHTML=`

<h2>${title}</h2>

<p><strong>₹ ${amount}</strong></p>

<p class="category">${category}</p>

<p>${date}</p>

<p>${note}</p>

<div class="buttons">

<button class="delete">

Delete

</button>

</div>

`;

grid.appendChild(card);

attachDelete(card.querySelector(".delete"));

updateSummary();

saveData();

showToast("Expense Added");

modal.style.display="none";

document.getElementById("expenseTitle").value="";
document.getElementById("expenseAmount").value="";
document.getElementById("expenseCategory").value="";
document.getElementById("expenseDate").value="";
document.getElementById("expenseNote").value="";

}

function saveData(){

localStorage.setItem("expenses",grid.innerHTML);

}

function loadData(){

const data=localStorage.getItem("expenses");

if(data){

grid.innerHTML=data;

document.querySelectorAll(".delete").forEach(btn=>{

attachDelete(btn);

});

updateSummary();

}

}

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},2000);

}

loadData();

function attachDelete(button){

button.addEventListener("click",()=>{

if(confirm("Delete this expense?")){

button.closest(".expense-card").remove();

saveData();

updateSummary();

}

});

}

function updateSummary(){

const cards=document.querySelectorAll(".expense-card");

let total=0;

cards.forEach(card=>{

const amount=card.querySelector("strong")
.innerText
.replace("₹","")
.trim();

total+=Number(amount);

});

document.getElementById("totalExpense").innerHTML="₹"+total;

document.getElementById("totalRecords").innerHTML=cards.length;

}

const search=document.getElementById("searchExpense");

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".expense-card").forEach(card=>{

const title=card.querySelector("h2").innerText.toLowerCase();

card.style.display=title.includes(value)?"block":"none";

});

});

const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", () => {

    const value = categoryFilter.value.toLowerCase();

    document.querySelectorAll(".expense-card").forEach(card => {

        const category = card
            .querySelector(".category")
            .innerText
            .toLowerCase();

        if (value === "all categories" || category === value) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});

const ctx = document.getElementById("expenseChart");

new Chart(ctx, {

    type: "doughnut",

    data: {

        labels: [
            "Seeds",
            "Fertilizer",
            "Labor",
            "Fuel",
            "Machinery"
        ],

        datasets: [{
            data: [12000, 8000, 15000, 5000, 7000]
        }]

    },

    options: {

        responsive: true,

        plugins: {

            legend: {
                position: "bottom"
            }

        }

    }

});