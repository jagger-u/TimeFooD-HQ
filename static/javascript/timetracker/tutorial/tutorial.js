let cover = document.getElementById('cover');
let guide_welcome = document.getElementById('guide-welcome');
let guide_controls = document.getElementById('guide-controls');
let config = document.getElementById('config');

function hideHelps() {
  cover.classList.add('hide-tut');
  guide_welcome.classList.add('hide-tut');

  guide_controls.classList.add('hide-tut');
  config.classList.add('hide-tut');
  config.classList.remove('to-reveal');
}

function displayHelp() {
  cover.classList.remove('hide-tut');
  guide_welcome.classList.remove('hide-tut');
}



function nextHelp(next, prev, toRevealNext, toRevealPrev) {
  prev = document.getElementById(`${prev}`);
  next = document.getElementById(`${next}`);
  prev.classList.add('hide-tut');
  next.classList.remove('hide-tut');
  revealCurrentSection(toRevealNext, toRevealPrev);
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