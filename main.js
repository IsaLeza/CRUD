const productoUI = document.querySelector("#producto");
const precioUI = document.querySelector("#precio");
const btnUI = document.querySelector("#btn");
const btnUI2 = document.querySelector("#btn2");
const tableBodyUI = document.querySelector("#tableBody");
const formularioUI = document.querySelector("#formulario");
let referencia = "";

btnUI.addEventListener("click", enviar);
btnUI2.addEventListener("click", actualizar2);
document.addEventListener("DOMContentLoaded", pintar);

function enviar() {
    let objProducto = {
      producto: productoUI.value,
      precio: precioUI.value,
      id: Date.now(),
    };
  
    let arreglo = JSON.parse(localStorage.getItem("DB"));
  
    if (arreglo === null) {
      arreglo = [];
      arreglo.push(objProducto);
      localStorage.setItem("DB", JSON.stringify(arreglo));
    } else {
      arreglo.push(objProducto);
      localStorage.setItem("DB", JSON.stringify(arreglo));
    }
  
    pintar();
  
    formularioUI.reset();
  }
  function pintar() {
    let datos = JSON.parse(localStorage.getItem("DB"));
  
    if (datos != null) {
      tableBodyUI.innerHTML = "";
  
      datos.forEach((element) => {
        tableBodyUI.innerHTML =
          tableBodyUI.innerHTML +
          `
              <tr class='tr' key=${element.id}>
                  <td>${element.producto}</td>
                  <td>${element.precio}</td>
                  <td class="btn-btn-01"><button class="delete" onclick='eliminar(event)'>Eliminar</button><button class="update" onclick='actualizar(event)'>Actualizar</button></td>
                  <td style='display:none'>${element.id}</td>
              </tr>
              `;
      });
    }
  }
  function eliminar(e) {
    alert('Este producto será eliminado')
    // console.log(e.path[2].childNodes[7].innerHTML);
    // console.log(e.path[2].getAttribute('key'));
    let buscarElemento = e.path[2].childNodes[7].innerHTML;
  
    let datos = JSON.parse(localStorage.getItem("DB"));
    let index = datos.findIndex((element) => element.id == buscarElemento);
  
    datos.splice(index, 1);
  
    localStorage.setItem("DB", JSON.stringify(datos));
  
    pintar();
  
    formularioUI.reset();
  }
  function actualizar(e) {
    let buscarElemento = e.path[2].childNodes[7].innerHTML;
    let datos = JSON.parse(localStorage.getItem("DB"));
    let index = datos.findIndex((element) => element.id == buscarElemento);
  
    productoUI.value = datos[index].producto;
    precioUI.value = datos[index].precio;
  
    btnUI.style.display = "none";
    btnUI2.style.display = "block";
  
    referencia = datos[index].id;
    pintar ()
  }
  function actualizar2() {
    alert('Este producto se actualizará')
    let objProducto = {
      producto: productoUI.value,
      precio: precioUI.value,
      id: referencia,
    };
  
    let datos = JSON.parse(localStorage.getItem("DB"));
    let index = datos.findIndex((element) => element.id == objProducto.id);
  
    datos.splice(index, 1, objProducto);
  
    localStorage.setItem("DB", JSON.stringify(datos));
  
    pintar();
  
    btnUI.style.display = "block";
    btnUI2.style.display = "none";
  
    formularioUI.reset();
  }