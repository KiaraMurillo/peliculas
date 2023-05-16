import { renderCategoria } from "./categorias.js";
import { consultarProducto, getProductoDemo, getProductoInfo } from "./productos.js";

export const router = new Navigo("/", true);
const $main = document.querySelector('#root');

export function initRouter() {
  //window.router = router; // Solamente para testing
    console.log("Iniciando")
  let { href: currentURL, origin: host } = window.location;
  console.log("currentURL", currentURL);
  console.log("host", host);
  let currentPath = currentURL.replace(host, "");
  console.log("currentPath", currentPath);

  router.on("/", () => {
    console.log("Entro", getProductoDemo());

    $main.textContent = '';
    $main.innerHTML = getProductoDemo();
  });

  router.on("/search", ({ data, params, queryString }) => {
    if (params) {
      if (params.q) {
        let busqueda = params.q; // ?q=iphone { q: 'iphone'}
        consultarProducto(busqueda)
        .then(seccion => {
            $main.textContent = '';
            $main.appendChild(seccion)
        });
      }
    }
  });

  router.on("/categoria/:categoria", ({ data }) => {
    renderCategoria(data.categoria)
    .then(seccion => {
        $main.textContent = '';
        $main.appendChild(seccion)
    })
  });

  router.on("/inicio", () => {
    console.log("path about");
    document.querySelector("main").innerHTML =
      '<h2 style="margin-top: 100px">Inicio<h2>';
  });

  router.on("/producto/:id", ({data}) => {
    document.querySelector("main").innerHTML = getProductoInfo(data.id);
  });

  // with the notFound method
  router.notFound(() => {
    document.querySelector("main").innerHTML =
      '<h2 style="margin-top: 100px">Page not found<h2>';
  });

  router.resolve(currentPath);

  /*
      Cambios:
      router.navigate('') cuando se realize una busqueda
    */
}
