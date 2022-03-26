/*El proyecto es simular la carga de los productos de una tienda.
Las partes estaticas de la pagina, titulo, descripcion y about us, cambiarlas de acuerdo a lo que escojan que quieran
 que sea la tienda, dentro del HTML.
La seccion de productos debe ser cargada con Javascript, para esto revisar que se deberia crear para cargar 10 productos 
a la tienda, cada uno debe tener lo que se visualiza (card, imagen, titulo, descripcion, link a la pagina del producto, 
otro link que lleve a google.com)
Plus, crear una funcion de JS que permita desde consola agregar un producto al HTML*/

//JSON = objetos javascript en formato "string" para poderlos mandar via internet, 
// las API Application Program Interface

// With fetch you can get data from local or external source
// this return a promise and use .then methods to manipulate the data
/*
fetch ('../json/products.json')
    .then(response=>response.json())// the response is converted to json format
    .then(data=> saveLocalStorage("products", data)) // with the data in json you can print or send to other function
*/

if(getLocalStorage("products") == null){
    fetch ('../json/products.json')
    .then(response=>response.json())// the response is converted to json format
    .then(data=> saveLocalStorage("products", data)) // with the data in json you can print or send to other function
}

var products = JSON.parse(getLocalStorage("products"));
showProducts(products);
//save in the localStorage
function saveLocalStorage(key, data){
    localStorage.setItem(key, JSON.stringify(data))
}


//get data from localStorage
function getLocalStorage(key){
    return localStorage.getItem(key)
}
//var products = JSON.parse(getLocalStorage("products"));

// function that receives a product object
// and draw in the document the card presentation for it
function showProduct(product){
    const myNode = document.createElement('div');
    myNode.classList.add('card', 'col-sm-4');
   
    const myNodeCardBody = document.createElement('div');
    myNodeCardBody.classList.add('card-body');

    const myNodeTitle = document.createElement('h5');
    myNodeTitle.classList.add('card-title');
    myNodeTitle.textContent = product.title;
   
    const myNodeImagen = document.createElement('img');
    myNodeImagen.classList.add('img-fluid');
    myNodeImagen.setAttribute('src', product.img_src);

    
    const myNodedescription = document.createElement('p');
    myNodedescription.classList.add('card-text');
    myNodedescription.textContent = product.description;
   
    const prodLink = document.createElement("a");
    prodLink.href = product.prod_link;
    prodLink.textContent = "Go to the product"

    const googleLink = document.createElement("a");
    googleLink.href = product.google_link;
    googleLink.textContent = "google"

    // anidaciones

    myNodeCardBody.appendChild(myNodeImagen);
    myNodeCardBody.appendChild(myNodeTitle);
    myNodeCardBody.appendChild(myNodedescription);
    myNodeCardBody.appendChild(prodLink);
    myNodeCardBody.appendChild(googleLink);
    myNode.appendChild(myNodeCardBody);

    const DOMitems = document.querySelector("#items");
    DOMitems.appendChild(myNode);
    

}

// myProducts is an array of product objects, iterate throught it and call showProduct function to draw in DOM 
function showProducts(myProducts) {
    myProducts.forEach((product) => {
        showProduct(product);
    });
}

const btnAddProduct = document.querySelector("#btn-add-product");

btnAddProduct.addEventListener("click", function(){
    const title = document.querySelector("#input-title");
    const description = document.querySelector("#input-description");
    const imageUrl = document.querySelector("#input-image");
    const productLink = document.querySelector("#input-product-link");
    const googleLink = document.querySelector("#input-google-link");

    let product = {
        title: title.value,
        description: description.value,
        img_src: imageUrl.value,
        prod_link: productLink.value,
        google_link: googleLink.value
    }
    
    showProduct(product);
    
    let products = JSON.parse(getLocalStorage("products"));
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    
    limpiarFormulario();

})


function limpiarFormulario() {
    document.querySelector("#miForm").reset();
  }