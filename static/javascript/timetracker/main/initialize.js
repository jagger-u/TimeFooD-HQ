let id1 = 1, color_1 = 'rgb(100,100,183,0.3)';
let id2 = 2, color_2 = 'rgb(45,154,253,0.3)';
let id3 = 3, color_3 = 'rgb(100,200,43,0.3)';
let defaultBinWidth = 100;
let defaultNumBins = 8;

let timeGraphs = [];
var time_1_context = document.getElementById('time_first').getContext('2d');
var time_2_context = document.getElementById('time_second').getContext('2d');
var time_3_context = document.getElementById('time_third').getContext('2d');
timeGraphs.push(new timeGraph(id1, time_1_context, color_1));
timeGraphs.push(new timeGraph(id2, time_2_context, color_2));
timeGraphs.push(new timeGraph(id3, time_3_context, color_3));

let histoGraphs = [];
var hist_1_context = document.getElementById('hist_first').getContext('2d');
var hist_2_context = document.getElementById('hist_second').getContext('2d');
var hist_3_context = document.getElementById('hist_third').getContext('2d');
histoGraphs.push(new histoGraph(id1, hist_1_context, color_1));
histoGraphs.push(new histoGraph(id2, hist_2_context, color_2));
histoGraphs.push(new histoGraph(id3, hist_3_context, color_3));

let workoutGraphs = [];
var workout_1_context = document.getElementById('workout_first').getContext('2d');
var workout_2_context = document.getElementById('workout_second').getContext('2d');
var workout_3_context = document.getElementById('workout_third').getContext('2d');
workoutGraphs.push(new workoutGraph(id1, workout_1_context, color_1));
workoutGraphs.push(new workoutGraph(id2, workout_2_context, color_2));
workoutGraphs.push(new workoutGraph(id3, workout_3_context, color_3));

let wakeupGraphs = [];
var wakeup_1_context = document.getElementById('wakeup_first').getContext('2d');
var wakeup_2_context = document.getElementById('wakeup_second').getContext('2d');
var wakeup_3_context = document.getElementById('wakeup_third').getContext('2d');
wakeupGraphs.push(new wakeupGraph(id1, wakeup_1_context, color_1));
wakeupGraphs.push(new wakeupGraph(id2, wakeup_2_context, color_2));
wakeupGraphs.push(new wakeupGraph(id3, wakeup_3_context, color_3));

