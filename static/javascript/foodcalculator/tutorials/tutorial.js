let cover = document.getElementById('cover');
let guide_welcome = document.getElementById('guide-welcome');
let guide_slider = document.getElementById('guide-slider');
let guide_controls = document.getElementById('guide-controls');
let guide_box_container = document.getElementById('guide-box-container');
let guide_box_controls = document.getElementById('guide-box_controls');
let slidecontainer = document.getElementById('slidecontainer');
let config = document.getElementById('config');
let box_container = document.getElementById('box-container');
let box_controls = document.getElementById('box_controls');

let ADDED = false;

function hideHelps() {
  cover.classList.add('hide-tut');
  guide_welcome.classList.add('hide-tut');
  guide_slider.classList.add('hide-tut');
  guide_controls.classList.add('hide-tut');
  guide_box_container.classList.add('hide-tut');
  guide_box_controls.classList.add('hide-tut');
  DoSomeStuffTutorial_ToRemove();
}

function displayHelp() {
  if (confirm("Tutorial will erase all data. Continue?") == true) {
    cover.classList.remove('hide-tut');
    guide_welcome.classList.remove('hide-tut');
    DoSomeStuffTutorial_ToRemove();
  }
}

function DoSomeStuffTutorial_ToRemove() {
  slidecontainer.classList.remove('to-reveal');
  config.classList.remove('to-reveal');
  box_container.classList.remove('to-reveal');
  box_controls.classList.remove('to-reveal');
  document.getElementById('calendarSlider').value = 0;
  changeNumDayBoxes(document.getElementById('calendarSlider'));
  (ADDED == true) ? DeleteDBox_Menu(2, 1, 'Breakfast', 'HTML_box-4') : "";  
}

function nextHelp(next, prev, toRevealNext, toRevealPrev) {
  prev = document.getElementById(`${prev}`);
  next = document.getElementById(`${next}`);
  prev.classList.add('hide-tut');
  next.classList.remove('hide-tut');
  revealCurrentSection(toRevealNext, toRevealPrev);

  document.getElementById('calendarSlider').value = 0;
  changeNumDayBoxes(document.getElementById('calendarSlider'));
}

function nextHelpBoxContainer(next, prev, toRevealNext, toRevealPrev) {
  prev = document.getElementById(`${prev}`);
  next = document.getElementById(`${next}`);
  prev.classList.add('hide-tut');
  next.classList.remove('hide-tut');
  revealCurrentSection(toRevealNext, toRevealPrev);

  document.getElementById('calendarSlider').value = 10;
  changeNumDayBoxes(document.getElementById('calendarSlider'));
  (ADDED == true) ? DeleteDBox_Menu(2, 1, 'Breakfast', 'HTML_box-4') : "";
}

function nextHelpBoxContainerAdd(next, prev, toRevealNext, toRevealPrev) {
  prev = document.getElementById(`${prev}`);
  next = document.getElementById(`${next}`);
  prev.classList.add('hide-tut');
  next.classList.remove('hide-tut');
  revealCurrentSection(toRevealNext, toRevealPrev);

  document.getElementById('calendarSlider').value = 10;
  changeNumDayBoxes(document.getElementById('calendarSlider'));
  ExamineBox(2, 'Breakfast', document.getElementById('HTML_box-4'));
  AddDBox_Menu(2, 1, 'Breakfast', 'HTML_box-4');
  ADDED = true;
}

function revealCurrentSection(toRevealNext, toRevealPrev) {
  if (toRevealPrev != '') {
    toRevealPrev = document.getElementById(toRevealPrev);
    toRevealPrev.classList.remove('to-reveal');
  }
  if (toRevealNext != '') {
    toRevealNext = document.getElementById(toRevealNext);
    toRevealNext.classList.add('to-reveal');
  }
}