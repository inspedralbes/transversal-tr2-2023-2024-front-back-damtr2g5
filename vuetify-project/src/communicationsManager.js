
export async function getEjercicios() {
    const response = await fetch(`http://localhost:3001/getEjercicio`);
    const ejercicios = await response.json();
    return ejercicios;
  }