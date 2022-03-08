// ------------ Recupertation de l'ID de la commande depuis le serveur ------------------

var url = new URL(window.location.href)
var idOrder = url.searchParams.get("id")

document.getElementById("orderId").textContent = idOrder

