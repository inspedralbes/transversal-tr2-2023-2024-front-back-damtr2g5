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