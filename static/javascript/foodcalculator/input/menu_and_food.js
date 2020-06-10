function refreshFoodOptionsSelect() {
  let FoodSelect = document.getElementById('FoodSelect');
  FoodSelect.innerHTML = ``;
  ALL_FOODs.forEach((m) => {
    let optionTag = document.createElement('option');
    optionTag.value = m.food_id;
    optionTag.textContent = m.name;
    FoodSelect.appendChild(optionTag);
  });
}

function refreshMenuAndFoodList() {
  let MenuAndFoodList = document.getElementById('MenuAndFoodList');
  MenuAndFoodList.innerHTML = ``;

  let FILTERING = ALL_MENU_FOODs;
  ALL_MENU_FOODs.forEach((mf) => {
    let menuFOODs = FILTERING.filter((menu_food) => menu_food.menu_id == mf.menu_id);
    FILTERING = FILTERING.filter((menu_food) => menu_food.menu_id != mf.menu_id);
    if (menuFOODs.length > 0) {
      let tr = document.createElement('tr');
      let td_mfid = document.createElement('td');
      let td_menu = document.createElement('td');
      let td_food = document.createElement('td');
      let td_total = document.createElement('td');
      let menu = ALL_MENUs.filter((m) => m.menu_id == mf.menu_id)[0];
      td_mfid.textContent = mf.mf_id;
      td_menu.textContent = menu.name;

      let sum = 0;
      // The Column for the foods for that specific Menu. Kind of like a Left Join Table query.
      menuFOODs.forEach((menu_food) => {
        let span = document.createElement('span');
        let food = ALL_FOODs.filter((f) => f.food_id == menu_food.food_id)[0];
        let foodCat = ALL_FOODCATs.filter((fc) => fc.fc_id == food.category_id)[0];
        span.textContent = food.name;
        span.className = `mr-2 mb-2`;
        span.style.color = `#fff`;
        span.style.background = `${foodCat.labelColor}`;
        span.style.width = `100px`;
        span.style.textAlign = `center`;
        td_food.appendChild(span);

        sum += food.CalcTotal();
      });
      td_total.textContent = sum;

      // Add a class to fix the width of td_food
      td_food.className = 'td-foodList';
      tr.appendChild(td_mfid);
      tr.appendChild(td_menu);
      tr.appendChild(td_food);
      tr.appendChild(td_total);
      MenuAndFoodList.appendChild(tr)
    }
  });
}



function AddMenuAndFood(menu_id, food_id) {
  ALL_MENU_FOODs.push(Create_Menu_Food(menu_id, food_id));
  refreshMenuAndFoodList();
}

function deleteMenuAndFood(mf_id) {
  ALL_MENU_FOODs = ALL_MENU_FOODs.filter((mf) => mf.mf_id != mf_id);
  refreshMenuAndFoodList();
}
