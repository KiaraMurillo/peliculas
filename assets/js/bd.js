export function saveProducts(products) {
    //Convertimos el objeto a string
    let productos = JSON.stringify(products);
    localStorage.setItem("productos", productos);
}

export function getProducts() {
    let productos = localStorage.getItem("productos");
    return JSON.parse(productos)
}