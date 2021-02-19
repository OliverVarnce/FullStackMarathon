'use strict'

let animal;
let age;
let gender;
let status;

animal = prompt("What animal is the superhero most similar to?");
if (animal.length <= 20 && !animal.includes(" ") && animal !== "") {
    gender = prompt(
        "Is the superhero male of female Leave blank if unknown or other"
    );
    if (gender.match(/male/gim) || gender.match(/female/gim) || gender === "") {
        age = prompt("How old is the superhero?");
        if (age.match(/\b\d+\b/gim)) {
            if (gender.match(/male/gim) && age < 18) {
                status = "boy";
            }
            if (gender.match(/male/gim) && age >= 18) {
                status = "man";
            }
            if (gender.match(/female/gim) && age < 18) {
                status = "girl";
            }
            if (gender.match(/female/gim) && age >= 18) {
                status = "woman";
            }
            if (gender === "" && age < 18) {
                status = "kid";
            }
            if (gender === "" && age >= 18) {
                status = "man";
            }

            let result =
                "The superhero name is: " +
                animal.toLowerCase() +
                "-" +
                status +
                "!";
            alert(result);
        } else {
            alert("Wrong input");
        }
    } else {
        alert("Wrong input");
    }
} else {
    alert("Wrong input");
}