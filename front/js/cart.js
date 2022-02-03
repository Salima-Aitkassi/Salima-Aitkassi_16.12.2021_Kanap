//Recuperer la session
// recuperer le panier depuis la session getItem 
// Verifier si le panier est null ( reccuper le getelementby id la ou je veux afficher le message ) 
// a
//foreach sur le panier pour chaque produit avec lid sauvegardé dans la session 
// appel à l'api pour recup chaque produit a partir de son id cf product.js 

let productsInLocalStorage = JSON.parse(localStorage.getItem("panier"))
//console.log(productsInLocalStorage)

const productsInCart = document.querySelector(".cartAndFormContainer")

if (productsInLocalStorage === null) {
}

var totalProductsQuantity = 0
var totalProductsPrice = 0


productsInLocalStorage.forEach(productInStorage => {


    var product = fetch("http://localhost:3000/api/products/" + productInStorage.id)
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (product) {
            const sectionCartItems = document.getElementById("cart__items")

            const article = generateArticleHtml(product, productInStorage)
            sectionCartItems.appendChild(article)

            totalProductsQuantity += productInStorage.quantity
            totalProductsPrice += product.price * productInStorage.quantity

            document.getElementById("totalQuantity").textContent = totalProductsQuantity
            document.getElementById("totalPrice").textContent = totalProductsPrice



        })
        .catch(function (err) {
            console.log(err)
        });
    console.log(product)

});


console.log(totalProductsQuantity)
console.log(totalProductsPrice)




function generateArticleHtml(product, productInStorage) {

    //console.log(productInStorage.cart__item)
    //console.log(product)

    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.setAttribute("data-id", product._id)
    article.setAttribute("data-color", productInStorage.color)
    article.textContent = productInStorage.cart__item


    const divCartItemImg = document.createElement("div")
    divCartItemImg.classList.add("cart__item__img")


    const img = document.createElement("img")
    img.src = product.imageUrl
    img.setAttribute("alt", product.altTxt)


    const divCartItemContent = document.createElement("div")
    divCartItemContent.classList.add("cart__item__content")

    const divCartItemContentDescription = document.createElement("div")
    divCartItemContentDescription.classList.add("cart__item__content__description")

    const h2ProductName = document.createElement("h2")
    h2ProductName.textContent = product.name

    const pProductColor = document.createElement("p")
    pProductColor.textContent = productInStorage.color

    const pProductPrice = document.createElement("p")
    pProductPrice.textContent = product.price + " €"


    const divCartItemContentSettings = document.createElement("div")
    divCartItemContentSettings.classList.add("cart__item__content__settings")

    const divCartItemContentSettingsQuantity = document.createElement("div")
    divCartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity")

    const pProductQuantity = document.createElement("p")
    pProductQuantity.textContent = "Qté : "

    const inputProductQuantity = document.createElement("input")
    inputProductQuantity.classList.add("itemQuantity")
    inputProductQuantity.name = "itemQuantity"
    inputProductQuantity.type = "number"
    inputProductQuantity.value = productInStorage.quantity
    inputProductQuantity.setAttribute("min", 1)
    inputProductQuantity.setAttribute("max", 100)

    inputProductQuantity.addEventListener('change', event => {
        modifyQuantityInCart(event)
    })


    const divCartItemContentSettingsDelete = document.createElement("div")
    divCartItemContentSettingsDelete.classList.add("cart__item__content__setting__delete")

    const pDeleteProduct = document.createElement("p")
    pDeleteProduct.classList.add("deleteItem")
    pDeleteProduct.textContent = "Supprimer"




    divCartItemContentSettingsDelete.appendChild(pDeleteProduct)

    divCartItemContentSettingsQuantity.appendChild(pProductQuantity)
    divCartItemContentSettingsQuantity.appendChild(inputProductQuantity)

    divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity)
    divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete)

    divCartItemContentDescription.appendChild(h2ProductName)
    divCartItemContentDescription.appendChild(pProductColor)
    divCartItemContentDescription.appendChild(pProductPrice)

    divCartItemContent.appendChild(divCartItemContentDescription)
    divCartItemContent.appendChild(divCartItemContentSettings)

    divCartItemImg.appendChild(img)

    article.appendChild(divCartItemImg)
    article.appendChild(divCartItemContent)

    //article.appendChild(divCartItemContentSettings)

    return article
}

function modifyQuantityInCart(event) {
    console.log(event.target)

    let inputQuantity = event.target
    let articleProduct = inputQuantity.closest(".cart__item")
    let idProduct = articleProduct.getAttribute("data-id")
    let colorProduct = articleProduct.getAttribute("data-color")

    console.log(articleProduct)
    console.log(idProduct)
    console.log(colorProduct)

    let panier = JSON.parse(localStorage.getItem("panier"))

    panier.forEach(product => {
        if (product.id == idProduct && product.color == colorProduct) {
            product.quantity = parseInt(inputQuantity.value)
        }
    })
    localStorage.setItem("panier", JSON.stringify(panier))
    location.reload()
}