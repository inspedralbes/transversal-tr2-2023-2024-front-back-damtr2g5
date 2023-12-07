export const SERVER_URL = "http://localhost:3001"

export async function getEjercicios() {
  const response = await fetch(`${SERVER_URL}/getEjercicio`);
  const ejercicios = await response.json();
  return ejercicios;
}

export async function getRooms(page, itemsPerPage, sortBy, search) {
  const response = await fetch(`${SERVER_URL}/getRooms?page=${page}
  &itemsPerPage=${itemsPerPage}
  &sortBy=${sortBy[0]?.key}
  &order=${sortBy[0]?.order}
  &search=${search}`,
    { method: 'GET', credentials: 'include', mode: 'cors' });
  const rooms = await response.json();
  return rooms;
}
export async function comprobarRespuesta(respuesta,id) {
  console.log("respuesta" + respuesta + "id" + id);
  const response = await fetch(`${SERVER_URL}/comprobarPregunta/${id}`,
    {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(respuesta),
      credentials: 'include', mode: "cors"
    },);
  const correcto = await response.json();
  return correcto;

}
export async function GetResueltas(datos) {
  console.log("DATOS: "+datos);
  const response = await fetch(`${SERVER_URL}/getResueltas`,
    { method: 'POST',headers: {
      'Content-Type': 'application/json',
    }, body:JSON.stringify(datos), mode: 'cors' });
    const resueltas = await response.json();
    return resueltas;
}

export async function login(usuario) {

  return fetch(`${SERVER_URL}/login`, 
  {method: 'POST',
  credentials: 'include', mode: 'cors',
   headers: {
    'Content-Type':  'application/json' ,
  },
  body: JSON.stringify(usuario)});
  
}

export async function registrarUsuari(infoUsuario) {
  const response = await fetch(`${SERVER_URL}/registrarUsuari`, 
  {method: 'POST',
  credentials: 'include', mode: 'cors',
   headers: {
    'Content-Type':  'application/json' ,
  },
  body: JSON.stringify(infoUsuario)});
  if (response.status === 200) {
    console.log('Registration successful!');
    const messages = await response.text()
    return { success: true, message: messages};
  } else {
    const messages = await response.text()
    return { success: false, message: messages };
  }
}

export async function getLogin() {
  return fetch(`${SERVER_URL}/getLogin`, { method: 'GET', credentials: 'include', mode: 'cors' });
}

export async function endSession() {
  return fetch(`${SERVER_URL}/logout`, { method: 'GET', credentials: 'include', mode: 'cors' });
}

export async function getCategorias(){
  const response = await fetch(`${SERVER_URL}/getCategorias`);
  const categorias = await response.json();
  return categorias;
}

export async function getEjerciciosByCat(idCategoria){
  const response = await fetch(`${SERVER_URL}/getActivities/${idCategoria}`,
  {method: 'GET',
  credentials: 'include', mode: 'cors'})
  const actividades = await response.json();
  return actividades;
}