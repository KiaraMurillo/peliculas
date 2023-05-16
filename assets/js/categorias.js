import { router } from "./route.js";
import { saveProducts } from "./bd.js";

export default function getCategorias() {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      var jsonResponse = JSON.parse(xhttp.responseText);
      crearCategorias(jsonResponse);
    }
  });

  xhr.open('GET', 'https://streaming-availability.p.rapidapi.com/v2/genres');
  xhr.setRequestHeader('X-RapidAPI-Key', 'ac943e17femshae80920c8a43de4p174732jsn6ee9f87418f5');
  xhr.setRequestHeader('X-RapidAPI-Host', 'streaming-availability.p.rapidapi.com');

  xhttp.onerror = function () {
    console.log("Ocurrio un error");
  };

  xhttp.send(data);
}

function crearCategorias(lista) {
  var $fragment = document.createDocumentFragment();

  var $lista = document.getElementById("menu-categorias");

  for (const categoria of lista) {
    var $li = document.createElement("li");
    $li.classList.add("main-nav__submenu-item");

    var $link = document.createElement("a");
    $link.textContent = categoria;
    $link.setAttribute("href", "/categoria/" + categoria)
    $link.setAttribute("data-navigo", "")

    /*$link.addEventListener('click', function (event) {
      route(event)
    })}*/

    $li.appendChild($link);
    $fragment.appendChild($li);
  }

  $lista.appendChild($fragment);
}

export async function renderCategoria(categoria) {
  let $productos = await fetch("https://streaming-availability.p.rapidapi.com/v2/genres" + categoria)
    .then((res) => res.json())
    .then((res) => {
      saveProducts(res.products);
      return templateProductos(res.products)
    });

  const $sectionProductos = document.createElement('section');
  $sectionProductos.classList.add('productos');

  $sectionProductos.appendChild($productos);

  return $sectionProductos;
}

function templateProductos(productos) {
  const fragment = document.createDocumentFragment();
  const $template = document.querySelector("#template-producto");

  for (const [index, producto] of productos.entries()) {
    const $clonArticulo = $template.content.cloneNode(true);

    $clonArticulo.querySelector("img").src = producto.thumbnail;

    $clonArticulo.querySelector(".producto-nombre").textContent =
      producto.title;

    $clonArticulo.querySelector(".producto-descripcion").textContent =
      producto.description;

    $clonArticulo.querySelector(".producto-precio").textContent =
      "$ " + producto.price;

    $clonArticulo
      .querySelector(".btn-add-cart")
      .addEventListener("click", agregarProductoCarrito, producto);

    $clonArticulo
      .querySelector(".btn-info")
      .setAttribute("href", `/producto/${index + 1}`);

    fragment.appendChild($clonArticulo);
  }

  return fragment;
}

function agregarProductoCarrito(producto) {
  console.log("Agregado al carrito")
  router.navigate('/producto/2')
}