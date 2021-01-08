module.exports = function consultasHandler({consultas,veterinarias,mascotas}) {
return {
  get: (data,callback) => { // handler (manejador de la ruta)
  if(typeof data.indice != 'undefined'){
	  console.log('handler consultas: ',{data});
	  if(consultas[data.indice]){
  	     return callback(200,consultas[data.indice]);
	  }

	  return callback(404,{mensaje: `consulta con indice  en ${data.indice} no encontrado`});
  }

  // Haciendo un map a las consultas
  const consultasConRelaciones = consultas.map((consulta) =>({...consulta, 
	  mascota: {...mascotas[consulta.mascota], id: consulta.mascota},
	  veterinaria: {...veterinarias[consulta.veterinaria],id: consulta.veterinaria},
  }));	
  callback(200,consultasConRelaciones);
 },
  post: (data,callback) => { // handler (manejador de la ruta)
  let nuevaConsulta = data.payload;
  nuevaConsulta.fechaCreacion = new Date(); 
  nuevaConsulta.fechaEdicion = null; 
  consultas = [...consultas, nuevaConsulta];
  callback(201,nuevaConsulta);
 },
  put: (data,callback) => { // handler (manejador de la ruta)
  if(typeof data.indice != 'undefined'){
	  if(consultas[data.indice]){
	     const {fechaCreacion} = consultas[data.indice]
	     consultas[data.indice] = {...data.payload, fechaCreacion,fechaEdicion: new Date()};
  	     return callback(200,consultas[data.indice]);
	  }

	  return callback(404,{mensaje: `consulta con indice  en ${data.indice} no encontrado`});
  }
  callback(400,{mensaje: 'indice no enviado'});
 },
  delete: (data,callback) => { // handler (manejador de la ruta)
  if(typeof data.indice != 'undefined'){
	  if(consultas[data.indice]){
	     consultas = consultas.filter((_consulta,indice) => indice != data.indice);
  	     return callback(204,{mensaje:`elemento con indice ${data.indice} eliminado`});
	  }

	  return callback(404,{mensaje: `consulta con indice  en ${data.indice} no encontrado`});
  }
  callback(400,{mensaje: 'indice no enviado'});
 },
 }

}



