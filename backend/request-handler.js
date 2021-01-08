const StringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');
const url = require('url');

module.exports = (req, res) => {

	//1.- Obtener la URL desde el objeto request
	const urlActual = req.url;

	const urlParseada = url.parse(urlActual,true);
	//console.log({urlActual,urlParseada});
	
	//2.- Obtener la ruta
	const ruta = urlParseada.pathname;
	
	//3. Quitar slash
	const rutaLimpia = ruta.replace(/^\/|\/$|(?<!\d)(\/)(?!\d)/g, '');

	//3.1 Obtener el método HTTP 
	const metodo = req.method.toLowerCase();

	// Para solucionar el problema de cors usando options
	//3.1.1 Dar permisos a CORS escribiendo los headers
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','*');
	res.setHeader('Access-Control-Request-Methods','OPTIONS,GET,PUT,POST,DELETE');
	res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE');
	
	//3.1.2 Dar respuesta inmediate cuando el método sea options
	if(metodo === 'options'){
	  res.writeHead(200);
	  res.end();
	  return 
	}

	//3.2 Obtener variables del query url 
	const {query = {}} = urlParseada;

	//3.3 Obtener los headers
	const { headers = {}} = req;
	//console.log(headers);

	//3.4 Obtener payload en el caso de haber
	// creado instancia de decoder
	const decoder = new StringDecoder('utf-8');
	let buffer= '';

	//3.4.1 Ir acumulando la data cuando el request reciba el payload
	// recibe el evento data
	req.on('data',(data) => {
	buffer += decoder.write(data);
	});

	//3.4.2 Terminar de acumular datos y decirle a decoder que finalize
	req.on('end', () => {
	buffer += decoder.end();	


	if(headers['content-type'] === 'application/json'){
		buffer = JSON.parse(buffer);
	}

	//3.4.3 Revisar si tiene subrutas, en este caso es el indice del array
	if(rutaLimpia.indexOf('/') > -1){
	 // separar las rutas
	  var [rutaPrincipal, indice] = rutaLimpia.split('/');
	}

	//3.5 Ordenar los datos de respuesta (data) del request
	const data = {
	indice,
	ruta: rutaPrincipal || rutaLimpia,
	query,
	metodo,
	headers,
	payload: buffer,
	};
	
	console.log({data});

	//3.6 Elegir el manejador dependiendo de la ruta y asignarle función que el enrutador tiene
	let handler;
	if (data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]){
		handler = enrutador[data.ruta][metodo];
	}else{
	 handler = enrutador.noEncontrado;
	}

	console.log('handler:', handler);

	//4. Ejecutar handler (manejador) para enviar la respuesta
	if(typeof handler === 'function'){
		handler(data, (statusCode = 200, mensaje) => {
		const respuesta = JSON.stringify(mensaje);
		res.setHeader('Content-Type','application/json');
		res.writeHead(statusCode);
		// linea donde realmente ya estamos respondiendo a la aplicación cliente
		res.end(respuesta);
			
	});
	}

	// respuesta según la ruta
	});
};
		
		
		
		
		
		
		
		
		
		
		
		
