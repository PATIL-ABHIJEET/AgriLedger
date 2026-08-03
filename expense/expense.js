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

<p>${category}</p>

<p>${date}</p>

<p>${note}</p>

`;

grid.appendChild(card);

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