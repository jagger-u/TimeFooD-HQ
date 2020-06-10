
let PREV = false;
let PREV_id;



//<button onclick="AddDBox_Menu(${dbox.dbox_id}, this.value, '${mealTime}', '${box.id}')" class="btn btn-success">Add</button>  
function ExamineBox(dbox_id, mealTime, box) {
  let box_controls = document.getElementById('box_controls');
  let dbox = ALL_DBOXes.filter((dbox) => dbox.dbox_id == dbox_id)[0];

  box_controls.innerHTML = ``;

  // There can be more than one for a given mealTime
  let dbox_ms = ALL_DBOX_MENUs.filter((dbox_m) => dbox_m.dbox_id == dbox_id && dbox_m.mealTime == mealTime);
  if (dbox_ms.length > 0) {
    let div_config = document.createElement('div');
    div_config.className = `config-btn-group mt-3`;
    div_config.innerHTML = `
    <select onchange="AddDBox_Menu(${dbox.dbox_id}, this.value, '${mealTime}', '${box.id}')" class="btn btn-success" id="MenuOptionsSelect" class="form-control">
    
    </select>
    `;
    let h1 = document.createElement('h1');
    h1.textContent = `${getTextValueOfMonth(dbox.month)}-${dbox.day}`;
    box_controls.appendChild(h1);
    let ul = document.createElement('ul');
    ul.className = `list-group`;
    dbox_ms.forEach((dbox_m) => {
      let m = ALL_MENUs.filter((m) => m.menu_id == dbox_m.menu_id)[0];
      let li = LoadEmUpAlright(dbox_m, m);
      let div_btn = document.createElement('div');
      div_btn.innerHTML = `
        <button onclick="DeleteDBox_Menu(${dbox.dbox_id}, ${m.menu_id}, '${mealTime}', '${box.id}')" class="btn btn-danger btn-sm float-right">Remove</button>  
      `;
      li.appendChild(div_btn);
      ul.appendChild(li);
    });

    box_controls.appendChild(ul);
    box_controls.appendChild(div_config);
  } else {
    box_controls.innerHTML = `
    <h1>${getTextValueOfMonth(dbox.month)}-${dbox.day}</h1>
    <ul class="list-group">
      <li id="${mealTime}ListItem" class="list-group-item">
        <h5>${mealTime}</h5>
        <span>Empty</span>
      </li>
    </ul>
    <div class="config-btn-group mt-3">
      <select onchange="AddDBox_Menu(${dbox.dbox_id}, this.value, '${mealTime}', '${box.id}')" class="btn btn-success" id="MenuOptionsSelect" class="form-control">

      </select>
    </div>
  `;
  }


  refreshMenuOptionsSelect();



  // Just for "focus" effect. After pressing a different box, the previous box should be unfocused.
  if (PREV == false) {
    box.classList.add('focused');
    PREV = true;
    PREV_id = box.id;
  } else {
    document.getElementById(`${PREV_id}`).classList.remove('focused');
    box.classList.add('focused');
    PREV = true;
    PREV_id = box.id;
  }
}


// Whenever we added or delete. We need to check this.
function InsertBoxStyle(HTMLbox_id) {
  let theBoxToColorify = document.getElementById(`${HTMLbox_id}`);
  theBoxToColorify.classList.add('non-empty');
}
function RemoveBoxStyle(HTMLbox_id) {
  let theBoxToColorify = document.getElementById(`${HTMLbox_id}`);
  theBoxToColorify.classList.remove('non-empty');
}
