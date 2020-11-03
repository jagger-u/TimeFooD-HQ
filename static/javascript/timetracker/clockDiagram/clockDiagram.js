function loadClockDiagram(diagram_data) {



    function getDistinctArray(input_array_of_obj, prop) {
        const attr_array = input_array_of_obj.map(d => d[prop]);
        const attr_set = new Set(attr_array);
        const attr_distinct_array = Array.from(attr_set);
        return attr_distinct_array;
    }



    const distinct_days = getDistinctArray(diagram_data, 'day');
    const numDays = distinct_days.length;
    const clientRect = document.getElementById('clock-diagram-cont').getBoundingClientRect();
    const width = clientRect.width;
    const height = 40 * numDays + 400;


    const BEGIN_HOUR = 6;
    const END_HOUR = 24;
    const baseLine = getTime(BEGIN_HOUR, 0);
    const endLine = getTime(END_HOUR, 0);
    const margin = {top: 100, bottom: 100, left: 50, right: 50};
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xTickNum = innerWidth / 40;
    const yTickNum = numDays;
    // const tickSize = 50;

    // const blockHeight = innerHeight / (Math.ceil(numDays / 10) * 10);

    const padding = 0.12

    const leftAxisOffset = -10;
    const bottomAxisOffset = 10;
    const bottomAxisDisplacement = 18;

    const leftAxisTextFontSize = 20;
    const bottomAxisTextFontSize = 17;










    const clockDiagramSvg = d3.select('#clock-diagram');
    clockDiagramSvg.attr('width', width).attr('height', height);
    
    const mainContainer = new ContainerGroup(clockDiagramSvg, 'mainContainer');
    mainContainer.group
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleTime()
        .domain([baseLine, endLine])
        .range([0, innerWidth])
        .nice();
    const yScale = d3.scaleBand()
        .domain(distinct_days)
        .range([0, innerHeight])
        .padding(padding)
        // .nice();

    const leftAxis = new axisFrame('left-axis', d3.axisLeft, yScale, mainContainer.group);
    leftAxis.merge
        .attr('transform', `translate(${0}, ${0})`)
    leftAxis.merge.call(leftAxis.axis
        .ticks(yTickNum)
        .tickSize(-innerWidth)
    )
    leftAxis.exit.remove();
        
    const bottomAxis = new axisFrame('bottom-axis', d3.axisBottom, xScale, mainContainer.group);
    bottomAxis.merge
        .attr('transform', `translate(${0}, ${innerHeight})`)
    bottomAxis.merge.call(bottomAxis.axis
        .ticks(xTickNum)
        .tickSize(-innerHeight)
    )
    bottomAxis.exit.remove();
    d3.selectAll('.domain, .tick line').style('color', '#d4d4d4')

    d3.selectAll('.left-axis .tick text')
        .attr('transform', `translate(${leftAxisOffset}, ${0})`)
        .style('font-size', leftAxisTextFontSize)
    d3.selectAll('.bottom-axis .tick text')
        .attr('transform', `translate(${0}, ${bottomAxisOffset})`)
        .style('font-size', bottomAxisTextFontSize)


    d3.selectAll('.bottom-axis .tick:nth-child(even) text')
        .attr('transform', `translate(${0}, ${bottomAxisOffset + bottomAxisDisplacement})`)














    const blockXPosition = (d) => {
        return xScale(getTime(d.sHour, d.sMin));
    }
    const blockWidth = (d) => {
        const start = getTime(d.sHour, d.sMin);
        const end = getTime(d.eHour, d.eMin);
        const minsDiff = getMinsDiff(end, start);
        const width = getTime(BEGIN_HOUR, minsDiff);
        return xScale(width);
    }

    const blockFillFunc = (d) => {
        const start = getTime(d.sHour, d.sMin);
        const end = getTime(d.eHour, d.eMin);
        const minsDiff = getMinsDiff(end, start);
        const totalMins = minsDiff;
        const color = 
        (totalMins >= 50) ? '#3fa07e' :
        (totalMins < 50 && totalMins >= 30) ? '#7bc1e4' : '#de4141';
        return color;
    }



    const timeBlock = new GeneralUpdatePattern('timeBlock', diagram_data, 'rect', mainContainer.group);
    timeBlock.merge
        .attr('width', d => blockWidth(d.hours_mins))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => blockFillFunc(d.hours_mins))
        .attr('x', d => blockXPosition(d.hours_mins))
        .style('opacity', 0.7)
        .attr('y', (d) => yScale(d.day))
    timeBlock.exit.remove();

    const timeBlockTextFunc = (d) => {
        const start = getTime(d.sHour, d.sMin);
        const end = getTime(d.eHour, d.eMin);
        const minsDiff = getMinsDiff(end, start);

        const hours = Math.floor(minsDiff / 60);
        const mins = minsDiff - Math.floor(minsDiff / 60) * 60;
        const textToDisplay = `${hours}h ${mins}m`;
        return textToDisplay
    };
    const timeBlockText = new GeneralUpdatePattern('timeBlockText', diagram_data, 'text', mainContainer.group);
    timeBlockText.merge
        .text(d => timeBlockTextFunc(d.hours_mins))
        .attr('x', d => blockXPosition(d.hours_mins) + blockWidth(d.hours_mins) / 2 - 25)
        .attr('y', (d) => yScale(d.day) + yScale.bandwidth() / 2 + 5)
    timeBlockText.exit.remove();
}

