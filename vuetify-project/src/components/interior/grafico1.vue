<template>
    <div>
        <v-sheet>
        <v-container class="fill-height">
            <Doughnut id="my-chart-id" :key="chartKey" :options="chartOptions" :data="chartData" />
        </v-container></v-sheet>
    </div>
</template>
<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { GetResueltas,GetTotalesEjercicios } from '@/communicationsManager'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'DoughnutChart',
    components: { Doughnut },
    data() {
        const resueltas = 0
        const totales = 0
        const chartKey = 0
        const chartData = {
            labels: ['Preguntas resultas', 'Preguntas por resolver'],
            datasets: [{
                data: [resueltas, totales],
                backgroundColor: ['#38db00', '#808080']
            }]
        }
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false
        }

        return {
            chartData,
            chartKey,
            chartOptions,
            resueltas,
            totales,
        }
    },
    mounted() {
        GetResueltas().then((res) => {
            this.resueltas = res.length
            this.chartData.datasets[0].data[0] = this.resueltas
        }).then(GetTotalesEjercicios().then((res) => {
            this.totales = res.length
            this.chartData.datasets[0].data[1] = this.totales-this.resueltas
        }).then(() => {
            this.chartKey += 1
        }))
    },
}
</script>
<style></style>