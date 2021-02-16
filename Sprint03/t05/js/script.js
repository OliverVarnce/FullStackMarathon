'use strict'

console.log("========= Start of map ========");

let n1 = {name: "Daniel"};
let n2 = {name: "John"};
let n3 = {name: "Patrick"};
let n4 = {name: "Isabella"};
let n5 = {name: "Jake"};

let guestList = new WeakMap();

guestList.set(n1, "invited").set(n2, "invited").set(n3, "invited")
         .set(n4, "invited").set(n5, "invited");

console.log("has ", guestList.has(n1)); // true
console.log("size ", guestList.size); // undefined
console.log("delete ", guestList.delete(n2)); // true
//console.log(guestList.clear()); //doesn't work
console.log("clear collection does not work"); //doesn't work
console.log("========= End of map ========");

console.log(" ");
console.log("========= Start to set ========");

let menu = new Set();

let item1 = {name: "Vobla", price: 200}
let item2 = {name: "Korushka", price: 230}
let item3 = {name: "Skat", price: 380}
let item4 = {name: "oysters", price: 180}
let item5 = {name: "Crab", price: 430}

menu.add(item1).add(item2).add(item3).add(item4).add(item5);

console.log("items in menu ", menu.size); // only 5 unique (contains a list of unique dishes and their prices)
menu.forEach((dish) => {
    console.log(dish.name + " - " + dish.price + " coins");
});
console.log("========= End of set ========");

console.log(" ");
console.log("======== Start of weakmap ========");

let vault1 = { id: 1 };
let vault2 = { id: 2 };
let vault3 = { id: 3 };
let vault4 = { id: 4 };
let vault5 = { id: 5 };

let bankVault = new WeakMap([
    [vault1, { owner: "Daniel" }],
    [vault2, { owner: "John" }],
    [vault3, { owner: "Patrick" }],
    [vault4, { owner: "Isabella" }],
    [vault5, { owner: "Jake" }],
]);
console.log(bankVault.get(vault1));
console.log(bankVault.get(vault2));
console.log(bankVault.get(vault3));
console.log(bankVault.get(vault4));
console.log(bankVault.get(vault5));

console.log("======== End of weakmap ========");
console.log(" ");
console.log("======== Start of weakset ========");


let coin1 = { value: 1 };
let coin2 = { value: "usd" };
let coin3 = { value: 2 };
let coin4 = { value: 3 };
let coin5 = { value: 4 };

let coinCollection = new WeakSet();

coinCollection
    .add(coin1)
    .add(coin2)
    .add(coin3)
    .add(coin3)
    .add(coin5)
    .add(coin4);
console.log(coinCollection);

console.log("======== End of weakset ========");