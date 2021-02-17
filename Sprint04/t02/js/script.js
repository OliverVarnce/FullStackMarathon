let headers = ["Name", "Strength", "Age"];

let tr = [
        { name: "Black Panther", strength: 66, age: 53 },
        { name: "Captain America", strength: 79, age: 137 },
        { name: "Captain Marvel", strength: 97, age: 26 },
        { name: "Hulk", strength: 80, age: 49 },
        { name: "Iron Man", strength: 88, age: 48 },
        { name: "Spider-man", strength: 78, age: 16 },
        { name: "Thanos", strength: 99, age: 1000 },
        { name: "Thor", strength: 95, age: 1000 },
        { name: "Yon-Rogg", strength: 73, age: 52 },
];

function renderTable(row, cell, parrent) {
    let parrentVar = document.getElementsByTagName(parrent)[0];
    let tbl = document.createElement("table");

    for (let i = 0; i < cell; i++) {
        let th = document.createElement("th");
        tbl.appendChild(th);
    }
    for (let j = 0; j < row - 1; j++) {
        let tr = document.createElement("tr");
        tbl.appendChild(tr);
        for (let k = 0; k < cell; k++) {
            let td = document.createElement("td");
            tr.appendChild(td);
        }
    }
    parrentVar.appendChild(tbl);
}

renderTable(10, 3, "main");

let th = document.getElementsByTagName("th");

for (let i = 0; i < th.length; i++) {
    document.getElementsByTagName("th")[i].id = "headrow" + i;
    document.getElementsByTagName("th")[i].textContent += headers[i];
}

let td = document.getElementsByTagName("td");

for (let k = 0; k < td.length; k += 3) {
    document.getElementsByTagName("td")[k].classList.add("name");
}

for (let k = 1; k < td.length; k += 3) {
    document.getElementsByTagName("td")[k].classList.add("strength");
}

for (let k = 2; k < td.length; k += 3) {
    document.getElementsByTagName("td")[k].classList.add("age");
}

function fillTable() {
    for (let j = 0; j < td.length / 3; j++) {
        document.getElementsByClassName("name")[j].textContent = tr[j].name;
        document.getElementsByClassName("strength")[j].textContent =
            tr[j].strength;
        document.getElementsByClassName("age")[j].textContent = tr[j].age;
    }
}

fillTable();

let sortValue = "Name";
let orderValue = 'ASC';
let propCounter = 0;
let main = document.getElementsByTagName("main")[0];
let serviceDiv = document.createElement("div");
main.appendChild(serviceDiv);
document.getElementsByTagName("div")[2].classList.add("sort");
serviceDiv.textContent = "Sorting by " + sortValue + ", order: " + orderValue;

function serviceMessage() {
    if (propCounter === 0) {
        orderValue = "ASC";
    }
    if (propCounter === 1) {
        orderValue = "DESC";
    }
    serviceDiv.textContent = "Sorting by " + sortValue + ", order: " + orderValue;
}

//sorter
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
        v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
)(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

document.querySelectorAll('th')
    .forEach(th => th.addEventListener('click', (() => {
        const table = th.closest('table');

        Array.from(table.querySelectorAll('tr:nth-child(n + 2)'))
            .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
            .forEach(tr => table.appendChild(tr));
        serviceMessage();
    if (propCounter === 0) {
        propCounter++;
    } else {
        propCounter--;
    }
})));

//sortings
document.getElementById("headrow0").onclick = () => {
    sortValue = "Name";
};

document.getElementById("headrow1").onclick = () => {
    sortValue = "Strenght";
};

document.getElementById("headrow2").onclick = () => {
    sortValue = "Age";
};





