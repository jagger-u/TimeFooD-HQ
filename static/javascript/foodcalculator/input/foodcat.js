
function refreshFoodCatList() {
  let FoodCatList = document.getElementById('FoodCatList');
  FoodCatList.innerHTML = ``;
  ALL_FOODCATs.forEach((fc) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${fc.fc_id}</td>
      <td><input onchange="updateFoodCatName(${fc.fc_id}, this)" value="${fc.name}" class="form-control"></td>
      <td><input onchange="updateFoodCatDesc(${fc.fc_id}, this)" value="${fc.description}" class="form-control"></td>
      <td><input type="color" onchange="updateFoodCatLabelColor(${fc.fc_id}, this)" value="${fc.labelColor}" class="form-control color-form"></td>
      <td><button onclick="deleteFoodCat(${fc.fc_id})" class="close">&times;</button></td>
    `;
    FoodCatList.appendChild(tr);
  });
}



function AddFoodCat(name, description, labelColor) {
  ALL_FOODCATs.push(CreateFoodCategory(name, description, labelColor));
  refreshFoodCatList();
}
function updateFoodCatName(fc_id, input) {
  let toUpdate = ALL_FOODCATs.filter((fc) => fc.fc_id == fc_id)[0];
  toUpdate.name = input.value;
  refreshFoodCatList();
}
function updateFoodCatDesc(fc_id, input) {
  let toUpdate = ALL_FOODCATs.filter((fc) => fc.fc_id == fc_id)[0];
  toUpdate.description = input.value;
  refreshFoodCatList();
}
function updateFoodCatLabelColor(fc_id, input) {
  let toUpdate = ALL_FOODCATs.filter((fc) => fc.fc_id == fc_id)[0];
  toUpdate.labelColor = input.value;
  refreshFoodCatList();
}
function deleteFoodCat(fc_id) {
  ALL_FOODCATs = ALL_FOODCATs.filter((fc) => fc.fc_id != fc_id);
  refreshFoodCatList();
}
