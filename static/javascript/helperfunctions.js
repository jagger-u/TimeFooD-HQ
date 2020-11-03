

function determineWeekDay(y, m, d, color) {
  let weekday;
  let day = (new Date(y, m-1, d)).getDay();
  if (day == 0) {
    weekday = 'Sun';
    color = `${color.substring(0,color.length-4)}0.7)`;
  }
  else if (day == 1) {
    weekday = 'Mon';
  }
  else if (day == 2) {
    weekday = 'Tue';
  }
  else if (day == 3) {
    weekday = 'Wed';
  }
  else if (day == 4) {
    weekday = 'Thu';
  }
  else if (day == 5) {
    weekday = 'Fri';
  }
  else if (day == 6) {
    weekday = 'Sat';
    color = `${color.substring(0,color.length-4)}0.7)`;
  }
  else {
    weekday = 'Nani???';
  }
  return {weekday, color};
}

function getTextValueOfMonth(month) {
  let value;
  if (month == 1) {
    value = "January";
  } 
  else if (month == 2) {
    value = "February";
  }
  else if (month == 3) {
    value = "March";
  }
  else if (month == 4) {
    value = "April";
  }
  else if (month == 5) {
    value = "May";
  }
  else if (month == 6) {
    value = "June";
  }
  else if (month == 7) {
    value = "July";
  }
  else if (month == 8) {
    value = "August";
  }
  else if (month == 9) {
    value = "September";
  }
  else if (month == 10) {
    value = "October";
  }
  else if (month == 11) {
    value = "November";
  }
  else if (month == 12) {
    value = "December";
  }
  else {
    value = "NANI???";
  }
  return value;
}
function getValueOfMonth(month) {
  let value;
  if (month == "Jan") {
    value = 1;
  } 
  else if (month == "Feb") {
    value = 2;
  }
  else if (month == "Mar") {
    value = 3;
  }
  else if (month == "Apr") {
    value = 4;
  }
  else if (month == "May") {
    value = 5;
  }
  else if (month == "Jun") {
    value = 6;
  }
  else if (month == "Jul") {
    value = 7;
  }
  else if (month == "Aug") {
    value = 8;
  }
  else if (month == "Sep") {
    value = 9;
  }
  else if (month == "Oct") {
    value = 10;
  }
  else if (month == "Nov") {
    value = 11;
  }
  else if (month == "Dec") {
    value = 12;
  }
  else {
    value = 175;
  }
  return value;
}

function getValueOfMonthInt(month) {
  let value;
  if (month == "jan") {
    value = 1;
  } 
  else if (month == "feb") {
    value = 2;
  }
  else if (month == "mar") {
    value = 3;
  }
  else if (month == "apr") {
    value = 4;
  }
  else if (month == "may") {
    value = 5;
  }
  else if (month == "jun") {
    value = 6;
  }
  else if (month == "jul") {
    value = 7;
  }
  else if (month == "aug") {
    value = 8;
  }
  else if (month == "sep") {
    value = 9;
  }
  else if (month == "oct") {
    value = 10;
  }
  else if (month == "nov") {
    value = 11;
  }
  else if (month == "dec") {
    value = 12;
  }
  else {
    value = 175;
  }
  return value;
}

function calcAvg(ALL_DAYS, VARIABLE) {
  let sum = 0, ITEM;
  ALL_DAYS.forEach((day) => {
    (VARIABLE == 'TIME') ? ITEM = day.total : "";
    (VARIABLE == 'WRKT') ? ITEM = day.workout : "";
    (VARIABLE == 'WAKE') ? ITEM = day.wakeupHour + day.wakeupMin/60 : "";
    sum += ITEM;
  });
  return AVG = Number(sum / ALL_DAYS.length).toPrecision(3);
}


function generateRandomId() {
  const rand = Math.random().toString();
  return `ITEM_${rand.slice(4, rand.length)}`;
}


function getMatches(input, inputREG) {
  let rgxResult = inputREG[Symbol.matchAll](input);
  let result = Array.from(rgxResult, x => x[0]);
  return result;
}

function getTimeElement(time_block, regex) {
  const match = getMatches(time_block, regex)[0];
  const time_elem = parseInt(match.substring(1,match.length-1));
  return time_elem;
}

function bringHoursMins(time_blocks) {
  const sHourREG = /(\{[0-9]{1,2}:|\[[0-9]{1,2}:)/g;
  const sMinREG = /:[0-9]{1,2}-/g;
  const eHourREG = /-[0-9]{1,2}:/g;
  const eMinREG = /(:[0-9]{1,2}\}|:[0-9]{1,2}\])/g;


  const hours_mins = time_blocks.map(time_block => {
    const sHour = getTimeElement(time_block, sHourREG);
    const sMin = getTimeElement(time_block, sMinREG);
    const eHour = getTimeElement(time_block, eHourREG);
    const eMin = getTimeElement(time_block, eMinREG);
    return {sHour: sHour, sMin: sMin, eHour: eHour, eMin: eMin};
  });

  return hours_mins;
}



function whatIsTheDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const todayTime = new Date(year, month, day);
  return todayTime;
}

const getMinutes = (hours, minutes) => {
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
}
const getTime = (hours, minutes) => {
  const today = whatIsTheDate();
  const totalMinutes = getMinutes(hours, minutes);
  today.setMinutes(totalMinutes);
  return today;
}


function getMinsDiff(end_dateTime, start_dateTime) {
  return (end_dateTime - start_dateTime) / 1000 / 60;
}
function getHoursDiff(end_dateTime, start_dateTime) {
  return (end_dateTime - start_dateTime) / 1000 / 60 / 60;
}

function digitsShort(num) {
  return Number(num).toFixed(2);
}




function cutString(input_string, a, b) {
    const result = input_string.substring(a, input_string.length-b);
    return result;
}

function createDayPeriodsStandard(input_time_string) {
  const rowREGEX = /[A-Za-z]+\s+[A-Za-z0-9\[\]\{\}:\-= \" \(\)]*\n/g;
  const dayStrings = getMatches(input_time_string, rowREGEX);
  const dayPeriods = dayStrings.map(datString => createDayPeriodStandard(datString));
  return dayPeriods;    
}

function createDayPeriodStandard(input_string) {
    const MONTHREG = /[A-Za-z]+\s*[0-9]/g;
    const MONTHTEXTREG = /[A-Za-z]+/g;
    const monthResultString = getMatches(getMatches(input_string, MONTHREG)[0], MONTHTEXTREG)[0];
    const month = getValueOfMonthInt(monthResultString.toLowerCase().substring(0,3));


    const DAYREG = /[A-Za-z]+\s*[0-9]+\s*\(/g;
    const DAYNUMREG = /\s[0-9]+\s/g;
    const dayResultString = getMatches(getMatches(input_string, DAYREG)[0], DAYNUMREG)[0];
    const day = parseInt(cutString(dayResultString, 1, 1));


    const workoutREG = /=[0-9]*=/ig;
    const workoutNUMREG = /[0-9]+/ig;
    const workoutResultString = getMatches(getMatches(input_string, workoutREG)[0], workoutNUMREG)[0];
    const workout_num = parseFloat(workoutResultString);
    const workout = (workout_num) ? workout_num : 0;

    const timeREG = /(\{[0-9]{1,2}:[0-9]{1,2}-[0-9]{1,2}:[0-9]{1,2}\}|\[[0-9]{1,2}:[0-9]{1,2}-[0-9]{1,2}:[0-9]{1,2}\])/g;
    const timeResultStrings_array = getMatches(input_string, timeREG);

    const titleREG = /\"[A-Za-z0-9\' .,!\?]*\"/ig;
    const titleResultStrings_array = getMatches(input_string, titleREG).map(d => cutString(d, 1, 1));


    const wakeupREG = / \([0-9]+:[0-9A-z]+\)/ig;
    const wakeupNumReg = /[0-9]+/ig;
    const wakeupResultStrings = getMatches(input_string, wakeupREG)[0].split(':');
    const wakeupHour = parseFloat(getMatches(wakeupResultStrings[0], wakeupNumReg));
    const wakeupMin = parseFloat(getMatches(wakeupResultStrings[1], wakeupNumReg));
    const obj = {
      month: month,
      day: day,
      workout: workout,
      wakeupHour: wakeupHour,
      wakeupMin: wakeupMin,
      timeStringArray: timeResultStrings_array,
      titleStringArray: titleResultStrings_array
    }
    return obj;
}





function createDayPeriods(input) {
  const DAYREG = /\-\=\-[0-9A-Za-z -:\}\{\n\[\]]*\-\=\-/g;
  const timeREG = /(\{[0-9]{1,2}:[0-9]{1,2}-[0-9]{1,2}:[0-9]{1,2}\}|\[[0-9]{1,2}:[0-9]{1,2}-[0-9]{1,2}:[0-9]{1,2}\])/g;
  const dateREG = /\([0-9]{4}-[a-z]*-[0-9]{1,2}, [0-9]{1,2}:[0-9]{1,2}\)/ig;
  const workoutREG = /Workout:[ ]*[0-9]*,/ig;
  const workoutNUMREG = /[0-9]+/ig;
  const titleREG = /\"[A-Z .,!\?]*\"/ig;
  const yearREG = /\([0-9]+-/g;
  const monthREG = /-[a-z]+-/ig;
  const dayREG = /-[0-9]+,/ig;
  const wakeupREG = / [0-9]+:[0-9]+\)/ig;
  let ALL_DAYS = [];
  let DAY = getMatches(input, DAYREG);
  DAY.forEach((e) => {
    let date = getMatches(e, dateREG)[0];
    if (date == null) {
      console.log("There was an issue: ", e);
      return;
    }
    let year = parseInt(getMatches(date,yearREG)[0].substring(1,5));
    let month = getMatches(date,monthREG)[0].substring(1,4);
    let day = parseInt(getMatches(date,dayREG)[0].substring(1,3));
    let wakeup = getMatches(date,wakeupREG)[0].split(':');
    let wakeupHour = parseInt(wakeup[0]);
    let wakeupMin = parseInt(wakeup[1]);
    let workout = parseInt(getMatches(getMatches(e,workoutREG), workoutNUMREG)[0]);
    let times = getMatches(e, timeREG);
    let titles = [];
    getMatches(e, titleREG).forEach((e) => {
      titles.push(e.substring(1,e.length-1));
    });
    month = getValueOfMonth(month);


    // Bring start/end hours/mins
    // calculated the total
    const hours_mins = bringHoursMins(times);

    let sHours = [];
    let sMins = [];
    let eHours = [];
    let eMins = [];
    hours_mins.forEach(hm => {
      sHours.push(hm.sHour);
      sMins.push(hm.sMin);
      eHours.push(hm.eHour);
      eMins.push(hm.eMin);
    });
    
    let total = 0;
    for (let i=0; i < sHours.length; i++) {
      let start = new Date(year, month-1, day, sHours[i], sMins[i]);
      let end = new Date(year, month-1, day, eHours[i], eMins[i]);
      let diff = (end - start)/(1000*60);
      total += diff;
    }


    ALL_DAYS.push(new DayPeriod(year, month, day, wakeupHour, wakeupMin, workout, times, titles, total));
  });
  return ALL_DAYS;
}


function getDistinctArray(input_array_of_obj, prop) {
  const attr_array = input_array_of_obj.map(d => d[prop]);
  const attr_set = new Set(attr_array);
  const attr_distinct_array = Array.from(attr_set);
  return attr_distinct_array;
}