from pymongo import MongoClient
import pandas as pd
import matplotlib.pyplot as plt
import json

client = MongoClient("mongodb+srv://a22osczapmar:Nitrome7.@cluster0.uiii7nf.mongodb.net/")

db = client['mathGameMongo']
collection = db['history']
data =  collection.find()
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

df = pd.DataFrame(datos["dato"])
df = df.drop("_id", axis=1)
df = df.drop("correcta", axis=1)
# Filtrar el DataFrame para incluir solo las filas que están relacionadas entre 'idUsuario' y 'idPregunta'
filtered_df = df[['idUsuario', 'idPregunta']]

fig, ax = plt.subplots()

# Crear el gráfico de dispersión con los datos filtrados
filtered_df.plot(kind='scatter', x='idUsuario', y='idPregunta', ax=ax)
ax.grid(True)
ax.set_ylim(0, filtered_df['idPregunta'].max() + 10)  # Establecer límites del eje y
ax.set_yticks(range(0, filtered_df['idPregunta'].max() + 10, 10))  # Establecer los ticks del eje y

plt.show() 
