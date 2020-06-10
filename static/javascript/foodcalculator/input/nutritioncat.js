
function refreshNutritionCatList() {
  let NutritionCatList = document.getElementById('NutritionCatList');
  NutritionCatList.innerHTML = ``;
  ALL_NUTRITIONCATs.forEach((nc) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${nc.nc_id}</td>
      <td><input onchange="updateNutritionCatName(${nc.nc_id}, this)" value="${nc.name}" class="form-control"></td>
      <td><input onchange="updateNutritionCatDesc(${nc.nc_id}, this)" value="${nc.description}" class="form-control"></td>
      <td><input onchange="updateNutritionCatScore(${nc.nc_id}, this)" value="${nc.score}" class="form-control"></td>
      <td><button onclick="deleteNutritionCat(${nc.nc_id})" class="close">&times;</button></td>
    `;
    NutritionCatList.appendChild(tr);
  });
}



function AddNutritionCat(name, description, score) {
  ALL_NUTRITIONCATs.push(CreateNutritionCategory(name, description, score));
  refreshNutritionCatList();
}
function updateNutritionCatName(nc_id, input) {
  let toUpdate = ALL_NUTRITIONCATs.filter((nc) => nc.nc_id == nc_id)[0];
  toUpdate.name = input.value;
  refreshNutritionCatList();
}
function updateNutritionCatDesc(nc_id, input) {
  let toUpdate = ALL_NUTRITIONCATs.filter((nc) => nc.nc_id == nc_id)[0];
  toUpdate.description = input.value;
  refreshNutritionCatList();
}
function updateNutritionCatScore(nc_id, input) {
  let toUpdate = ALL_NUTRITIONCATs.filter((nc) => nc.nc_id == nc_id)[0];
  toUpdate.score = input.value;
  refreshNutritionCatList();
}
function deleteNutritionCat(nc_id) {
  ALL_NUTRITIONCATs = ALL_NUTRITIONCATs.filter((nc) => nc.nc_id != nc_id);
  refreshNutritionCatList();
}
