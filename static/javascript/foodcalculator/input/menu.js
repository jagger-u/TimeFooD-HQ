



function refreshMenuOptionsSelect() {
  let MenuOptionsSelect = document.getElementById('MenuOptionsSelect');
  MenuOptionsSelect.innerHTML = ``;


  // Adding empty option. 
  let optionEmpty = document.createElement('option');
  optionEmpty.value = `------`;
  optionEmpty.textContent = `------`;
  MenuOptionsSelect.appendChild(optionEmpty);


  ALL_MENUs.forEach((m) => {
    let optionTag = document.createElement('option');
    optionTag.value = m.menu_id;
    optionTag.textContent = m.name;
    MenuOptionsSelect.appendChild(optionTag);
  });
}

function refreshMenuList() {
  let MenuList = document.getElementById('MenuList');
  MenuList.innerHTML = ``;
  ALL_MENUs.forEach((m) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.menu_id}</td>
      <td><input onchange="updateMenuName(${m.menu_id}, this)" value="${m.name}" class="form-control"></td>
      <td><button onclick="deleteMenu(${m.menu_id})" class="close">&times;</button></td>
    `;
    MenuList.appendChild(tr);
  });
}










function AddMenu(dbox_id, name) {
  ALL_MENUs.push(CreateMenu(dbox_id, name));
  refreshMenuList();
  refreshMenuOptionsSelect();
  refreshFoodOptionsSelect();
}
function updateMenuName(menu_id, input) {
  let toUpdate = ALL_MENUs.filter((m) => m.menu_id == menu_id)[0];
  toUpdate.name = input.value;
  refreshMenuList();
  refreshMenuOptionsSelect();
  refreshFoodOptionsSelect();
}
function deleteMenu(menu_id) {
  ALL_MENUs = ALL_MENUs.filter((m) => m.menu_id != menu_id);
  refreshMenuList();
  refreshMenuOptionsSelect();
  refreshFoodOptionsSelect();
}
