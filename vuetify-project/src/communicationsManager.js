
export async function getEjercicios() {
  const response = await fetch(`http://localhost:3001/getEjercicio`);
  const ejercicios = await response.json();
  return ejercicios;
}


export async function comprobarRespuesta(respuesta,id) {
  console.log("respuesta"+respuesta+"id"+id);
  const response = await fetch(`http://localhost:3001//comprobarPregunta/${id}`,
    {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      },
      body: respuesta,
      mode: "cors"
    },);
    const correcto = await response.json();    
    return correcto;

}