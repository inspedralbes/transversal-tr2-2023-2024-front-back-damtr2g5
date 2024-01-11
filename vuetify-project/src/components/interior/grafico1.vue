<template>
    <Doughnut id="my-chart-id" :key="chartKey" :options="chartOptions" :data="chartData" />
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
            labels: ['Preguntes completades', 'Preguntes sense resoldre'],
            datasets: [{
                data: [resueltas, totales],
                backgroundColor: ['#38db00', '#363732']
            }]
        }
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font:
                        {
                            size: 20,
                            family: 'Acme',
                        }
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