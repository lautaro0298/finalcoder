//clases
class usuario {
  constructor(correo, contraseña, monedero) {
    this.correo = correo;
    this.contraseña = contraseña;
    this.monedero = monedero;
  }
}
class moneda {
  constructor(nombre, id, cantidad, fecha, precio, icono) {
    this.id = id;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.fecha = fecha;
    this.precio = precio;
    this.icono = icono;
  }
}
//variables globales y programa principal
let cont=0;
let cont2=0;
let pinturacarrito = document.getElementById("carrito");
let botonborrar = document.getElementById("boton-vaciar");
let botoncomprar = document.getElementById("boton-comprar");
botoncomprar.addEventListener("click", () => {
  console.log("hola");
});
let carrito = [];
let icon = [];
iconos();
cargardatos();
function iconos() {
  fetch(
    "http://rest.coinapi.io/v1/assets/icons/180x180?apikey=CE103888-3776-41E4-83B0-FDAF890BF923"
  )
    .then((response) => response.json())
    .then((info) => {
      info = info.slice(0, 99);
      info.forEach((elemento) => {
        icon.push(elemento);
      });
    });
  localStorage.setItem("iconos", icon);
  console.log(icon);
}
function cargardatos() {
  fetch(
    "http://rest.coinapi.io/v1/assets?apikey=740270A9-C3FB-42FA-BD0B-EC45F6AADF1C"
  )
    .then((response) => response.json())
    .then(function (data) {
      data = data.slice(0, 99) ?? [];
      data.forEach((element) => {
        const div = document.getElementById("monedas");

        let new_element = document.createElement("div");
        new_element.classList.add("cont");
        let fechacoti = new Date(element.data_quote_end);
        
        if (element.price_usd != undefined && element.asset_id!=undefined) {
          new_element.innerHTML = `
          <div class="container">
          
          <div class="card">
            <div class="face face1">
              <div class="content">
                <span class="stars"></span>
                <h2 >${element.name}</h2><img class="icono" src="${
                      icon.find((ico) => ico.asset_id == element.asset_id)?.url
                    }">
                <p >El precio de esta moneda es de : $${element.price_usd} USD. </p>
                <p>fecha de inicio: ${element.data_start}</p>
                <P>ultima cotizacion: ${fechacoti}</p>
                <button id="boton${cont}" class="btn  btn-dark">Comprar</button>
          
              </div>
            </div>
            <div class="face face2">
              <h2>${element.asset_id}</h2>
            </div>
          </div>
          
          `;  
          cont++;
                    div.appendChild(new_element);
        } else{}
      });
      data.forEach((element) => {
        document
          .querySelector(`#boton${cont2}`)
          .addEventListener("click", () => {
            enviarAlcarrito(element);
            Toastify({
              text: "Producto agregado",

              duration: 3000,
            }).showToast();
            cont2++
            pintarCarrito();
          });
      });
    });
}
function enviarAlcarrito(mon) {
  const existe = carrito.some((element) => element.id == mon.asset_id);
  if (existe) {
    carrito.map((element) => {
      element.cantidad++;
    });
  } else {
    let { asset_id, name, data_quote_end, price_usd } = mon;
    const nuevaMoneda = new moneda(
      name,
      asset_id,
      1,
      data_quote_end,
      price_usd,
      icon.find((ico) => ico.asset_id == mon.asset_id)?.url
    );
    carrito.push(nuevaMoneda);
  }
}
function pintarCarrito() {
  pinturacarrito.innerHTML = ``;
  carrito.forEach((element) => {
    pinturacarrito.innerHTML += `
    
    <li>${element.nombre} Cantidad: ${element.cantidad} precio:$${
      element.cantidad * element.precio
    }  <li>
    `;
  });
}
const cerrar = document.getElementById("close");
cerrar.addEventListener("click", () => {
 carro.classList.remove("show");
});
