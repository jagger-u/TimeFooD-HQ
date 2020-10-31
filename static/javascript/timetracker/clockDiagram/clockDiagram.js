const timeREG = /(\{[0-9]{1,2}:[0-9]{1,2}-[0-9]{1,2}:[0-9]{1,2}\}|\[[0-9]{1,2}:[0-9]{1,2}-[0-9]{1,2}:[0-9]{1,2}\])/g;
const input_time_string = '[9:00-9:31] {9:31-10:01} {10:47-11:42} {12:42-13:40} {15:19-15:29} [15:42-16:45] [17:52-18:14] {18:20-19:07} {19:24-19:36} {19:51-21:32} {21:36-21:55}';
const time_blocks = getMatches(input_time_string, timeREG);
const hours_mins = bringHoursMins(time_blocks);



function loadClockDiagram(diagram_data) {
    const clientRect = document.getElementById('clock-diagram-cont').getBoundingClientRect();
    const width = clientRect.width;
    const height = 400;

    const baseLine = 7 * 60;
    const endLine = 24 * 60;

    const numData = diagram_data.length;

    
    const clockDiagramSvg = d3.select('#clock-diagram');
    clockDiagramSvg.attr('width', width).attr('height', height).style('background', '#d4d4d4');
    
    const margin = {top: 20, bottom: 0, left: 0, right: 0};
    const mainContainer = new ContainerGroup(clockDiagramSvg, 'mainContainer');
    mainContainer.group
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([baseLine, endLine])
        .range([0, innerWidth]);
    const yScale = d3.scaleLinear()
        .domain([0, numData])
        .range([0, innerHeight]);

    const getMinutesFromBaseLine = (hours, minutes) => {
        const totalMinutesFromBaseLine = hours * 60 + minutes;
        return totalMinutesFromBaseLine
    }
    const blockXPosition = (d) => {
        return xScale(getMinutesFromBaseLine(d.sHour, d.sMin));
    }
    const blockWidth = (d) => {
        const scaled = xScale(baseLine + getMinutesFromBaseLine(d.eHour, d.eMin) - getMinutesFromBaseLine(d.sHour, d.sMin));
        return scaled;
    }
    const timeBlock = new GeneralUpdatePattern('timeBlock', diagram_data, 'rect', mainContainer.group);
    timeBlock.merge
        .attr('width', d => blockWidth(d))
        .attr('height', 20)
        .attr('fill', 'yellow')
        .attr('x', d => blockXPosition(d))
        .attr('y', (d, idx) => yScale(idx))


    const timeBlockTextFunc = (d) => {
        const hourTextStart = (d.sHour < 10) ? `0${d.sHour}` : d.sHour;
        const minTextStart = (d.sMin < 10) ? `0${d.sMin}` : d.sMin;
        const hourTextEnd = (d.eHour < 10) ? `0${d.eHour}` : d.eHour;
        const minTextEnd = (d.eMin < 10) ? `0${d.eMin}` : d.eMin;
        const textToDisplay = `${hourTextStart}:${minTextStart}-${hourTextEnd}:${minTextEnd}`;
        return textToDisplay
    };
    const timeBlockText = new GeneralUpdatePattern('timeBlockText', diagram_data, 'text', mainContainer.group);
    timeBlockText.merge
        .text(timeBlockTextFunc)
        .attr('x', d => blockXPosition(d) + blockWidth(d) / 2 - 40)
        .attr('y', (d, idx) => yScale(idx) + 15)
}
console.log(hours_mins)
loadClockDiagram(hours_mins)
loadClockDiagram(hours_mins)