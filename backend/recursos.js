module.exports = {
mascotas: [
  {tipo: 'Perro',nombre:'Trosky0',dueno:'Camilo'},
  {tipo: 'Perro',nombre:'Trosky1',dueno:'Camilo'},
  {tipo: 'Perro',nombre:'Trosky2',dueno:'Camilo'},
  {tipo: 'Perro',nombre:'Trosky3',dueno:'Camilo'},
  {tipo: 'Perro',nombre:'Trosky4',dueno:'Camilo'} 
 ],

veterinarias: [
  {nombre: 'Alexandra',apellido:'Perez', documento:'1234567'},
  {nombre: 'Alexander',apellido:'Gomez', documento:'4534999'},
  {nombre: 'Julian',apellido:'Madrid', documento:'6634588'},
  {nombre: 'Naryie',apellido:'Vazquez', documento:'2045597'},
 ],

duenos: [
  {nombre: 'Alexandra',apellido:'Ramirez', documento:'3333'},
  {nombre: 'Alejandro',apellido:'Fernandezz', documento:'444'},
  {nombre: 'Julio',apellido:'Mayo', documento:'555'},
  {nombre: 'Natalia',apellido:'Mendoza', documento:'999'},
 ],

consultas: [
  {
   mascota: 0, 
   dueno: 0, 
   veterinaria: 0, 
   fechaCreacion: new Date(), 
   fechaEdicion: new Date(), 
   historia: '', 
   diagnostico: 'diagnostico'},
 ],

}
