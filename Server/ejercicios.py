from pymongo import MongoClient 
import random
import math


client = MongoClient("mongodb+srv://a22osczapmar:Nitrome7.@cluster0.uiii7nf.mongodb.net/") 

db = client['mathGameMongo']
collection = db['BaseQuestions']
#Funciones
def CrearFGrafico(question):
    cursor = collection.find({"formato": "Grafica"})[0]
    valor1 =str(random.randint(1, 10))
    opciones = ["+","-"]
    valor2 =opciones[random.randint(0, 1)]
    valor3 =str(random.randint(0, 10))
    question["pregunta"] = cursor["pregunta"].replace("$",valor1 ,1).replace("$", valor2,1).replace("$", valor3,1)
    question["correcta"]={}
    question["correcta"]["tipo"]="lineal"
    question["correcta"]["m"]=valor1
    question["correcta"]["b"]=valor2
    question["formato"] = cursor["formato"]
    question["idTema"]=cursor["idTema"]
    print(question)
#Geometria
def CrearFRespuestaPASV(question):
    cursor = collection.find({"formato": "Respuesta"})[0]
    form = random.randint(0,3)
    form = random.randint(0,3)
    if form == 0: #perimetro
        opciones = ["triangulo","cuadrado","pentagono","hexagono","heptagono","octagono","nonagono","decagono"]
        ran = random.randint(0,7)
        valor1 =opciones[ran]
        valor2 ="cuyo lado mide "+str(random.randint(1,12))+" unidades"
        resultado = int(valor2) * (ran+3)
        question["pregunta"] = cursor["pregunta"].replace("&",valor1 ,1).replace("$", valor2,1).replace("#", "el perimetro",1)
        question["formato"] = cursor["formato"]
        question["idTema"]=cursor["idTema"]
        question["correcta"]=[str(resultado), str(resultado) + " u", str(resultado) + " unidades"]
    elif form == 1: #area
        opciones = ["circulo","triangulo","cuadrado"]
        ran = random.randint(0,2)
        valor1 =opciones[ran]
        valor2 =str(random.randint(1,12))
        valorAltura = str(random.randint(1,12))
        resultado = 0
        dato=''
        if(ran==0):
            dato = "con radio " + valor2 + " usando pi = 3.14"
            resultado = 3.14 * (int(valor2)**2)
        elif(ran==1):
            dato = "con una base de " + valor2 + " unidades y una altura de " + valorAltura + " unidades"
            resultado = int(valorAltura) * int(valor2) * 0.5
        else:
            dato = "cuyo lado mide " + valor2 + " unidades"
            resultado = int(valor2) ** 2
        question["pregunta"] = cursor["pregunta"].replace("&",str(valor1) ,1).replace("$", str(dato),1).replace("#", "el area",1)
        question["formato"] = cursor["formato"]
        question["idTema"]=cursor["idTema"]
        question["correcta"]=[str(resultado), str(resultado) + " u", str(resultado) + " unidades"]
    elif form == 2: #superficie
        opciones = ["prisma","piramide","cilindro","esfera"]
        ran = random.randint(0,3)
        valor1 =opciones[ran]
        valor2 =random.randint(1,7)
        valor3 =random.randint(1,8)
        dato=''
        resultado = 0
        if ran==0:
            dato = "cuya base es un cuadrado cuyo lado mide " + str(valor2) + " unidades y su altura es de " + str(valor3) + " unidades"
            area_base = valor2 ** 2
            perimetro_base = 4 * valor2
            resultado = 2 * area_base + perimetro_base * valor3
        elif ran==1:
            dato = "cuya base es un cuadrado que de base mide " + str(valor2) + " unidades y de altura mide " + str(valor3) + " unidades"
            area_base = valor2 ** 2
            perimetro_base = 4 * valor2
            apotema = math.sqrt(valor3**2 + ((valor2 / 2) ** 2))
            resultado = area_base + 0.5 * perimetro_base * apotema
        elif ran==2:
            dato = "cuya base es un circulo de radio " + str(valor2) + " unidades y su altura es de " + str(valor3) + " unidades (pi=3.14)"
            area_base = math.pi * valor2 ** 2
            area_lateral = 2 * 3.14 * valor2 * valor3
            resultado= 2 * area_base + area_lateral

        elif ran==3:
            dato = "cuyo radio es de " + str(valor2) + " unidades (pi=3.14)"
            resultado = 4 * 3.14 * valor2 ** 2

        resultado = round(resultado,2)
        question["pregunta"] = cursor["pregunta"].replace("&",valor1 ,1).replace("$", dato,1).replace("#", "la superficie",1)
        question["formato"] = cursor["formato"]
        question["idTema"]=cursor["idTema"]
        question["correcta"]=[str(resultado), str(resultado) + " u", str(resultado) + " unidades"]
    elif form ==3: #volumen
        opciones = ["prisma","piramide","cilindro","esfera"]
        ran = random.randint(0,3)
        valor1 =opciones[ran]
        valor2 =random.randint(1,7)
        valor3 =random.randint(1,8)
        dato=''
        resultado = 0
        if ran==0:
            dato = "cuya base es un cuadrado cuyo lado mide " + str(valor2) + " unidades y su altura es de " + str(valor3) + " unidades"
            resultado = (valor2 ** 2) * valor3
        elif ran==1:
            dato = "cuya base es un cuadrado que de base mide " + str(valor2) + " unidades y de altura mide " + str(valor3) + " unidades"
            resultado = (valor2 ** 2) * (1/3) * valor3
        elif ran==2:
            dato = "cuya base es un circulo de radio " + str(valor2) + " unidades y su altura es de " + str(valor3) + " unidades (pi=3.14)"
            resultado= 3.14 * valor2**2 * valor3

        elif ran==3:
            dato = "cuyo radio es de " + str(valor2) + " unidades (pi=3.14)"
            resultado = (4/3) * 3.14 * valor3**3

        resultado = round(resultado,2)
        question["pregunta"] = cursor["pregunta"].replace("&",valor1 ,1).replace("$", dato,1).replace("#", "el volumen",1)
        question["formato"] = cursor["formato"]
        question["idTema"]=cursor["idTema"]
        question["correcta"]=[str(resultado), str(resultado) + " u", str(resultado) + " unidades"]
    print(question)
#Numeros y operaciones
def CrearFSeleccionar(question):
    cursor = collection.find({"formato": "Seleccionar"})[0]
    valor1 =str(random.randint(1, 10))
    opciones = ["+","-"]
    valor2 =opciones[random.randint(0, 1)]
    valor3 =str(random.randint(1, 10))
    valor4 =str(random.randint(1, 10))
    valor5 =opciones[random.randint(0, 1)]
    valor6 =str(random.randint(1, 10))
    question["pregunta"] = cursor["pregunta"].replace("$",valor1 ,1).replace("&", valor2,1).replace("$", valor3,1).replace("$", valor4,1).replace("&", valor5,1).replace("$", valor6,1)
    inicio_operacion = question["pregunta"].find("(")
    fin_operacion = question["pregunta"].find("?")
    operacion = question["pregunta"][inicio_operacion:fin_operacion]

    # Calcular la expresión matemática utilizando eval()
    resultado = eval(operacion)
    resultadoFalso1 = resultado+random.randint(1, 7)
    resultadoFalso2 = eval(operacion.replace("("," ").replace(")"," "))    
    resultadoFalso3 = resultado-random.randint(1, 7)
    lista = [resultado,resultadoFalso1,resultadoFalso2,resultadoFalso3]
    random.shuffle(lista)
    question["respuestas"] = lista
    question["correcta"]=resultado
    question["formato"] = cursor["formato"]
    question["idTema"]=cursor["idTema"]
    
    print(question)
#Ecuaciones
def CrearFSeleccionarEcuaciones(question):
    cursor = collection.find({"formato": "Seleccionar"})[1]
    valor1 =str(random.randint(2, 10))
    opciones = ["+","-"]
    valor2 =opciones[random.randint(0, 1)]
    valor3 =str(random.randint(1, 10))
    valor4 =str(random.randint(1, 10))
    question["pregunta"] = cursor["pregunta"].replace("#",valor2 ,1).replace("$", valor1,1).replace("$", valor3,1).replace("$", valor4,1)
    resultado = 0
    resultadoFalso2 = 0
    if valor2 == "+":
        resultado = round((int(valor4) - int(valor3))/int(valor1),2)
        resultadoFalso2 = round((int(valor4) + int(valor3))/int(valor1),2)
    else:
        resultado = round((int(valor4) + int(valor3))/int(valor1),2)
        resultadoFalso2 = round((int(valor4) - int(valor3))/int(valor1),2)

    resultadoFalso1 =  round(resultado+random.randint(1, 6),2)
    resultadoFalso3 =  round(resultado-random.randint(1, 6),2)
    lista = [resultado,resultadoFalso1,resultadoFalso2,resultadoFalso3]
    random.shuffle(lista)
    question["respuestas"] = lista
    question["correcta"]=resultado
    question["formato"] = cursor["formato"]
    question["idTema"]=cursor["idTema"]
    
    print(question)
    
CrearFSeleccionarEcuaciones({})