const FORMATS = ['long-verbose-format', 'short-row-format'];
let FORMATTER = FORMATS[1];






function DATA_FORMATTING(input_array_of_days, prop_for_timeStringArray) {
    const days_data = input_array_of_days.reduce((acc, day) => {
        const time_blocks = day[prop_for_timeStringArray];
        const hours_mins_array = bringHoursMins(time_blocks);
        const elems = hours_mins_array.map(hours_mins => {
            return {
                day: day.day,
                month: day.month,
                hours_mins: hours_mins,
                total: day.total,
                wakeupHour: day.wakeupHour,
                workout: day.workout,
                year: day.year
            }
        });
        return [...acc, ...elems];
    }, []);
    return days_data;
}



function loadChart() {
    const textArea = document.getElementById('time-string-text-area');
    const input_time_string = textArea.value;
    const DAYS_DATA = 
        (FORMATTER === 'long-verbose-format') ? DATA_FORMATTING(createDayPeriods(input_time_string), 'times') : 
        (FORMATTER === 'short-row-format') ? DATA_FORMATTING(createDayPeriodsStandard(input_time_string), 'timeStringArray') : 
        DATA_FORMATTING(createDayPeriodsStandard(input_time_string), 'timeStringArray');
    loadClockDiagram(DAYS_DATA)
}
loadChart()
loadChart()






// Responsive
new ResizeObserver(loadChart).observe(document.getElementById('clock-diagram-cont'))