

function getMatches(input, inputREG) {
  let rgxResult = inputREG[Symbol.matchAll](input);
  let result = Array.from(rgxResult, x => x[0]);
  return result;
}
function getTimeElement(input, regex) {
  let timeArray = [];
  input.forEach((e) => {
    let match = getMatches(e, regex)[0];
    timeArray.push(parseInt(match.substring(1,match.length-1)));
  });
  return timeArray;
}

function bringHoursMins(input) {
  const sHourREG = /(\{[0-9]{1,2}:|\[[0-9]{1,2}:)/g;
  const sMinREG = /:[0-9]{1,2}-/g;
  const eHourREG = /-[0-9]{1,2}:/g;
  const eMinREG = /(:[0-9]{1,2}\}|:[0-9]{1,2}\])/g;
  let sHours = getTimeElement(input, sHourREG);
  let sMins = getTimeElement(input, sMinREG);
  let eHours = getTimeElement(input, eHourREG);
  let eMins = getTimeElement(input, eMinREG);
  return {sHours, sMins, eHours, eMins};
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
    let {sHours, sMins, eHours, eMins} = bringHoursMins(times);
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


