
function loadChart() {
    const textArea = document.getElementById('time-string-text-area');
    const input_time_string = textArea.value;
    const time_blocks = getMatches(input_time_string, REGEX.timeREG);
    const hours_mins = bringHoursMins(time_blocks);
    loadClockDiagram(hours_mins)
}
loadChart()
loadChart()


// Responsive
new ResizeObserver(loadChart).observe(document.getElementById('clock-diagram-cont'))