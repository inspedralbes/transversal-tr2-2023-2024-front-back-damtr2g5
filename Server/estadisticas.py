from pymongo import MongoClient
import pandas as pd
import json

client = MongoClient("mongodb+srv://a22osczapmar:Nitrome7.@cluster0.uiii7nf.mongodb.net/")

db = client['mathGameMongo']
collection = db['history']
data =  collection.find({"idUsuario": 41})
datos={"dato":[]}
'''
for x in data:
  datos["idUsuario"] = x["idUsuario"]
  datos["idPregunta"] = x["idPregunta"]
  datos["idEjercicio"] = x["idEjercicio"]
  datos["respuesta"] = x["respuesta"]
  datos["correcta"] = x["correcta"]
'''
for x in data:
    datos["dato"].append(x)

df = pd.DataFrame(datos)

print(df)
