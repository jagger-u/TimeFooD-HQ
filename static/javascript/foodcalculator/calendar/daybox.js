// let year = 2020, month = 6, day = 23;
let Today = new Date();

// Extract
let year = Today.getFullYear();
let month = Today.getMonth() + 1;
let day = Today.getDate() + 1;

// GLOBAL VARIABLES TO BE USED HERE
let DATE_TO_INCREMENT = new Date(year, month-1, day);
let FIRST_DAY_TO_BEGIN = DATE_TO_INCREMENT.getDay();
(FIRST_DAY_TO_BEGIN == 0) ? FIRST_DAY_TO_BEGIN = 7 : ""; // compare with MONTH_IDX_COUNT
let MONTH_IDX_COUNT = 1; // compare with FIRST_DAY_TO_BEGIN, otherwise keep incrementing
let BOXROW_COUNT = 0; // Keep track of the number of "BOXROW"-s

let BOX_BODY = document.getElementById('box-body');
let ROW;

// Initialize ROW
ROW = HTML_CREATE_row(BOXROW_COUNT);

// Set Slider max value
document.getElementById('calendarSlider').max = GetDaysInMonth(year, month-1) - (day - 1);

let HTML_boxIdCounter = 0;
function HTML_CREATE_BoxData(dbox) {
  let bd = document.createElement('div');
  bd.id = `dbox-${dbox.dbox_id}"`;
  bd.className = "bd";
  bd.innerHTML = `
    <span onclick="refreshDBox_MenuList(${dbox.dbox_id})" class="box-label" data-toggle="modal" data-target="#AllMenusInput">${dbox.day}</span>
    <div id="HTML_box-${HTML_boxIdCounter++}" onclick="ExamineBox(${dbox.dbox_id}, 'Breakfast', this)" class="box"><i class="fas fa-coffee"></i></div>
    <div id="HTML_box-${HTML_boxIdCounter++}" onclick="ExamineBox(${dbox.dbox_id}, 'Lunch', this)" class="box"><i class="fas fa-utensils"></i></div>
    <div id="HTML_box-${HTML_boxIdCounter++}" onclick="ExamineBox(${dbox.dbox_id}, 'Dinner', this)" class="box"><i class="fas fa-utensils"></i></div>
    <div id="HTML_box-${HTML_boxIdCounter++}" onclick="ExamineBox(${dbox.dbox_id}, 'Snack', this)" class="box"><i class="fas fa-apple-alt"></i></div>
  `;
  ROW.appendChild(bd);
}

function HTML_CREATE_EmptyData() {
  let bd = document.createElement('div');
  bd.className = "bd";
  bd.innerHTML = `
  `;
  ROW.appendChild(bd);
}

function HTML_CREATE_row(count) {
  let row = document.createElement('div');
  row.id = `boxRow-${count}`;
  row.className = `box-row`;
  BOXROW_COUNT++;
  BOX_BODY.appendChild(row);
  return row;
}

function AddDayBox() {
  let d = DATE_TO_INCREMENT.getDate();
  let m = DATE_TO_INCREMENT.getMonth() + 1;
  let y = DATE_TO_INCREMENT.getFullYear();
  let dbox = CreateDBox(d, m, y);

  // Add to HTML: Table
  HTML_Tabulate(dbox);

  // Add to HTML: Boxes diagram
  ((GetDayOfWeek() - 1) % 7 == 0) ? ROW = HTML_CREATE_row(BOXROW_COUNT) : "";
  HTML_CREATE_BoxData(dbox);

  // Add to the ALL_DBOXes array
  ALL_DBOXes.push(dbox);

  //Increment the date
  DATE_TO_INCREMENT.setDate(DATE_TO_INCREMENT.getDate() + 1);
}
function DoSomeStuffToRemove() {
  // Remove from HTML: Table
  HTML_UnTabulate();

  // Decrement the date, and also the index
  dbox_index = dbox_index - 1;
  DATE_TO_INCREMENT.setDate(DATE_TO_INCREMENT.getDate() - 1);

  // Remove form ALL_DBOXes array - LAST element is removed
  return ALL_DBOXes.pop();
}
function DeleteDayBox() {
  if(dbox_index > 0 && ALL_DBOXes.length > 0) {
    let removed = DoSomeStuffToRemove();
    // Remove from HTML: Boxes diagram
    ROW.removeChild(ROW.lastChild);
    if ((GetDayOfWeek() - 1) % 7 == 0) {
      BOX_BODY.removeChild(BOX_BODY.lastChild);
      BOXROW_COUNT--;
      ROW = BOX_BODY.lastChild;
    }
    HTML_boxIdCounter--;
    HTML_boxIdCounter--;
    HTML_boxIdCounter--;
    HTML_boxIdCounter--;
    // Delete all Menus that are associated
    ALL_DBOX_MENUs = ALL_DBOX_MENUs.filter((dbox_m) => dbox_m.dbox_id != removed.dbox_id);
  }
}

function GetDayOfWeek() {
  let dayOfWeek = DATE_TO_INCREMENT.getDay(); 
  (dayOfWeek == 0) ? dayOfWeek = 7 : "";
  return dayOfWeek;
}

function HTML_Tabulate(dbox) {
  let tr = document.createElement('tr');
  tr.innerHTML = `
  <td>${dbox.dbox_id}</td>
  <td>${dbox.day}-${dbox.month}-${dbox.year}</td>
  <td>${dbox.CalcTotal()}</td>
  `;
  document.getElementById('DBoxList').appendChild(tr);
}

function HTML_UnTabulate() {
  document.getElementById('DBoxList').removeChild(DBoxList.lastChild);
}

function HTML_TabulateALL() {
  ALL_DBOXes.forEach((dbox) => HTML_UnTabulate());
  ALL_DBOXes.forEach((dbox) => HTML_Tabulate(dbox));
}

// Slider related
let SLIDER_VALUE = 0;
let SAVED_VALUE;
let newValue;
let prevValue;
function changeNumDayBoxes(slider) {
  newValue = parseInt(slider.value);
  prevValue = parseInt(SLIDER_VALUE);
  SLIDER_VALUE = newValue;
  if (prevValue < newValue) {
    for(let i = 0; i < Math.abs(newValue - prevValue); i++) {
      // Loop to start
      while(MONTH_IDX_COUNT < FIRST_DAY_TO_BEGIN) {
        HTML_CREATE_EmptyData();
        MONTH_IDX_COUNT++;
      }
      AddDayBox();
    }
    SAVED_VALUE = newValue;
  } else if(true) { //confirm("Some data will be erased. Continue?") == true
    for(let i = 0; i < Math.abs(newValue - prevValue); i++) {
      if (SLIDER_VALUE == 0) {
        BOX_BODY.innerHTML = ``;
        BOXROW_COUNT = 0;
        MONTH_IDX_COUNT = 1;
        ROW = HTML_CREATE_row(BOXROW_COUNT);   
        HTML_boxIdCounter = 0; 
        DoSomeStuffToRemove();
      }
      (ROW.lastChild != null) ? DeleteDayBox() : "";
    }
    SAVED_VALUE = newValue;
    // console.log('Deletion result: ', ALL_DBOXes.length);
  } else {
    // Seems like these three needs to be assigned like this.
    document.getElementById('calendarSlider').value = SAVED_VALUE;
    newValue = SAVED_VALUE;
    SLIDER_VALUE = SAVED_VALUE;
  }
  // Display month and Number of boxes
  document.getElementById('DBoxesMonth').textContent = getTextValueOfMonth(month);
  document.getElementById('NDBoxes').textContent = `${newValue}`;
}