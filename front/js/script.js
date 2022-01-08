fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (products) {
        for (product of products) {
            displayProduct(product)
        }
        ;
    })
    .catch(function (err) {
        console.log(err)
    });

function displayProduct(product) {
    const a = document.createElement("a")
    a.setAttribute("href", "./product.html?id=" + product._id)

    const article = document.createElement("article")

    const img = document.createElement("img")
    img.setAttribute("src", product.imageUrl)
    img.setAttribute("alt", product.altTxt)

    const h3 = document.createElement("h3")
    h3.classList.add("productName")
    h3.textContent = product.name

    const p = document.createElement("p")
    p.classList.add("productDescription")
    p.textContent = product.description

    article.appendChild(img)
    article.appendChild(h3)
    article.appendChild(p)
    a.appendChild(article)

    const items = document.getElementById("items")
    console.log(items)
    items.appendChild(a)


    console.log(product)
}



/*function createElem(tagDom, addClass) {
    let domElem = document.createElement(tagDom);
    if (typeof addClass !== 'undefined') {
        domElem.setAttribute("class", addClass);
    }
    return domElem;

}*/
