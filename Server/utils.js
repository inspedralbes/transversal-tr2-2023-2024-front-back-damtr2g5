module.exports = { comprobarRectaLineal, requireLogin, getRemainingExp, shuffleArray, checkQuestion,generarPassword,obtenerFechaYHoraActual,calcularTiempoTranscurrido};
function comprobarRectaLineal(punto1, punto2) {
    if (punto1.x === punto2.x) {
        // Recta vertical
        return {"tipo": "vertical", "x": punto1.x};
    } else if (punto1.y === punto2.y) {
        // Recta horizontal
        return {"tipo": "horizontal", "y": punto1.y};
    } else {
        var m = (punto2.y - punto1.y) / (punto2.x - punto1.x);
        var b = punto1.y - m * punto1.x;
        return {"tipo": "lineal", "m": m, "b": b};
    }
}
function requireLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send();
    }
}

//INCOMPLETE
function getRemainingExp(id_activity, id_user) {
    activity = getDocument(id_activity)
    activityquestions = findRegisteredResult(id_activity, id_user)
    var exp = 0;



    return exp
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function checkQuestion(question, respuesta) {
    let correcto = false;

    switch (question.formato) {
        case "Seleccionar":
        case "Imagen":
            if (respuesta === question.correcta) {
                correcto = true;
            }
            break;

        case "Ordenar valores":
            if (
                JSON.stringify(respuesta) ===
                JSON.stringify(question.correcta)
            ) {
                correcto = true;
            }
            break;

        case "Respuesta":
            respuesta = respuesta.replace(/\s/g, "").toLowerCase();
            if (question.correcta.includes(respuesta)) {
                correcto = true;
            }
            break;

        case "Grafica":
            respuesta = comprobarRectaLineal(respuesta[0], respuesta[1]);
            if (
                respuesta.tipo === question.correcta.tipo &&
                (
                    (respuesta.tipo === "horizontal" &&
                        respuesta.y === question.correcta.y) ||
                    (respuesta.tipo === "vertical" &&
                        respuesta.x === question.correcta.x) ||
                    (respuesta.tipo === "lineal" &&
                        respuesta.m === question.correcta.m &&
                        respuesta.b === question.correcta.b)
                )
            ) {
                correcto = true;
            }
            break;

        case "Unir valores":
            const respuestaString = respuesta.map(arr => arr.join(',')).sort().join(';');
            const correctaString = question.correcta.map(arr => arr.join(',')).sort().join(';');
            if (respuestaString === correctaString) {
                correcto = true;
            }
            break;

        default:
            correcto = false; // Handle default case
            break;
    }

    return correcto;
}

//Para generar un contraseñas aleatorias(hay que pasarle el length)
function generarPassword(length) {
    
    if (
      typeof crypto !== 'undefined' 
      && typeof crypto.getRandomValues === 'function'
    ) {
      var tmp = new Uint8Array(Math.max((~~length)/2));
      crypto.getRandomValues(tmp);
      return Array.from(tmp)
        .map(n => ('0'+n.toString(16)).substr(-2))
        .join('')
        .substr(0,length);
    }
  
    
    var ret = "";
    while (ret.length < length) {
      ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0,length);
  }
  function obtenerFechaYHoraActual() {
    const ahora = new Date();
    
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0, por eso se suma 1
    const año = ahora.getFullYear();
  
    const hora = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
  
    const fechaHoraFormateada = `${año}/${mes}/${dia} ${hora}:${minutos}:${segundos}`;
  
    return fechaHoraFormateada;
  }
  function calcularTiempoTranscurrido(tiempoInicial, tiempoFinal) {
    // Convertir las cadenas de tiempo en objetos Date
    const fechaInicial = new Date(tiempoInicial);
    const fechaFinal = new Date(tiempoFinal);
  
    // Obtener la diferencia en milisegundos
    const diferenciaEnMilisegundos = fechaFinal - fechaInicial;
  
    // Convertir la diferencia de milisegundos a días, horas, minutos y segundos
    const segundos = Math.floor(diferenciaEnMilisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
  
    const tiempoTranscurrido = {
      dias,
      horas: horas % 24,
      minutos: minutos % 60,
      segundos: segundos % 60
    };
  
    return tiempoTranscurrido;
  }