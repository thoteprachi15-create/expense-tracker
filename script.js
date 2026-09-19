const form=document.getElementById("expenseForm");
const list=document.getElementById("transactionList");

const balance=document.getElementById("balance");
const income=document.getElementById("income");
const expense=document.getElementById("expense");

let transactions=JSON.parse(localStorage.getItem("transactions")) || [];

let editIndex=-1;

display();

form.addEventListener("submit",function(e){

e.preventDefault();

const transaction={

title:title.value,
amount:Number(amount.value),
category:category.value,
date:date.value,
type:type.value

};

if(editIndex===-1){

transactions.push(transaction);

}else{

transactions[editIndex]=transaction;
editIndex=-1;

}

localStorage.setItem("transactions",JSON.stringify(transactions));

form.reset();

display();

});

function display(){

list.innerHTML="";

let incomeTotal=0;
let expenseTotal=0;

transactions.forEach((item,index)=>{

if(item.type==="income"){

incomeTotal+=item.amount;

}else{

expenseTotal+=item.amount;

}

list.innerHTML+=`

<tr>

<td>${item.title}</td>

<td>₹${item.amount}</td>

<td>${item.category}</td>

<td>${item.date}</td>

<td>${item.type}</td>

<td>

<button class="edit" onclick="editTransaction(${index})">

<i class="fa-solid fa-pen"></i>

</button>

<button class="delete" onclick="deleteTransaction(${index})">

<i class="fa-solid fa-trash"></i>

</button>

</td>

</tr>

`;

});

income.textContent="₹"+incomeTotal;
expense.textContent="₹"+expenseTotal;
balance.textContent="₹"+(incomeTotal-expenseTotal);

}

function deleteTransaction(index){

transactions.splice(index,1);

localStorage.setItem("transactions",JSON.stringify(transactions));

display();

}

function editTransaction(index){

let item=transactions[index];

title.value=item.title;
amount.value=item.amount;
category.value=item.category;
date.value=item.date;
type.value=item.type;

editIndex=index;

}

document.getElementById("search").addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const rows=list.getElementsByTagName("tr");

Array.from(rows).forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)?"":"none";

});

});

document.getElementById("filter").addEventListener("change",function(){

const value=this.value;

const rows=list.getElementsByTagName("tr");

transactions.forEach((item,index)=>{

if(value==="all" || item.type===value){

rows[index].style.display="";

}else{

rows[index].style.display="none";

}

});

});