// const input_time_string = `

// October 29 (7:36) =50= {8:10-8:25} [8:43-8:52] {20:20-20:31} {20:36-21:02}

// October 30 (7:00ish) {7:34-7:55} [8:22-9:08] [9:37-10:05] [10:38-10:46] {11:01-11:22}

// October 31 =70= (8:27) [9:00-9:31] {9:31-10:01} {10:47-11:42} {12:42-13:40} {15:19-15:29} [15:42-16:45] [17:52-18:14] {18:20-19:07} {19:24-19:36} {19:51-21:32} {21:36-21:55} 448min
// November 1 (7:53) {9:00-10:08} {10:29-11:39} {13:13-14:03} {14:07-14:58} {16:57-17:39} [19:03-21:54] [22:55-23:58]
// November 2 (6:47) {8:40-9:33} {10:31-11:30} {11:52-12:06} {12:29-12:59} {13:28-13:52} {14:43-15:27} {15:40-15:55} [19:44-19:52] [20:38-22:40]

// `;



function loadChart() {
    const textArea = document.getElementById('time-string-text-area');
    const input_time_string = textArea.value;
    const time_blocks = getMatches(input_time_string, REGEX.timeREG);
    const hours_mins = bringHoursMins(time_blocks);
    loadClockDiagram(hours_mins)
}
loadChart()
loadChart()