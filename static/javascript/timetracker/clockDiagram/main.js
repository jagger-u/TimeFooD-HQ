
function loadChart() {
    const textArea = document.getElementById('time-string-text-area');
    const input_time_string = textArea.value;
    const DAYS_DATA = createDayPeriods(input_time_string).reduce((acc, day) => {
        const time_blocks = day.times;
        const hours_mins_array = bringHoursMins(time_blocks);
        const elems = hours_mins_array.map(hours_mins => {
            return {
                day: day.day,
                month: day.month,
                hours_mins: hours_mins,
                titles: day.titles,
                total: day.total,
                wakeupHour: day.wakeupHour,
                workout: day.workout,
                year: day.year
            }
        });
        return [...acc, ...elems];
    }, []);
    loadClockDiagram(DAYS_DATA)
}
loadChart()
loadChart()


// Responsive
new ResizeObserver(loadChart).observe(document.getElementById('clock-diagram-cont'))