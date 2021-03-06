//------------- Recuperation' et affichage des produits sur la page produit ------------

var url = new URL(window.location.href)
var id = url.searchParams.get("id")

console.log(id)

fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (product) {
        displayProduct(product)

    })
    .catch(function (err) {
        console.log(err)
    });

function displayProduct(product) {
    console.log(product)

    const img = document.createElement("img")
    img.setAttribute("src", product.imageUrl)
    img.setAttribute("alt", product.altTxt)

    const itemImg = document.querySelector(".item__img")
    itemImg.appendChild(img)

    document.getElementById("title").textContent = product.name
    document.getElementById("price").textContent = product.price
    document.getElementById("description").textContent = product.description

    const colorSelect = document.getElementById("colors").options
    const colors = product.colors


    colors.forEach(function (color) {
        console.log(color)
        colorSelect[colorSelect.length] = new Option(color, color)
    })

}
document.getElementById("addToCart").addEventListener("click", addToCart)



// ---------- ajout de produits au panier -----------


function addToCart() {

    const quantity = parseInt(document.getElementById("quantity").value)
    const color = document.getElementById("colors").value
    var cart = localStorage.getItem("panier")
    const newProduct = { id: id, color: color, quantity: quantity }


    if (cart === null) {
        cart = [
            newProduct
        ]

    } else {
        cart = JSON.parse(cart)

        var exist = false
        cart.forEach(function (product) {
            if (product.id === id && product.color === color) {
                exist = true
                product.quantity += quantity
            }
        })
        if (exist === false) {
            cart.push(newProduct)
        }
    }
    console.log(cart)


    localStorage.setItem("panier", JSON.stringify(cart));
}