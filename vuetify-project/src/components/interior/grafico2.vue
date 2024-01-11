<template>

    <Line id="my-chart-id" :key="chartKey" :options="chartOptions" :data="chartData" />
</template>
<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { historial, getBatallas } from '@/communicationsManager'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


export default {
    name: 'LineChart',
    components: { Line },
    data() {
        const resueltas = null
        const date = obtenerFecha()
        const totales = 0
        const chartKey = 0

        function obtenerFecha() {
            const ahora = new Date();

            const dia = ahora.getDate().toString().padStart(2, '0');
            const mes = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0, por eso se suma 1
            const año = ahora.getFullYear();

            const fechaHoraFormateada = `${año}/${mes}/${dia}`;

            return fechaHoraFormateada;
        }
        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Registres',
                    backgroundColor: '#F87060',
                    data: [40, 39, 10, 40, 39, 80, 40]
                }
            ]
        }
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    ticks: {
                        stepSize: 1
                
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Registres per dia',
                    font: {
                        size: 20,
                        family: 'Acme'
                    }
                },

            }
        }

        return {
            chartData,
            chartKey,
            chartOptions,
            resueltas,
            totales,
            date
        }
    },
    mounted() {
        var dias = []
        var habiles = []
        function obtenerDiasEntreFechas(fechaInicio, fechaFin) {
            const dias = [];
            const inicioParts = fechaInicio.split('/').map(Number);
            const finParts = fechaFin.split('/').map(Number);
            const inicio = new Date(inicioParts[0], inicioParts[1] - 1, inicioParts[2]);
            const fin = new Date(finParts[0], finParts[1] - 1, finParts[2]);

            for (let fecha = inicio; fecha <= fin; fecha.setDate(fecha.getDate() + 1)) {
                dias.push(new Date(fecha).toLocaleDateString('sv-SE').replaceAll("-", "/")); // Cambia el formato de fecha si es necesario
            }

            return dias;
        }
        // Ejemplo de uso:
        var fechaInicio = '2023/12/15'; // Fecha de inicio
        var fechaFin = '2024/01/15'; // Fecha de finalización
        historial().then((res) => {
            fechaFin = res[0].hora.split(" ")[0];
            fechaInicio = res[res.length - 1].hora.split(" ")[0];
            var entre = obtenerDiasEntreFechas(fechaInicio, fechaFin)
            dias = entre

            for (let i = 0; i < res.length; i++) {
                const element = res[i].hora;
                    //if (!dias.includes(element.split(" ")[0].slice(5)))
                    habiles.push(element.split(" ")[0])
            }
        }).then(() => {
            var datos = {}
            dias.forEach((key) => {
                datos[key] = 0
            });
            console.log(habiles);
            habiles.forEach(element => {
                if (element in datos) {
                    datos[element] += 1
                }
            });
            console.log(datos);
            var llaves = Object.keys(datos)
            llaves.sort((fecha1, fecha2) => {
                const [year1, month1, day1] = fecha1.split('/').map(Number);
                const [year2, month2, day2] = fecha2.split('/').map(Number);

                if (year1 === year2) {
                    if (month1 === month2) {
                        return day1 - day2; // Ordenar por día si los años y meses son iguales
                    } else {
                        return month1 - month2; // Ordenar por mes
                    }
                } else {
                    return year1 - year2; // Ordenar por año
                }
            });

            this.chartData.labels = llaves;
            this.chartData.datasets[0].data = datos
        }).then(() => {
            this.chartKey += 1
        })
    },
}
</script>
<style></style>