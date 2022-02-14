//Recuperer la session
// recuperer le panier depuis la session getItem 
// Verifier si le panier est null ( reccuper le getelementby id la ou je veux afficher le message ) 
// a
//foreach sur le panier pour chaque produit avec lid sauvegardé dans la session 
// appel à l'api pour recup chaque produit a partir de son id cf product.js 

productsInLocalStorage = JSON.parse(localStorage.getItem("panier"))
//console.log(productsInLocalStorage)

const productsInCart = document.querySelector(".cartAndFormContainer")
const orderButton = document.getElementById("order")
//console.log(orderButton)
orderButton.addEventListener('click', (event) => { submitOrder(event) })


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


// -------------- Affichage des articles dans le panier  ------------

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

    pDeleteProduct.addEventListener('click', (event) => { deleteItemLine(event) })



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
// --------------- Modifier la quantité ---------------------

function modifyQuantityInCart(event) {
    //console.log(event.target)

    let inputQuantity = event.target
    let articleProduct = inputQuantity.closest(".cart__item")
    let idProduct = articleProduct.getAttribute("data-id")
    let colorProduct = articleProduct.getAttribute("data-color")

    // console.log(articleProduct)
    //  console.log(idProduct)
    //console.log(colorProduct)

    let panier = JSON.parse(localStorage.getItem("panier"))

    panier.forEach(product => {
        if (product.id == idProduct && product.color == colorProduct) {
            product.quantity = parseInt(inputQuantity.value)
        }
    })
    localStorage.setItem("panier", JSON.stringify(panier))
    location.reload()
}

// ------------------- Supprimer un article -------------------

function deleteItemLine(event) {
    //console.log(event.target)
    let articleProduct = event.target.closest(".cart__item")
    let idProduct = articleProduct.getAttribute("data-id")
    let colorProduct = articleProduct.getAttribute("data-color")
    let panier = JSON.parse(localStorage.getItem("panier"))

    //console.log(panier[0])

    for (var i = 0; i < panier.length; i++) {
        var product = panier[i]
        console.log(product)

        if (product.id == idProduct && product.color == colorProduct) {
            panier.splice(i--, 1)
        }
    }
    localStorage.setItem("panier", JSON.stringify(panier))
    location.reload()
}

//----------- Passer la commande ----------------------

function submitOrder(event) {
    event.preventDefault()
    //Recuperer le storage pr les produit 

    //recup les infos du formulaire (get elmt by id) utiliser .value

    // verif champs email

    // pr chaque champs verifier quer la valeur n 'est pas vide , dans le cas contraire afficher une alerte
    // utiliser return pr verifier si erreur

    productInLocalStorage = JSON.parse(localStorage.getItem("panier"))


    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const email = document.getElementById("email").value


    const formIsValid = verificationForm(firstName, lastName, address, city, email)

    if (formIsValid == false) {
        return
    }


    var formulaireContact =
    {
        prenom: firstName,
        nom: lastName,
        address: address,
        ville: city,
        email: email
    }
    console.log(formulaireContact)

    var json = []
    json["contact"] = formulaireContact
    json["products"] = productsInLocalStorage


    var order = fetch("http://localhost:3000/api/order", { method: "POST", body: json })
        .then(function (res) {
            /*        if (res.ok) {
                        return res.json();
                    }*/
            console.log(res)
        })
        .then(function (order) {
            console.log(order)


        })
        .catch(function (err) {
            console.log(err)
        });

}

// -------------------- verification des champs du formulaire ------------------- 

function verificationForm(firstName, lastName, address, city, email) {
    if (firstName == "") {
        document.getElementById("firstNameErrorMsg").textContent = "veuillez saisir ce champ"
        return false
    }
    if (lastName == "") {
        document.getElementById("lastNameErrorMsg").textContent = "veuillez saisir ce champ"
        return false

    }
    if (address == "") {
        document.getElementById("addressErrorMsg").textContent = "veuillez saisir ce champ"
    }
    if (city == "") {
        document.getElementById("cityErrorMsg").textContent = "veillez saisir ce champ"
    }
    if (email == "") {
        document.getElementById("emailErrorMsg").textContent = "veuillez saisir ce champ"
        return false;
    }

    // ----------- regex email ------------------

    var validRegexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // console.log(mail.match(validRegex))

    if (email.match(validRegexEmail) == null) {
        //    console.log(mail)


        document.getElementById("emailErrorMsg").textContent = "adresse email invalide"
        return false
    }
    return true;
}
// -------- regex champs nom/prénom ---------------


function validateNameForm() {
    var re = /^[A-Za-z]+$/
    if (re.test(document.getElementById("textboxID").value))
        alert('Valid Name.')
    else
        alert('Invalid Name.')
}
