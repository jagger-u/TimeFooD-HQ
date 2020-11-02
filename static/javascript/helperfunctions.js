

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