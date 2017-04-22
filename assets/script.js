const red = "#FF7373";
const blue = "#48AFF0";
const yellow = "#FFC940";
const green = "#3DCC91";
const purple = "#AD99FF";
const orange = "#FFB366";

const red_50 = "rgba(255, 115, 115, 0.5)";
const blue_50 = "rgba(72, 175, 240, 0.5)";
const yellow_50 = "rgba(255, 201, 64, 0.5)";
const green_50 = "rgba(61, 204, 145, 0.5)";
const purple_50 = "rgba(173, 153, 255, 0.5)";
const orange_50 = "rgba(255, 179, 102, 0.5)";

const black = "#2c3e50";
const white = "#ecf0f1";

Chart.defaults.global.defaultFontColor = "rgba(236, 240, 241, 0.8)";
Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 14;
Chart.defaults.scale.gridLines.color = "rgba(236, 240, 241, 0.07)";
Chart.defaults.scale.gridLines.zeroLineColor = "rgba(236, 240, 241, 0.3)";


$(document).ready(() => {

  let g0 = document.getElementById("avgSleep").getContext("2d");
  let g1 = document.getElementById("immune").getContext("2d");
  let g2 = document.getElementById("weight").getContext("2d");
  let g3 = document.getElementById("pvt").getContext("2d");
  let g4 = document.getElementById("memory").getContext("2d");
  let selectedHour;


  $("#hour-select").change(function(e) {
    selectedHour = parseInt($(this).val());

    $(".hour-success-btn").addClass("show-btn");

    calculateAvgSleepColor(selectedHour);
  })

  let changeBar = (newData) => {
    immune_bar.config.data.datasets[0].data = newData;
    immune_bar.update(500);
  }


  let animated_pie = false;
  let animated_immune = false;
  let animated_weight = false;
  let animated_pvt = false;
  let animated_memory = false;

  const trigger_offset = 400;

  let pie_trigger, immune_trigger, weight_trigger, pvt_trigger, memory_trigger;

  let calculate_trigger_dist = () => {
    pie_trigger = $("#avgSleep").offset().top - window.innerHeight + trigger_offset;
    immune_trigger = $("#immune").offset().top - window.innerHeight + trigger_offset;
    weight_trigger = $("#weight").offset().top - window.innerHeight + trigger_offset;
    pvt_trigger = $("#pvt").offset().top - window.innerHeight + trigger_offset;
    memory_trigger = $("#memory").offset().top - window.innerHeight + trigger_offset;
  }

  calculate_trigger_dist();
  console.log(memory_trigger);

  $(window).scroll(() => {
    let dist = $(window).scrollTop();

    if (!animated_pie && dist > pie_trigger) {
      animated_pie = true;
      let avg_sleep_pie = new Chart(g0, {
        type: "doughnut",
        data: avg_sleep_data,
        options: avg_sleep_options,
      })
      $("#avgSleep").addClass("show-chart");
      calculate_trigger_dist();
    }

    if (!animated_immune && dist > immune_trigger) {
      animated_immune = true;
      let immune_bar = new Chart(g1, {
        type: "bar",
        data: immune_bar_data,
        options: immune_bar_options,
      });
      $("#immune").addClass("show-chart");
      calculate_trigger_dist();
    }

    if (!animated_weight && dist > weight_trigger) {
      animated_weight = true;
      let weight_bar = new Chart(g2, {
        type: "bar",
        data: weight_chart_data,
        options: weight_chart_options,
      });
      $("#weight").addClass("show-chart");
      calculate_trigger_dist()
    }

    if (!animated_pvt && dist > pvt_trigger) {
      animated_pvt = true;
      let pvt_line = new Chart(g3, {
        type: "line",
        data: pvt_line_data,
        options: pvt_line_options,
      });
      $("#pvt").addClass("show-chart");
      calculate_trigger_dist()
    }

    if (!animated_memory && dist > memory_trigger) {
      animated_memory = true;
      let memory_line = new Chart(g4, {
        type: "line",
        data: memory_line_data,
        options: memory_line_options,
      });
      $("#memory").addClass("show-chart");
      calculate_trigger_dist()
    }
  })
})



calculateAvgSleepColor = (num) => {
  if (num == 4) {
    avg_sleep_colors[0] = red;
  } else if (num == 5) {
    avg_sleep_colors[1] = blue;
  } else if (num == 6) {
    avg_sleep_colors[2] = yellow;
  } else if (num == 7) {
    avg_sleep_colors[3] = green;
  } else {
    avg_sleep_colors[4] = purple;
  }
}

// Chart data here
var avg_sleep_colors = [red_50, blue_50, yellow_50, green_50, purple_50];

var avg_sleep_data = {
  labels: ["Less than 4", "5 hrs", "6 hrs", "7 hrs", "8 or more"],
  datasets: [{
    data: [14, 26, 25, 29, 5],
    backgroundColor: avg_sleep_colors,
    borderColor: [black, black, black, black, black],
    borderWidth: 3,
  }]
}

var avg_sleep_options = {
  legend: {
    position: "right",
    fullWidth: false,
    onClick: null,
  },
  tooltips: {
    enabled: false,
  },
  hover: {
    animationDuration: 0,
  },
  animation: {
    animateScale: true,
    onComplete: function () {
      var ctx = this.chart.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      this.data.datasets.forEach(function (dataset) {
        for (var i = 0; i < dataset.data.length; i++) {
          var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
              total = dataset._meta[Object.keys(dataset._meta)[0]].total,
              mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
              start_angle = model.startAngle,
              end_angle = model.endAngle,
              mid_angle = start_angle + (end_angle - start_angle)/2;

          var x = mid_radius * Math.cos(mid_angle);
          var y = mid_radius * Math.sin(mid_angle);

          ctx.fillStyle = '#fff';
          var percent = `${String(Math.round(dataset.data[i]/total*100))}%`;
          // Display percent in another line, line break doesn't work for fillText
          ctx.fillText(percent, model.x + x, model.y + y);
        }
      });
    }
  },
}




var barData = {
  3: [16, 5, 10, 3, 7, 6],
  4: [2, 9, 2, 3, 2, 7],
  5: [23, 4, 1, 6, 7, 8],
  6: [4, 15, 6, 7, 1, 9],
  7: [5, 10, 7, 8, 9, 10],
  8: [10, 11, 12, 13, 14, 15],
}

var immune_bar_data = {
  labels: ["0 days", "10 days", "20 days"],
  datasets: [{
    label: "8 hours of sleep",
    data: [0.14, 0.5, 0.6],
    backgroundColor: [blue, blue, blue],
    borderWidth: 1
  }, {
    label: "less sleep",
    data: [0.14, 1.25, 0.8],
    backgroundColor: [red, red, red],
    borderWidth: 1
  }]
}

var immune_bar_options = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero:true
      }
    }]
  },
  tooltips: {
    enabled: false,
  },
  animation: {
    onProgress: function () {
      var chartInstance = this.chart,
          ctx = chartInstance.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
              var data = dataset.data[index];
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
      });
    }
  }
}

// WEIGHT BAR

var weight_chart_data = {
  labels: [
    "Urge to eat",
    "Hunger Sensation",
    "Appetite (low-carb)",
    "Appetite (high-carb)",
  ],
  datasets: [{
    label: "change in appetite",
    data: [28, 24, 18, 32],
    backgroundColor: [red, blue, yellow, green],
    borderColor: [
      "rgba(255,99,132,1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
    ],
    borderWidth: 1
  }]
}

var weight_chart_options = {
  scales: {
    xAxes: [{
      barPercentage: 0.6,
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
      }
    }]
  },
  tooltips: {
    enabled: false,
  },
  legend: {
    display: false,
  },
  animation: {
    onProgress: function () {
      var chartInstance = this.chart,
          ctx = chartInstance.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";

      this.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar, index) {
              var data = `+${dataset.data[index]}%`;
              ctx.fillText(data, bar._model.x, bar._model.y - 5);
          });
      });
    }
  }
}

// PVT LINE
var pvt_hour_data = {
  3: [0, null, null, null, null, null, 9.7, null, null, 12, null, 14],
  4: [0, null, null, null, null, null, 9.7, null, null, 12, null, 14],
  5: [0, null, null, null, null, null, 9.7, null, null, 12, null, 14],
  6: [0, null, null, null, null, null, 4, null, null, null, null, 8.5],
  7: [0, null, null, null, null, null, 4, null, null, null, null, 8.5],
  8: [0, null, null, null, null, null, 1, null, null, null, null, 2],
}

var pvt_line_data = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  datasets: [{
    label: "no sleep",
    data: [0, 8.2, 12.8, 16],
    borderColor: red,
    pointBackgroundColor: red,
    spanGaps: true,
    fill: false,
  }, {
    label: "4 hours per night",
    data: pvt_hour_data[4],
    borderColor: blue,
    pointBackgroundColor: blue,
    spanGaps: true,
    fill: false,
  }]
}

var pvt_line_options = {
  scales: {
    yAxes: [{
      stacked: true,
      scaleLabel: {
        display: true,
        labelString: "Errors on PVT test",
      }
    }]
  }
}

// MEMORY LINE
var memory_line_data = {
  labels: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  datasets: [{
    label: "no sleep",
    data: [10, 4.5, 3.5, null, 2.5, null, null, null, 1.2],
    borderColor: red,
    pointBackgroundColor: red,
    spanGaps: true,
    fill: false,
  }, {
    label: "sleep",
    data: [10, 7, 5.5, null, 5.9, null, null, null, 5.8],
    borderColor: green,
    pointBackgroundColor: green,
    spanGaps: true,
    fill: false,
  }]
}

var memory_line_options = {
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: "Hours after memorizing",
      }
    }],
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: "# of syllables remembered",
      },
      ticks: {
        beginAtZero: true,
      }
    }]
  }
}
