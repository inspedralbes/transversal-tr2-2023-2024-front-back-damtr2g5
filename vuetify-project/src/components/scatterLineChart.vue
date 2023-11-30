<template>
  <Line ref="line" :data="chartData" :options="options" @click="handleChartClick" />
</template>

<script>
import { useAppStore } from '@/store/app'
import { Line } from 'vue-chartjs';
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
  name: 'ScatterLineChart',
  components: {
    Line
  },
  props: {
    isClickDisabled: {
            type: Boolean,
            required: true
        }
  },
  data() {
    return {
      store: useAppStore(),
      points: [],
      options: {
        aspectRatio: 1,
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            type: 'linear',
            position: 'center',
            min: -10,
            max: 10,
            ticks: {
              stepSize: 1
            }
          },
          y: {
            type: 'linear',
            position: 'center',
            min: -10,
            max: 10,
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
            },
            callbacks: {
              label: function (context) {
                const data = context.parsed;
                return `(${data.x}, ${data.y})`;
              },
              title: function () {
                return null;
              }
            }
          }
        },
        animation: {
          duration: 0
        }
      }
    }
  },
  computed: {
    lineData() {
      return this.calculateLine(this.points);
    },
    chartData() {
      return {
        datasets: [{
          data: [...this.points],
          borderColor: 'rgba(255, 99, 132, 1)',
          pointRadius: 7,
          pointHoverRadius: 4,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        }, {
          label: 'Recta Lineal',
          data: this.lineData,
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
          pointRadius: 0,
          pointHoverRadius: 0,
          type: 'line',
        }]
      };
    },
  },
  methods: {
    handleChartClick(event) {
      if (this.isClickDisabled) {
        return;
      }
      const chartInstance = this.$refs.line.chart;
      const xValue = Math.round(chartInstance.scales.x.getValueForPixel(event.offsetX));
      const yValue = Math.round(chartInstance.scales.y.getValueForPixel(event.offsetY));
      const existingPointIndex = this.findPointIndex(this.points, xValue, yValue);
      if (existingPointIndex !== -1) {
        this.points.splice(existingPointIndex, 1);
        this.store.setRespuesta('');
        //this.animateLine(chartInstance, this.lineData);
      } else {
        if (this.points.length < 2) {
          this.points.push({ x: xValue, y: yValue });
          if (this.points.length === 2) {
            this.store.setRespuesta(this.points);
          }
          //this.animateLine(chartInstance, this.lineData);
        }
      }
      console.log("store",this.store.$state.respuesta);
    },
    findPointIndex(points, x, y) {
      for (let i = 0; i < points.length; i++) {
        if (points[i].x === x && points[i].y === y) {
          return i;
        }
      }
      return -1;
    },
    calculateLine(points) {
      if (points.length === 2) {
        const x1 = points[0].x;
        const y1 = points[0].y;
        const x2 = points[1].x;
        const y2 = points[1].y;

        const slope = (x2 - x1) !== 0 ? (y2 - y1) / (x2 - x1) : Infinity;
        const intercept = y1 - slope * x1;

        const lineData = [];

        if (Math.abs(slope) > 1 || !isFinite(slope)) {
          for (let y = -10; y <= 10; y++) {
            const x = isFinite(slope) ? (y - intercept) / slope : x1;
            lineData.push({ x: x, y: y });
          }
        } else {
          for (let x = -10; x <= 10; x++) {
            const y = slope * x + intercept;
            lineData.push({ x: x, y: y });
          }
        }

        return lineData;
      } else {
        return [];
      }
    },
    animateLine(chart, lineData) {
      chart.data.datasets[1].data = [];
      chart.update();

      const totalDuration = 400;
      const delayBetweenPoints = totalDuration / lineData.length;

      lineData.forEach((point, index) => {
        setTimeout(() => {
          if (chart.data.datasets[0].data[1] === undefined) {
            // Do nothing
          } else {
            chart.data.datasets[1].data.push(point);
            chart.update();
          }
        }, index * delayBetweenPoints);
      });
    }
  },
}
</script>