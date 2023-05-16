import { router } from "./route.js";
import { getProducts } from "./bd.js";

export function buscarProducto(event) {
  event.preventDefault();
  var busqueda = event.target.search.value;
  event.target.reset();
  router.navigate("/search?q=" + busqueda);
}

export async function consultarProducto(busqueda) {
  let productos = await axios
    .get("https://dummyjson.com/products/search?q=" + busqueda)
    .then(function (response) {
      // manejar respuesta exitosa
      return renderProductos(response.data.products);
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    });
  return productos;
}

function renderProductos(productos) {
  const fragment = document.createDocumentFragment();

  const $sectionProductos = document.createElement("section");
  $sectionProductos.classList.add("productos");

  const $template = document.querySelector("#template-producto");

  for (const producto of productos) {
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
    .setAttribute("href", `/producto/2`);

    fragment.appendChild($clonArticulo);
  }

  $sectionProductos.appendChild(fragment);

  return $sectionProductos;
}

function agregarProductoCarrito(producto) {
  console.log(producto);
  router.navigate('/producto/2')
}

export function getProductoDemo() {
  return `
  <div class="titulo_seccion">
  <h2>Top ventas<h2>
  </div>
  <section class="info-producto">
      <article class="info-producto__card">
          <aside class="info-producto__gallery">
              <div class="gallery__focus_photo demo">
                  <img src="https://i.dummyjson.com/data/products/41/thumbnail.webp">
              </div>
          </aside>
          <div class="info-producto__body">
              <h2 class="info-producto__name">NIGHT SUIT</h2>
              <p class="info-producto__description">
              NIGHT SUIT RED MICKY MOUSE.. For Girls. Fantastic Suits.
              </p>
              <p class="info-producto__price"><span class="product-price">$ 55</span><span class="product-discount">- 15.05 %</span></p>
              <p class="info-producto__stock">
              Stock: <span class"producto-stock">21</span>
              </p>
          </div>
          <footer class="info-producto__footer">
          <button class="btn btn-add-cart">Add Cart</button>
          </footer>
      </article>
  </section>`;
}

export function getProductoInfo(id) {
  let productos = getProducts();
  let producto = productos[id - 1];
  console.log(producto)
  return `
  <section class="info-producto">
      <article class="info-producto__card">
          <aside class="info-producto__gallery">
              <div class="gallery__focus_photo">
                  <img src="${producto.thumbnail}">
              </div>
              <div class="gallery__carousel">
                  <img src="https://i.dummyjson.com/data/products/1/1.jpg">
                  <img src="https://i.dummyjson.com/data/products/1/2.jpg">
                  <img src="https://i.dummyjson.com/data/products/2/thumbnail.jpg">
              </div>
          </aside>
          <div class="info-producto__body">
              <h2 class="info-producto__name">${producto.title}</h2>
              <p class="info-producto__description">${producto.description}
              </p>
              <p class="info-producto__price"><span class="product-price">$ 129</span><span class="product-discount">- 10.58 %</span></p>
              <p class="info-producto__stock">
              Stock: <span class"producto-stock">32</span>
              </p>
          </div>
          <footer class="info-producto__footer">
          <button class="btn btn-add-cart">Add Cart</button>
          </footer>
      </article>
  </section>`;
}