export const SERVER_URL = "http://localhost:3001"
export async function getEjercicios() {
  const response = await fetch(`${SERVER_URL}/getEjercicio`);
  const ejercicios = await response.json();
  return ejercicios;
}


export async function comprobarRespuesta(respuesta,id) {
  console.log("respuesta"+respuesta+"id"+id);
  const response = await fetch(`${SERVER_URL}/comprobarPregunta/${id}`,
    {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(respuesta),
      mode: "cors"
    },);
    const correcto = await response.json();
    console.log("CORRECTA",correcto);    
    return correcto;

}

export async function login(usuario){

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

export async function getLogin(){
  
  return fetch(`${SERVER_URL}/getLogin`, {method:'GET',credentials: 'include', mode: 'cors'});
}

export async function endSession(){
  return fetch(`${SERVER_URL}/logout`, {method:'GET',credentials: 'include', mode: 'cors'});
}

export async function getCategorias(){
  const response = await fetch(`${SERVER_URL}/getCategorias`);
  const categorias = await response.json();
  return categorias;
}

export async function getEjerciciosByCat(idCategoria){
  const response = await fetch(`${SERVER_URL}/getCategorias/${idCategoria}`);
  const categorias = await response.json();
  return categorias;
}