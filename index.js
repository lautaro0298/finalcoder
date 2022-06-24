//variable globales
const globusuario = JSON.parse(sessionStorage.getItem("usuarios")) ?? [];
let numdeusuario;
let logeado = false;
let botonbuscar;
let moneda2 = "ars";
let carrito =[]
//clases
class Usuario {
  constructor(usuario, email, password) {
    this.usuario = usuario;
    this.email = email;
    this.password = password;
  }
}
//inicio del programa
let logear = document.getElementById("logear");
logear.addEventListener("submit", (e) => {
  e.preventDefault();
  let from = new FormData(e.target);
  globusuario.forEach((element, index) => {
    if (element.usuario == from.get("username")) {
      if (element.password == from.get("password")) {
        $("#ModalForm").modal("hide");
        logeado = true;
        numdeusuario = index;
        posLogeo();
      }

      logear.reset();
    }
  });
});

let registrar = document.getElementById("registrar");
registrar.addEventListener("submit", (e) => {
  e.preventDefault();
  let from = new FormData(e.target);
  registrarusuario(
    from.get("username"),
    from.get("email"),
    from.get("password")
  );
  numdeusuario = globusuario.length - 1;
  logeado = true;
  $("#Modalregister").modal("hide");
  posLogeo();
});

//funciones

function registrarusuario(usuario, email, password) {
  let p = new Usuario(usuario, email, password);
  globusuario.push(p);
  sessionStorage.setItem("usuarios", JSON.stringify(globusuario) || []);
}

function cambiarMoneda(moneda) {
  moneda2 = moneda;
  if (moneda == "usd") {
    document.getElementById("moned").className = "nav-link active";
    document.getElementById("mone").className = "nav-link ";
  } else {
    document.getElementById("mone").className = "nav-link active";
    document.getElementById("moned").className = "nav-link ";
  }
  console.log(moneda);
}

function posLogeo() {
  if (logeado) {
    const div = document.getElementById("principal");
    div.innerHTML = `
    <div class="container">
  <div class="row h-100">
    <div class="col-lg-7 mx-auto text-center mb-6">
      <h5 class="fw-bold fs-3 fs-lg-5 lh-sm mb-3"><font style="vertical-align: inherit;">Compra por moneda de origen </font></h5>
    </div>
    <div class="col-12">
      <nav>
      <form id="moneda">
        <div class="nav nav-tabs majestic-tabs mb-4 justify-content-center" id="nav-tab" role="tablist"><button class="nav-link active" type="button" id="mone" onclick="cambiarMoneda('ars')" value="ars" name="moneda"  ><font style="vertical-align: inherit;">ARS </font></button><button class="nav-link"  onclick="cambiarMoneda('usd')" name="moneda" id="moned" type="button" ><font style="vertical-align: inherit;">USD </font></button></div>
        </form >
        <form id="buscar">
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-women" role="tabpanel" aria-labelledby="nav-women-tab">
         <div class="nav nav-pills justify-content-center mb-5" >
          <div>
          <input type="radio" id="huey" name="coin" value="btc"
                 checked>
          <label for="BTC" style="margin-inline: 1rem;" >Bitcoin   </label>
        </div>
    
        <div>
          <input  type="radio" id="dewey" name="coin" value="eth">
          <label for="ETH" style="margin-inline: 1rem;">Ethereum  </label>
        </div>
    
        <div>
          <input type="radio" id="louie" name="coin" value="doge">
          <label for="doge" style="margin-inline: 1rem;" >Dogecoin </label>
        </div>
        <div>
          <input type="radio" id="louie" name="coin" value="USTD">
          <label for="ustd" style="margin-inline: 1rem;">USTD </label>
        </div>
        <div>
          <input type="radio" id="louie" name="coin" value="ltc">
          <label for="ltc" style="margin-inline: 1rem;">Litecoin </label>
        </div>
        </div>
            <div class="col-12 d-flex justify-content-center mt-5"> <button type="submit" class="btn btn-lg btn-dark" href="#!"><font >Buscar </font></button></div>
          </form>
        </div>
        
        
        </div>
      </nav><div class="tab-pane fade show active" id="pills-wtshirt" role="tabpanel" aria-labelledby="pills-wtshirt-tab">
        <div class="carousel slide" id="carouselCategoryWTshirt" data-bs-touch="false" data-bs-interval="false">
                  <div class="carousel-inner">
        <div id="productos" style="display: grid;grid-template-columns: repeat(3, 1fr);grid-gap: 10px;">
    </div>
    
  </div>
</div>
    `;
    document.body.appendChild(div);
    const modal = document.getElementById("modalesoriginales");
    modal.innerHTML = `
    <!--modal login -->
    <div class="modal fade" id="carrito" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
              <!-- Login Form -->
              
                <div class="modal-header">
                  <h5 class="modal-title">Carrito de compras</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                 
                  <div id="productitos"></div>
                </div>
               
               
          </div>
        </div>
      </div>
    <div id="modalesoriginales">
    <div class="modal fade" id="ModalForm" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
              <!-- Login Form -->
              
                <div class="modal-header">
                  <h5 class="modal-title">Bienvenido usario</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                      <label >Usuario :${globusuario[numdeusuario].usuario}</label>
                      
                  </div>
      
                  <div class="mb-3">
                      <label >${globusuario[numdeusuario].email}</label>
                      
                  </div>
                  
                </div>
                <div class="modal-footer pt-4">   
                  <form href="/index.html">               
                  <button type="submit" href="index.html" class="btn btn-danger mx-auto w-100">Cerrar Seccion</button>
                  </form>
                </div>
               
          </div>
        </div>
      </div>
    `;
    botonbuscar = document
      .getElementById("buscar")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        let from = new FormData(e.target);
        funcionFech(from.get("coin"), moneda2);
      });
  }
}
function funcionFech(coin, monedaCompra) {
  let url = "https://criptoya.com/api/" + coin + "/" + monedaCompra + "/" + 0.5;
  fetch(url, {
    //mode: 'no-cors', // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .then((array) => {
      const contenedor = document.getElementById("productos");
      let array1 = [];
      array1 = Object.entries(array);
      contenedor.innerHTML = `
      `;
      array1.forEach((monedita) => {
        contenedor.innerHTML += `
                        
                        <div class="col-sm-6 col-md-3 mb-3 mb-md-0 h-100">
                          <div class="card card-span h-100 text-white" style="width: 18rem;">
                            
                            <div class="card-body ps-0 bg-200" style="border:groove;">
                              <h5 class="fw-bold  "><font style="vertical-align: inherit;"> 0.5 ${coin}  en ${monedita[0]} </font></h5>
                              <div class="fw-bold"><span class="text-primary"><font style="vertical-align: inherit;">$${monedita[1].totalAsk} Precio final</font></span></div>
                            <button class="btn-primary" type="button"  id="boton${coin}${monedita[0]}">Agregar al carrito</button></div>
                          </div>
                        </div>
                        
                                         
   `;
       
        })
        array1.forEach((monedita)=>{
     document.getElementById(`boton${coin}${monedita[0]}`).addEventListener("click" , (e)=>{e.preventDefault()
       enviarAlcarrito(monedita)  });}
    )});

  }
  function enviarAlcarrito(moneda){
    
    const existe=carrito.some((producto)=> producto[0]===moneda[0] )
    const producto={...moneda,cantidad:1}
    if(existe){
      carrito.map((element)=>{
        if(element[0]=== moneda[0]){
          element.cantidad++;
          return element;
        }

      })
    }else{ 
          console.log(producto)
          carrito.push(producto)
          console.log(carrito)
        }
   mostrarElcarrito()
    
    
  }
function mostrarElcarrito(){
      let costos=[]
      let total
      const carri = document.getElementById("productitos")
      carri.innerHTML=`
      `
      carrito.forEach((element)=>{
      carri.innerHTML+=`
      
                      <div class="card">
                      <label >Nombre de exchange:  ${element[0]}  </label>
                      <label >Valor de cada volumen 0.5  $${element[1].totalAsk}  </label>   
                      <label >Cantidad de volumenes por comprar  ${element.cantidad}</label>                   
                      </div>
      
      `
      costos.push(parseFloat( element[1].totalAsk)*parseFloat(element.cantidad))
      })
      
      total = costos.reduce((a, b) => a + b, 0)
      carri.innerHTML+=`
      <label >total a pagar  ${total}</label>
                  <form href="/compra.html">               
                  <button type="submit" href="index.html" class="btn btn-success  mx-auto w-100">Finalizar compra</button>
                  </form>
      `
}
