//Recuperer la session
// recuperer le panier depuis la session getItem 
// Verifier si le panier est null ( reccuper le getelementby id la ou je veux afficher le message ) 
// a
//foreach sur le panier pour chaque produit avec lid sauvegardé dans la session 
// appel à l'api pour recup chaque produit a partir de son id cf product.js 

let productsInLocalStorage = JSON.parse(localStorage.getItem("panier"))
console.log(productsInLocalStorage)

const productsInCart = document.querySelector(".cartAndFormContainer")

if (productsInLocalStorage === null) {
}

//const panierVide = document.getElementById("cart__items")

productsInLocalStorage.forEach(productInStorage => {
    fetch("http://localhost:3000/api/products/" + productInStorage.id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (product) {
            displayProduct(product, productInStorage)


        })
        .catch(function (err) {
            console.log(err)
        });
});

function displayProduct(product, productInStorage) {

    console.log(productInStorage)
    console.log(product)

    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.textContent = productInStorage.cart__item

    const img = document.createElement("img")
    img.setAttribute("src", product.imageUrl)
    img.setAttribute("alt", product.altTxt)

    const h2 = document.createElement("h2")


}
