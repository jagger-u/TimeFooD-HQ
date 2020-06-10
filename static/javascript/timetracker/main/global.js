function createChart(cxt, type, data, options) {
  let chart = new Chart(cxt, {
    type: type,
    data: data,
    options: options,
  });
  return chart;
}
class timeGraph {
  constructor(id, cxt, color) {
    let data = {
      labels: [],
      datasets: [
      {
        label: 'Total minutes',
        data: [],
        backgroundColor: []
      }
      ]
    };
    let options = {
      title: {
        display: true,
        text: `TIME ${id}`,
        fontSize: 28,
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [{
          ticks: {
            // beginAtZero: true,
            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
          }
        }]
      }
    }
    this.id = id;
    this.cxt = cxt;
    this.color = color;
    this.data = data;
    this.type = 'line';
    this.options = options;
    this.chart = createChart(cxt, 'line', data, options);
  }
}
class histoGraph {
  constructor(id, cxt, color) {
    let data = {
      labels: [0], // needs to be [0] for histogram
      datasets: [
      {
        label: 'Counts',
        data: [0], // needs to be [0] for histogram
        backgroundColor: color // needs to be color for histogram
      }
      ]
    };
    let options = {
      title: {
        display: true,
        text: `HIST ${id}`,
        fontSize: 28,
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false // need to be false for histogram
      },
      scales: {
        yAxes: [{
          ticks: {
            // beginAtZero: true,
            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
          }
        }]
      }
    }
    this.id = id;
    this.cxt = cxt;
    this.color = color;
    this.data = data;
    this.type = 'bar';
    this.options = options;
    this.chart = createChart(cxt, 'bar', data, options);
  }
}
class workoutGraph {
  constructor(id, cxt, color) {
    let data = {
      labels: [],
      datasets: [
      {
        label: 'Score',
        data: [],
        backgroundColor: []
      }
      ]
    };
    let options = {
      title: {
        display: true,
        text: `WRKT ${id}`,
        fontSize: 28,
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [{
          ticks: {
            // beginAtZero: true,
            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
          }
        }]
      }
    }
    this.id = id;
    this.cxt = cxt;
    this.color = color;
    this.data = data;
    this.type = 'bar';
    this.options = options;
    this.chart = createChart(cxt, 'bar', data, options);
  }
}
class wakeupGraph {
  constructor(id, cxt, color) {
    let data = {
      labels: [],
      datasets: [
      {
        label: 'Delay',
        data: [],
        backgroundColor: []
      }
      ]
    };
    let options = {
      title: {
        display: true,
        text: `WAKE ${id}`,
        fontSize: 28,
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [{
          ticks: {
            // beginAtZero: true,
            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
          }
        }]
      }
    }
    this.id = id;
    this.cxt = cxt;
    this.color = color;
    this.data = data;
    this.type = 'bar';
    this.options = options;
    this.chart = createChart(cxt, 'bar', data, options);
  }
}
class histo_bar {
  constructor(count, min, max) {
    this.count = count;
    this.min = min;
    this.max = max;
  }
}




