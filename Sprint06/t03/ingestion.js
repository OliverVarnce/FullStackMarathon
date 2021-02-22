let { Product } = require('./product');
let EatException = require('./eat-exception');

class Ingestion {
    constructor(meal,mealNumber) {
        this.meal = meal;
        this.mealNumber = mealNumber;
    }

    products = [];

    setProduct(product) {
        this.products.push(product);
    }

    getProductInfo(productName) {
        let product = {};
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].name == productName) {
                product.kcal = this.products[i].kcal_per_portion;
                break;
            }
        }
        return product
    }

    getFromFridge(productName) {
        for(let i = 0; i < this.products.length; i++){
            if(this.products[i].name == productName) {
                try { this.products[i].checkOnJunky();
                } catch (e) {
                    if(e instanceof EatException) {
                        e.message = `To many calories in ${productName} for ${this.meal}!`;
                        throw e;
                    }
                }
                break;
            }
        }
    }
}

module.exports.Ingestion = Ingestion;