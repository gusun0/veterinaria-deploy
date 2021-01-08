module.exports = function veterinariasHandler(veterinarias) {
return {
  get: (data,callback) => { // handler (manejador de la ruta)
  if(typeof data.indice != 'undefined'){
	  console.log('handler mascotas: ',{data});
	  if(veterinarias[data.indice]){
  	     return callback(200,veterinarias[data.indice]);
	  }

	  return callback(404,{mensaje: `veterinaria con indice  en ${data.indice} no encontrado`});
  }
  callback(200,veterinarias);
 },
  post: (data,callback) => { // handler (manejador de la ruta)
  //console.log('data: ',data);
  veterinarias.push(data.payload);
  callback(201,data.payload);
 },
  put: (data,callback) => { // handler (manejador de la ruta)
  if(typeof data.indice != 'undefined'){
	  if(veterinarias[data.indice]){
	     veterinarias[data.indice] = data.payload;
  	     return callback(200,veterinarias[data.indice]);
	  }

	  return callback(404,{mensaje: `mascota con indice  en ${data.indice} no encontrado`});
  }
  callback(400,{mensaje: 'indice no enviado'});
 },
  delete: (data,callback) => { // handler (manejador de la ruta)
  if(typeof data.indice != 'undefined'){
	  if(veterinarias[data.indice]){
	     veterinarias = veterinarias.filter((_veterinaria,indice) => indice != data.indice);
  	     return callback(204,{mensaje:`elemento con indice ${data.indice} eliminado`});
	  }

	  return callback(404,{mensaje: `veterinaria con indice  en ${data.indice} no encontrado`});
  }
  callback(400,{mensaje: 'indice no enviado'});
 },
 }

}



