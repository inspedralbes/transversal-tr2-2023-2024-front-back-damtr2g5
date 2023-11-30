
export async function getEjercicios() {
  const response = await fetch(`http://localhost:3001/getEjercicio`);
  const ejercicios = await response.json();
  return ejercicios;
}


export async function comprobarRespuesta(respuesta,id) {
  const response = await fetch(`http://localhost:3001/comprobarPregunta/${id}`,
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