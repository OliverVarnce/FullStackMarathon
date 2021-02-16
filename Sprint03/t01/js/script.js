let str = "Giant Spiders?   What’s next? Giant Snakes?";
//let str= ".  . . . ? . . . . .  . . . . . . ";

String.prototype.removeDuplicates = function() {
    let charArray = this.split(/\s+/);

    return charArray.filter((el, i, ar) => {
        return ar.indexOf(el) === i;
    }).join(" ");
}

str = str.removeDuplicates();
console.log(str);