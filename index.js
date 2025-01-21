import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

const firebaseConfig = {
  dataBaseURL: "https://leads--tracker-default-rtdb.firebaseio.com",
  projectId: "leads--tracker",
};

const app = initializeApp(firebaseConfig);
const inputBtn = document.getElementById("input-btn");
const database = getDatabase(app);
console.log(database);
console.log(firebaseConfig.databaseURL);

let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");
console.log(localStorage.getItem(myLeads));

const deleteBtn = document.getElementById("delete-btn");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render();
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `;
  }
  ulEl.innerHTML = listItems;
}
deleteBtn.addEventListener("dblclick", function () {
  console.log("double clicked!");
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  // Save the myLeads array to localStorage
  // PS: remember JSON.stringify()
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);

  // To verify that it works:
  console.log(localStorage.getItem("myLeads"));
});
