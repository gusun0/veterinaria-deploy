const listaMascotas = document.getElementById('lista-mascotas');
const form = document.getElementById('form');
const tipo = document.getElementById('tipo');
const nombre = document.getElementById('nombre');
const dueno = document.getElementById('dueno');
const btnGuardar = document.getElementById('btnGuardar');
const indice = document.getElementById('indice');
//const url = 'http://localhost:8000/mascotas';
const url = 'https://backend-peach.vercel.app/mascotas';

let mascotas = [
];

async function listarMascotas(){
 
 try{
 const respuesta = await fetch(url);
 const mascotasDelServer = await respuesta.json();
 if(Array.isArray(mascotasDelServer) ){
   mascotas = mascotasDelServer;	
 }

 if(mascotas.length > 0){

 const htmlMascotas = mascotas.map((mascota,index) => `<tr>
      <th scope="row">${index}</th>
      <td>${mascota.tipo}</td>
      <td>${mascota.nombre}</td>
      <td>${mascota.dueno}</td>
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
  listaMascotas.innerHTML = htmlMascotas;
Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index) => botonEditar.onclick = editar(index));
Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar,index) => botonEliminar.onclick = eliminar(index));
 return;
 }
  listaMascotas.innerHTML = `<tr>
      <td colspan="5">No hay Mascotas</td>
    </tr>`;
 }catch(error){
  //throw error;
  $('.alert').show();
 }
}




async function enviarDatos(evento){
 evento.preventDefault();

 try{

 const datos = {
  tipo: tipo.value,
  nombre: nombre.value,
  dueno: dueno.value
 };

 console.log(datos);
 let metodo = 'POST';
 let urlEnvio = url;
 const accion = btnGuardar.innerHTML;
 if(accion === 'Editar' ){
	      console.log(indice.value);
		 metodo = 'PUT'; 
		 mascotas[indice.value] = datos;
		 urlEnvio = `${url}/${indice.value}`;
		 resetModal();
}
const respuesta = await fetch(urlEnvio, {
		  method: metodo, // or 'PUT'
		  headers: {
			      'Content-Type': 'application/json',
			    },
		  body: JSON.stringify(datos),
	})

 if(respuesta.ok){
 listarMascotas();
 resetModal();
 }

 }catch(error){
 //throw error;
  $('.alert').show();
 }
}

function editar(index){
	return function handler(){
//  if(indice.value){
	  btnGuardar.innerText = 'Editar';
 // }
		const mascota = mascotas[index];
		nombre.value = mascota.nombre;
		dueno.value = mascota.dueno;
		tipo.value = mascota.tipo;
		indice.value = index;
	}
}

function resetModal(){
	nombre.value = '';
	dueno.value = '';
	tipo.value = '';
	indice.value = '';
	btnGuardar.innerHTML = 'Crear';
}


function eliminar(index){
	try{

	const urlEnvio = `${url}/${index}`;
	return async function clickEnEliminar(){
	const respuesta = await fetch(urlEnvio, {
		  method: 'DELETE', // or 'PUT'
	});
 if(respuesta.ok){
 listarMascotas();
 resetModal();
 }
	}
	}catch(error){
//	 throw error;
	 console.log(error);
  $('.alert').show();
	}

}

listarMascotas();


form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;



	
