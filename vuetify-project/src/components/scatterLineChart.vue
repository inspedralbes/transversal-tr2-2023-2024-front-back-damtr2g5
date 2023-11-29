<template>
  <Line ref="line" :data="data" :options="options" @click="handleChartClick"/>
</template>

<script lang="ts">
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
  name: 'App',
  components: {
    Line
  },
  data() {
    return {
      points: [],
      data: {
        datasets: [{
          data: this.points,
          borderColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 10,
          pointHoverRadius: 6,
          backgroundColor: 'rgba(255, 99, 132, 1)',

        }, {
          label: 'Recta Lineal',
          data: [], // No hay datos iniciales
          borderColor: 'rgba(255, 99, 132, 1)', // Color de la línea
          fill: false,
          pointRadius: 10,
          pointHoverBorderColor: 'rgba(255, 255, 255, 0)',
          pointHoverColor: 'rgba(255, 255, 255, 0)',
          type: 'line',


        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            type: 'linear',
            position: 'center',
            min: -10,
            max: 10,
            step: 1,
            ticks: {
              stepSize: 1
            }
          },
          y: {
            type: 'linear',
            position: 'center',
            min: -10,
            max: 10,
            step: 1,
            ticks: {
              stepSize: 1
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            displayColors: false,
            filter: function (tooltipItem) {
              return tooltipItem.datasetIndex === 0;
            }

          }

        },
        animation: {
          duration: 0
        }
      }
    }
  },
  methods: {
    // Manejador del clic en el gráfico
    handleChartClick(event) {
      const chartInstance = this.$refs.line.chart
      var xValue = Math.round(chartInstance.scales.x.getValueForPixel(event.offsetX));
    var yValue = Math.round(chartInstance.scales.y.getValueForPixel(event.offsetY));
      
      console.log(xValue, yValue);

    },
  },
}
</script>