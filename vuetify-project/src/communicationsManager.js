export const SERVER_URL = "http://math-thai.dam.inspedralbes.cat:3450" //"http://localhost:3450"

export async function descargarImagen(formData) {
  const response = await fetch(`${SERVER_URL}/descargar`, {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: formData,
        });
  const imagen = await response.json();
  return imagen;
}
export async function joinAula(aula) {
  return fetch(`${SERVER_URL}/joinAula`,
    {
      method: 'POST',
      credentials: 'include', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aula)
    });

}

export async function getAula(aulaId) {
  const response = await fetch(`${SERVER_URL}/getAula/${aulaId}`, { method: 'GET', credentials: 'include', mode: 'cors' });
  const aula = await response.json();
  return aula
}

export async function getAulaById(aulaId) {
  const response = await fetch(`${SERVER_URL}/getAulaById/${aulaId}`, { method: 'GET', credentials: 'include', mode: 'cors' });
  const aula = await response.json();
  return aula
}

export async function getEjercicios(id) {
  const response = await fetch(`${SERVER_URL}/getEjercicio/${id}`, { method: 'GET', credentials: 'include', mode: 'cors' });
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

export async function getExpEjer(datos) {
  const response = await fetch(`${SERVER_URL}/getExpEjer`,
    {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
      credentials: 'include', mode: "cors"
    },);
  const experiencia = await response.json();
  console.log("Experiencia:", experiencia)
  return experiencia;
}
export async function comprobarRespuesta(respuesta, id) {
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

export async function updateExperienciaUsuario() {
  const response = await fetch(`${SERVER_URL}/totalExperiencia`,
  { method: 'GET', credentials: 'include', mode: 'cors' });
  const datos = await response.json();
  return datos;
}
export async function GetResueltas(dato) {
  const response = await fetch(`${SERVER_URL}/getResueltas`,
    {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body:JSON.stringify(dato), mode: 'cors', credentials: 'include'
    });
  const resueltas = await response.json();
  return resueltas;
}

export async function loginGoogle(usuario) {

  return fetch(`${SERVER_URL}/loginGoogle`,
    {
      method: 'POST',
      credentials: 'include', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });

}
export async function login(usuario) {

  return fetch(`${SERVER_URL}/login`,
    {
      method: 'POST',
      credentials: 'include', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario)
    });

}

export async function registrarUsuari(infoUsuario) {
  const response = await fetch(`${SERVER_URL}/registrarUsuari`,
    {
      method: 'POST',
      credentials: 'include', mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(infoUsuario)
    });
  if (response.status === 200) {
    console.log('Registration successful!');
    const messages = await response.text()
    return { success: true, message: messages };
  } else {
    const messages = await response.text()
    return { success: false, message: messages };
  }
}

export async function getLogin() {
  return fetch(`${SERVER_URL}/getLogin`, { method: 'GET', credentials: 'include', mode: 'cors' });
}
export async function getAvatar(imagen) {
  const resp = fetch(`${SERVER_URL}/imagen/${imagen}`, { method: 'GET', credentials: 'include', mode: 'cors' });
  console.log(resp);
  return resp;
}
export async function getAnswerImage(imagen) {
  try {
    const response = await fetch(`${SERVER_URL}/imagenPregunta/${imagen}`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors'
    });

    const imagen = await response.json();
    return imagen;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}
export async function endSession() {
  return fetch(`${SERVER_URL}/logout`, { method: 'GET', credentials: 'include', mode: 'cors' });
}

export async function getCategorias() {
  const response = await fetch(`${SERVER_URL}/getCategorias`);
  const categorias = await response.json();
  return categorias;
}

export async function getEjerciciosByCat(nombre) {
  const response = await fetch(`${SERVER_URL}/getActivities/${nombre}`,
    {
      method: 'GET',
      credentials: 'include', mode: 'cors'
    })
  const actividades = await response.json();
  return actividades;
}

export async function getPreguntaRandom() {
  const response = await fetch(`${SERVER_URL}/getPreguntaRandom`);
  const pregunta = await response.json();
  return pregunta;
}

export async function getPreguntaBatalla(ids) {  
  const response = await fetch(`${SERVER_URL}/getpreguntarandom2`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    mode: 'cors',body:JSON.stringify(ids),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const pregunta = await response.json();
  return pregunta;
}

export async function getBatallas() {
  const response = await fetch(`${SERVER_URL}/getbatalla`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const pregunta = await response.json();
  return pregunta;
}

export async function historial() {
  const response = await fetch(`${SERVER_URL}/historial`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const pregunta = await response.json();
  return pregunta;
}

export async function PostBatallas(datos) {
  const response = await fetch(`${SERVER_URL}/guardarbatalla`,
    {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      body: datos,
      headers: {
        'Content-Type': 'application/json',
      }
    })

}
export async function GetDatosPerfil(datos) {
  const response = await fetch(`${SERVER_URL}/datosPerfil`,
    {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(datos), mode: 'cors'
    });
  const resueltas = await response.json();
  return resueltas;
}