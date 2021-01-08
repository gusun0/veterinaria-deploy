const form = document.getElementById('form');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const documento = document.getElementById('documento');
const btnGuardar = document.getElementById('btnGuardar');
const indice = document.getElementById('indice');
const listaDuenos = document.getElementById('lista-duenos');

const url = 'https://backend-peach.vercel.app/duenos';

let duenos = [];

async function listarDuenos(){
 try{
 const respuesta = await fetch(url);
 const duenosDelServer = await respuesta.json();
 if(Array.isArray(duenosDelServer)){
  duenos = duenosDelServer;
 }

 if(duenos.length > 0){
 const htmlDuenos = duenos.map((dueno,index) => `<tr>
      <th scope="row">${index}</th>
      <td>${dueno.documento}</td>
      <td>${dueno.nombre}</td>
      <td>${dueno.apellido}</td>
      <td>
	<div class="btn-group" role="group" aria-label="Basic example">

	<button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#exampleModal">  
	 <i class="fas fa-edit"></i>
	 </button>

	<button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash"></i></button>
	</div>     
      </td>
    </tr>
      `).join(''); 
//  console.log(htmlMascotas);
  listaDuenos.innerHTML = htmlDuenos;

Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index) => botonEditar.onclick = editar(index));


Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar,index) => botonEliminar.onclick = eliminar(index));
 return;
 }
  listaDuenos.innerHTML = `<tr>
      <td colspan="5">No hay Duen@s</td>
    </tr>`;

 }catch(error){
 console.log({error});
 $('.alert').show();
 }



}


async function enviarDatos(evento){
 evento.preventDefault();
 try{
 const datos = {
  nombre: nombre.value,
  apellido: apellido.value,
  documento: documento.value,

 };

 console.log(datos);

 const accion = btnGuardar.innerHTML;
 let urlEnvio = url;
 let metodo = 'POST';
 if (accion === 'Editar'){
	urlEnvio += `/${indice.value}`;
	metodo = 'PUT';
	//duenos[indice.value] = datos;
	//resetModal();
}

const respuesta = await fetch(urlEnvio, {
		  method: metodo, // or 'PUT'
		  headers: {
			      'Content-Type': 'application/json',
			    },
		  body: JSON.stringify(datos),
	})

 if(respuesta.ok){
 listarDuenos();
 resetModal();
 }

 }catch(error){
  console.log(error);
  $('.alert').show();
 }
}

function editar(index){
	return function handler(){
//  if(indice.value){
	  btnGuardar.innerText = 'Editar';
 // }
		const dueno = duenos[index];
		nombre.value = dueno.nombre;
		apellido.value = dueno.apellido;
		documento.value = dueno.documento;
		indice.value = index;
	}
}

function resetModal(){
	nombre.value = '';
	apellido.value = '';
	documento.value = '';
	indice.value = '';
	btnGuardar.innerHTML = 'Crear';
}


function eliminar(index){
 	const urlEnvio = `${url}/${index}`;
	return async function clickEnEliminar(){
		try{
		  const respuesta = await fetch(urlEnvio, {method: 'DELETE'});
		 
		  if(respuesta.ok){
		 listarDuenos();
		  }

		}catch(error){
			console.log(error);
			$('.alert').show();

		}

	listarDuenos();
	}
}

listarDuenos();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;



	
