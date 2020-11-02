function loadClockDiagram(diagram_data) {
    const numData = diagram_data.length;
    const clientRect = document.getElementById('clock-diagram-cont').getBoundingClientRect();
    const width = clientRect.width;
    const height = 40 * numData;


    const numTicks = numData;
    const tickSize = 10;


    const blockXPosition = (d) => {
        return xScale(getTime(d.sHour, d.sMin));
    }
    const blockWidth = (d) => {
        const start = getTime(d.sHour, d.sMin);
        const end = getTime(d.eHour, d.eMin);
        const minsDiff = getMinsDiff(end, start);
        return xScale(getTime(BEGIN_HOUR, minsDiff));
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

    const BEGIN_HOUR = 4;
    const END_HOUR = 25;
    const baseLine = getTime(BEGIN_HOUR, 0);
    const endLine = getTime(END_HOUR, 0);
    const margin = {top: 50, bottom: 50, left: 50, right: 50};
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    const blockHeight = innerHeight / (Math.ceil(numData / 10) * 10);








    const clockDiagramSvg = d3.select('#clock-diagram');
    clockDiagramSvg.attr('width', width).attr('height', height);
    
    const mainContainer = new ContainerGroup(clockDiagramSvg, 'mainContainer');
    mainContainer.group
        .attr('transform', `translate(${margin.left}, ${margin.top})`);


    const xScale = d3.scaleTime()
        .domain([baseLine, endLine])
        .range([0, innerWidth])
        .nice();
    const yScale = d3.scaleLinear()
        .domain([0, numData])
        .range([0, innerHeight])
        .nice();


        
        
        

    const leftAxis = new axisFrame('left-axis', d3.axisLeft, yScale, tickSize, mainContainer.group);
    leftAxis.merge
        .attr('transform', `translate(${0}, ${0})`)
    leftAxis.merge.call(leftAxis.axis.ticks(numTicks))
        
    const bottomAxis = new axisFrame('bottom-axis', d3.axisBottom, xScale, tickSize, mainContainer.group);
    bottomAxis.merge
        .attr('transform', `translate(${0}, ${innerHeight})`)

    const timeBlock = new GeneralUpdatePattern('timeBlock', diagram_data, 'rect', mainContainer.group);
    timeBlock.merge
        .attr('width', d => blockWidth(d))
        .attr('height', blockHeight)
        .attr('fill', d => blockFillFunc(d))
        .attr('x', d => blockXPosition(d))
        .style('opacity', 0.7)
        .attr('y', (d, idx) => yScale(idx + 1) - blockHeight / 2)


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
        .text(timeBlockTextFunc)
        // .attr('text-anchor', 'middle')
        .attr('x', d => blockXPosition(d) + blockWidth(d) / 2 - 40)
        .attr('y', (d, idx) => yScale(idx + 1) + 5)
}

