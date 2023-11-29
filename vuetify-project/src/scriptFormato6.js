var ctx = document.getElementById('myChart').getContext('2d');
var points = [];

var scatterLineChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    datasets: [{
      data: points,
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
    responsive: false,
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
});

document.getElementById('myChart').addEventListener('click', function (event) {
  var xValue = Math.round(scatterLineChart.scales.x.getValueForPixel(event.offsetX));
  var yValue = Math.round(scatterLineChart.scales.y.getValueForPixel(event.offsetY));

  var existingPointIndex = findPointIndex(points, xValue, yValue);

  if (existingPointIndex !== -1) {
    points.splice(existingPointIndex, 1);
    var lineData = calculateLine(points);
    animateLine(scatterLineChart, lineData);
  } else {
    if (points.length < 2) {
      points.push({ x: xValue, y: yValue });
      var lineData = calculateLine(points);
      animateLine(scatterLineChart, lineData);
    }
  }


});

function findPointIndex(points, x, y) {
  for (var i = 0; i < points.length; i++) {
    if (points[i].x === x && points[i].y === y) {
      return i;
    }
  }
  return -1;
}

function calculateLine(points) {
  if (points.length === 2) {
    var x1 = points[0].x;
    var y1 = points[0].y;
    var x2 = points[1].x;
    var y2 = points[1].y;

    var slope = (x2 - x1) !== 0 ? (y2 - y1) / (x2 - x1) : Infinity; // Manejar la pendiente infinita

    var intercept = y1 - slope * x1;

    var lineData = [];

    // Ajustar la lógica para dibujar puntos según la pendiente
    if (Math.abs(slope) > 1 || !isFinite(slope)) {
      // Si la pendiente supera 45 grados o es infinita, dibujar puntos en el eje y
      for (var y = -10; y <= 10; y++) {
        var x = isFinite(slope) ? (y - intercept) / slope : x1; // Manejar la pendiente infinita
        lineData.push({ x: x, y: y });
      }
    } else {
      // Si la pendiente no supera 45 grados, dibujar puntos en el eje x
      for (var x = -10; x <= 10; x++) {
        var y = slope * x + intercept;
        lineData.push({ x: x, y: y });
      }
    }

    return lineData;
  } else {
    return [];
  }
}

function animateLine(chart, lineData) {
  chart.data.datasets[1].data = [];
  chart.update();

  const totalDuration = 400;
  const delayBetweenPoints = totalDuration / lineData.length;

  lineData.forEach((point, index) => {
    setTimeout(() => {
      if (chart.data.datasets[0].data[1] === undefined) {

      } else {
        chart.data.datasets[1].data.push(point);
        chart.update();
      }

    }, index * delayBetweenPoints);
  });
}