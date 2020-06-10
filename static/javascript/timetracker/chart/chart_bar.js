

function refreshGraph(ALL_DAYS, id, BAR_TYPE, VARIABLE) {
  //Decide type of collection we need to filter
  let COLLECTION;
  (VARIABLE == 'TIME') ? COLLECTION = timeGraphs : "";
  (VARIABLE == 'WRKT') ? COLLECTION = workoutGraphs : "";
  (VARIABLE == 'WAKE') ? COLLECTION = wakeupGraphs : "";
  let result = COLLECTION.filter((ch) => ch.id == id)[0];

  // Delete previous
  result.data.labels = [];
  result.data.datasets[0].data = [];
  result.data.datasets[0].backgroundColor = [];
  result.chart.destroy();

  // AVG LINE: Dataset
  // AVG LINE: POP IT UP
  let AVG = calcAvg(ALL_DAYS, VARIABLE);
  let avgline = {
    type: 'line',
    // fill: false,
    radius: 1,
    label: `Average ${VARIABLE}`,
    data: [],
    backgroundColor: []
  };
  (result.data.datasets.length > 1) ? result.data.datasets.pop() : "";


  
  // Recreate
  result.type = BAR_TYPE;
  result.options.title.text = `${BAR_TYPE.toUpperCase()} - ${getTextValueOfMonth(ALL_DAYS[0].month)}`;
  ALL_DAYS.forEach((day) => {
    result.data.labels.push(`${day.month}-${day.day}`);

    //Decide type of data or variable we have
    let ITEM;
    (VARIABLE == 'TIME') ? ITEM = day.total : "";
    (VARIABLE == 'WRKT') ? ITEM = day.workout : "";
    (VARIABLE == 'WAKE') ? ITEM = Number(day.wakeupHour + day.wakeupMin/60).toPrecision(3) : "";
    result.data.datasets[0].data.push(ITEM);

    //Determine the color according to the day of week
    let {weekday, color} = determineWeekDay(day.year, day.month, day.day, result.color);
    result.data.datasets[0].backgroundColor.push(color);

    // AVG LINE:
    avgline.data.push(AVG); // added
    avgline.backgroundColor.push(color); // added
  });
  // AVG LINE: PUSH IT
  (result.type == 'line' || result.type == 'bar') ? result.data.datasets.push(avgline) : "";
  result.chart = createChart(result.cxt, result.type, result.data, result.options);
}













function refreshHistogram(ALL_DAYS, id) {
  let result = histoGraphs.filter((ch) => ch.id == id)[0];

  // Delete previous
  result.data.labels = [0];           // bef careful!!!!!!!! should be initialized with zero
  result.data.datasets[0].data = [];  // be careful!!! should be initialized with empty
  result.chart.destroy();

  // Generate histo_bars
  // Determine min, max intervals
  let histo_bars = []; 
  for (let i=0; i <= defaultNumBins; i++) {
    let max;
    (i == defaultNumBins) ?  max = 'Above' : max = defaultBinWidth*(i+1);
    histo_bars.push(new histo_bar(0, defaultBinWidth*i, max));
  }  
  // Histo interval: distribute the counts accordingly
  ALL_DAYS.forEach((day) => {
    histo_bars.forEach((hbar) => {
      let max = hbar.max;
      let min = hbar.min;
      (max == 'Above') ? max = 999999999 : "Not quite above.";
      (day.total >= min && day.total < max) ? hbar.count++ : "Not counting.";
    });
  });
  

  // Transfer values to labels
  // Transfer counts to dataset
  // Set Histogram scales
  histo_bars.forEach((hbar) => {
    result.data.labels.push(hbar.max);
    result.data.datasets[0].data.push(hbar.count);
  });
  result.options.scales = {
    xAxes: [{
      display: false,
      barPercentage: 1.25,
      ticks: {
          max: defaultBinWidth*(defaultNumBins),
      }
    }, {
      display: true,
      ticks: {
          autoSkip: false,
          max: defaultBinWidth*(defaultNumBins+1),
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  };
  result.options.title.text = `HIST - ${getTextValueOfMonth(ALL_DAYS[0].month)}`;
  result.chart = createChart(result.cxt, result.type, result.data, result.options);
}























