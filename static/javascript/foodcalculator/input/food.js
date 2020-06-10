
function refreshFoodNutritionSelect_s() {
  let FoodNutritionSelect_s = document.querySelectorAll('.FoodNutritionSelect_s');
  FoodNutritionSelect_s.forEach((selectTag) => {
    selectTag.innerHTML = ``;
    ALL_NUTRITIONCATs.forEach((nc) => {
      let optionTag = document.createElement('option');
      optionTag.value = nc.nc_id;
      optionTag.textContent = nc.name;
      (selectTag.name == nc.nc_id) ? optionTag.selected = true : "";
      selectTag.appendChild(optionTag);
    });
  });
}

function refreshFoodCategorySelect_s() {
  let FoodCategorySelect_s = document.querySelectorAll('.FoodCategorySelect_s');
  FoodCategorySelect_s.forEach((selectTag) => {
    selectTag.innerHTML = ``;
    ALL_FOODCATs.forEach((fc) => {
      let optionTag = document.createElement('option');
      optionTag.value = fc.fc_id;
      optionTag.textContent = fc.name;
      (selectTag.name == fc.fc_id) ? optionTag.selected = true : "";
      selectTag.appendChild(optionTag);
    });
  });
}





function refreshFoodList() {
  let FoodList = document.getElementById('FoodList');
  FoodList.innerHTML = ``;
  ALL_FOODs.forEach((f) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${f.food_id}</td>
      <td><input onchange="updateFoodName(${f.food_id}, this)" value="${f.name}" class="form-control"></td>
      <td><input onchange="updateFoodQuantity(${f.food_id}, this)" value="${f.quantity}" class="form-control"></td>
      <td><input onchange="updateFoodBulkCost(${f.food_id}, this)" value="${f.bulkcost}" class="form-control"></td>
      <td>
        <select onchange="updateFoodCategory(${f.food_id}, this)" name="${f.category_id}" class="form-control FoodCategorySelect_s">
        </select>
      </td>
      <td>
        <select onchange="updateFoodNutrition(${f.food_id}, this)" name="${f.nutrition_id}" class="form-control FoodNutritionSelect_s">

        </select>
      </td>
      <td>${f.CalcTotal()}</td>
      <td><button onclick="deleteFood(${f.food_id})" class="close">&times;</button></td>
    `;
    FoodList.appendChild(tr);
  });
  refreshFoodCategorySelect_s();
  refreshFoodNutritionSelect_s();
}



function AddFood(name, quantity, bulkcost, category_id, nutrition_id) {
  ALL_FOODs.push(CreateFood(name, quantity, bulkcost, category_id, nutrition_id));
  refreshFoodList();
  refreshFoodOptionsSelect();
  refreshMenuOptionsSelect();
}
function updateFoodName(food_id, input) {
  let toUpdate = ALL_FOODs.filter((f) => f.food_id == food_id)[0];
  toUpdate.name = input.value;
  refreshFoodList();
  refreshFoodOptionsSelect();
  refreshMenuOptionsSelect();
}
function updateFoodQuantity(food_id, input) {
  let toUpdate = ALL_FOODs.filter((f) => f.food_id == food_id)[0];
  toUpdate.quantity = input.value;
  refreshFoodList();
  refreshFoodOptionsSelect();
  refreshMenuOptionsSelect();
}
function updateFoodBulkCost(food_id, input) {
  let toUpdate = ALL_FOODs.filter((f) => f.food_id == food_id)[0];
  toUpdate.bulkcost = input.value;
  refreshFoodList();
  refreshFoodOptionsSelect();
  refreshMenuOptionsSelect();
}
function updateFoodCategory(food_id, input) {
  let toUpdate = ALL_FOODs.filter((f) => f.food_id == food_id)[0];
  toUpdate.category_id = input.value;
  refreshFoodList();
  refreshFoodOptionsSelect();
  refreshMenuOptionsSelect();
}
function updateFoodNutrition(food_id, input) {
  let toUpdate = ALL_FOODs.filter((f) => f.food_id == food_id)[0];
  toUpdate.nutrition_id = input.value;
  refreshFoodList();
  refreshFoodOptionsSelect();
  refreshMenuOptionsSelect();
}
function deleteFood(food_id) {
  ALL_FOODs = ALL_FOODs.filter((f) => f.food_id != food_id);
  refreshFoodList();
  refreshFoodOptionsSelect();
  refreshMenuOptionsSelect();
}
