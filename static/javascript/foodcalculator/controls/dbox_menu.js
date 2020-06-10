

function decideBadgeColor(mealTime) {
  let badgeColor;
  if (mealTime == 'Breakfast') {
    badgeColor = 'primary';
  } else if (mealTime == 'Lunch') {
    badgeColor = 'success';
  } else if (mealTime == 'Snack') {
    badgeColor = 'warning';
  } else {
    badgeColor = 'info'   
  }
  return badgeColor;
}

function FromMenuGetTheFoodsAndLoadThemUp(menu, toAppend) {
  let menu_foods = ALL_MENU_FOODs.filter((mf) => mf.menu_id == menu.menu_id);
  menu_foods.forEach((mf) => {
    let food = ALL_FOODs.filter((f) => f.food_id == mf.food_id)[0];
    let spanTag = document.createElement('span');
    spanTag.className = `mr-2`;
    spanTag.textContent = `${food.name}: ${food.CalcTotal()}`;
    toAppend.appendChild(spanTag);
  });
  return toAppend;
}

/*

  The HTML structure for "LoadEmUpAlright(dbox_m, m)"

<h5>
  <span>${menu.name}</span>
  <span class="badge badge-${decideBadgeColor(dbox_m.mealTime)}">${dbox_m.mealTime}</span>
</h5>
<div class="menu-details">
  <div class="food-list">

  </div>
  <div class="menu-total">
    <span>Total:</span>
    <span>${menu.CalcTotal()} HUF</span>
  </div>
</div> 


*/

function LoadEmUpAlright(dbox_m, m) { // The HTML structure is above this function
  // Create elements
  let li = document.createElement('li');
  let h5 = document.createElement('h5');
  let div = document.createElement('div');
  let div_1 = document.createElement('div');
  let div_2 = document.createElement('div');
  let span_h5_1 = document.createElement('span');
  let span_h5_2 = document.createElement('span');
  let span_div_1 = document.createElement('span');
  let span_div_2 = document.createElement('span');

  // Assign class names
  li.className = 'list-group-item menulist-item mb-3';
  h5.className = `title-h5`;
  div.className = `menu-details`;
  div_1.className = `food-list`;
  div_2.className = `menu-total`;
  span_h5_2.className = `badge badge-${decideBadgeColor(dbox_m.mealTime)}`;

  // Assign text contents
  span_h5_2.textContent = `${dbox_m.mealTime}`;
  span_h5_1.textContent = `${m.name}`; 
  span_div_1.textContent = 'Total:';
  span_div_2.textContent = `${m.CalcTotal()} HUF`;

  // Load div_1 with all the foods in the menu
  div_1 = FromMenuGetTheFoodsAndLoadThemUp(m, div_1);

  // Build the structure
  h5.appendChild(span_h5_1);
  h5.appendChild(span_h5_2);
  div_2.appendChild(span_div_1);
  div_2.appendChild(span_div_2);
  div.appendChild(div_1);
  div.appendChild(div_2);
  li.appendChild(h5);
  li.appendChild(div);
  return li
}

// The modal stuff for DBox_Menu:
function refreshDBox_MenuList(dbox_id) {


  let DBox_MenuList = document.getElementById('DBox_MenuList');
  DBox_MenuList.innerHTML = ``;
  let dbox_ms = ALL_DBOX_MENUs.filter((dbox_m) => dbox_m.dbox_id == dbox_id);
  let ul = document.createElement('ul');
  ul.className = 'list-group';
  dbox_ms.forEach((dbox_m) => {
    let m = ALL_MENUs.filter((m) => m.menu_id == dbox_m.menu_id)[0];
    let li = LoadEmUpAlright(dbox_m, m);
    ul.appendChild(li);
  });

  let dbox = ALL_DBOXes.filter((dbox) => dbox.dbox_id == dbox_id)[0];
  let titleDiv = document.createElement('div');
  titleDiv.innerHTML = `
    <div class="title-h5 p-3">
      <h1>${getTextValueOfMonth(dbox.month)}-${dbox.day}</h1>
      <span class="badge badge-secondary" style="font-size: 20px;">Total: ${dbox.CalcTotal()}</span>
    </div>
  `;

  DBox_MenuList.appendChild(titleDiv);
  DBox_MenuList.appendChild(ul);
}

function fetchDBox_Menu(dbox_id, mealTime, menu_id) {
  // Assuming there will be one pair with a certain dbox_id, mealTime, and menu_id
  let result = ALL_DBOX_MENUs.filter(
      (dbox_m) =>   
      dbox_m.dbox_id == dbox_id && 
      dbox_m.mealTime == mealTime && 
      dbox_m.menu_id == menu_id
    );
  return result;
}

// Remark: I don't think there is a need to check if we got "------"
// since the trigger is "onchange(....)"
function AddDBox_Menu(dbox_id, menu_id, mealTime, HTML_boxId) {
  // Inserting the DBox_Menu to the Global array.
  ALL_DBOX_MENUs.push(Create_DBox_Menu(dbox_id, menu_id, mealTime));
  // Activating the mark on the calendar
  let results = fetchDBox_Menu(dbox_id, mealTime, menu_id);
  (results.length > 0) ? InsertBoxStyle(HTML_boxId) : RemoveBoxStyle(HTML_boxId);
  // Update current control HTML
  let box = document.getElementById(`${HTML_boxId}`);
  ExamineBox(dbox_id, mealTime, box);

  // Remove the "focus" effect
  document.getElementById(`${HTML_boxId}`).classList.remove('focused');
}
function DeleteDBox_Menu(dbox_id, menu_id, mealTime, HTML_boxId) {
  // "Removing" the DBox_Menu. The Global array is updated.
  // NOTE: Even if there are duplicate foods for one mealTime, we will only pop from the front.
  let result = fetchDBox_Menu(dbox_id, mealTime, menu_id)[0];
  if (result != null) {
    ALL_DBOX_MENUs = ALL_DBOX_MENUs.filter((dbox_m) => dbox_m.dbox_menu_id != result.dbox_menu_id);
  }



  let result_to_check = ALL_DBOX_MENUs.filter((dbox_m) =>
    dbox_m.mealTime == mealTime && 
    dbox_m.dbox_id == dbox_id
  );




  // Update current control HTML
  let box = document.getElementById(`${HTML_boxId}`);
  ExamineBox(dbox_id, mealTime, box);

  // Deactivating the mark on the calendar.
  // let results = fetchDBox_Menu(dbox_id, mealTime, menu_id);
  (result_to_check.length != 0) ? InsertBoxStyle(HTML_boxId) : RemoveBoxStyle(HTML_boxId);

  // Remove the "focus" effect
  (result_to_check.length == 0) ? document.getElementById(`${HTML_boxId}`).classList.remove('focused') : "";

}

