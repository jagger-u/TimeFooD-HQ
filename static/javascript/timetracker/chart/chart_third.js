






function generateThirdDAYS() {
  let ALL_DAYS_1 = createDayPeriods(TA_first.value);
  let ALL_DAYS_2 = createDayPeriods(TA_second.value);
  let AVG_DAYS = [];
  if (ALL_DAYS_1.length == ALL_DAYS_2.length) {
    for(let i=0; i < ALL_DAYS_1.length; i++) {
      let total = (ALL_DAYS_1[i].total + ALL_DAYS_2[i].total)/2;
      let wakeupHour = parseFloat(Number((ALL_DAYS_1[i].wakeupHour + ALL_DAYS_2[i].wakeupHour)/2).toPrecision(3));
      let wakeupMin = parseFloat(Number((ALL_DAYS_1[i].wakeupMin + ALL_DAYS_2[i].wakeupMin)/2).toPrecision(5));
      let workout = (ALL_DAYS_1[i].workout + ALL_DAYS_2[i].workout)/2;
      AVG_DAYS.push(new DayPeriod(
        ALL_DAYS_2[i].year, 
        ALL_DAYS_2[i].month+1, 
        ALL_DAYS_2[i].day, wakeupHour, wakeupMin, workout, [], [], total));
    }
    console.log(AVG_DAYS);
  } else {
    // Give feedback to user. 
    //There should be two inputs with same number of days starting from 1st of the month.
  }
  return AVG_DAYS;
}
