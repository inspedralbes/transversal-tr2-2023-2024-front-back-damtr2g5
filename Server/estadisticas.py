from pymongo import MongoClient
import pandas as pd
import plotly.express as px
from matplotlib.colors import ListedColormap

# Conexión a la base de datos
client = MongoClient("mongodb+srv://a22osczapmar:Nitrome7.@cluster0.uiii7nf.mongodb.net/")
db = client['mathGameMongo']
collection = db['history']
collection2 = db['question']

# Obtener datos de la colección 'history'
data = collection.find()
datos = {"Usuario" : [], "Pregunta": [], "Correcta": []}

# Obtener datos relevantes de la colección 'history'
for x in data:
    datos["Usuario"].append(x["idUsuario"])
    datos["Pregunta"].append(x["idPregunta"])
    datos["Correcta"].append(int(x["correcta"]))

# Crear un DataFrame con los datos
df = pd.DataFrame(datos)

# Función para obtener el tema de una pregunta
def sacarTema(idP):
    pregunta = collection2.find({'id': idP})
    return pregunta[0]["idTema"]

# Agregar una nueva columna 'Tema' al DataFrame
df['Tema'] = df['Pregunta'].apply(sacarTema)

# Mapear los temas a nombres
tema_mapping = {
    1: 'Números y Operaciones',
    2: 'Ecuaciones',
    3: 'Funciones',
    4: 'Medidas',
    5: 'Geometría',
    6: 'Estadística'
}
df['NombreTema'] = df['Tema'].apply(tema_mapping.get)

# Crear el gráfico 3D con Plotly Express
fig = px.scatter_3d(df, x='Usuario', y='Pregunta', z='Correcta', color='Tema',
                    color_discrete_map=tema_mapping, labels={'Usuario': 'Usuario', 'Pregunta': 'Pregunta', 'Correcta': 'Correcta'}, title='Resultados de ejercicios por usuario')

# Mostrar el gráfico
fig.write_html("./Server/file.html")

'''fig = plt.figure(figsize = (10, 7))
ax = plt.axes(projection ="3d")
ax.grid(b = True, color ='grey', 
        linestyle ='-.', linewidth = 0.3, 
        alpha = 0.2) 
 
colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b']
custom_cmap = ListedColormap(colors)
sctt = ax.scatter3D(x, y, z,
                    alpha = 0.8,
                    c = df['Tema']
                    , cmap=custom_cmap)

plt.title('Ejercicios completados por usuario por dia')
ax.set_ylabel('Pregunta')
ax.set_xlabel('Usuario')
ax.set_zlabel('Correcta')
tema_labels = [obtener_nombre_tema(i) for i in sorted(df['Tema'].unique())]
cbar = plt.colorbar(sctt, ax=ax, shrink=0.5, aspect=5, ticks=sorted(df['Tema'].unique()))
cbar.ax.set_yticklabels(tema_labels)
fig.show()'''