function CreateDBox(day, month, year) {
  return new DBox(dbox_index++, day, month, year);
}
function CreateMenu(name) {
  return new Menu(menu_index++, name);
}
function CreateFoodCategory(name, description, labelColor) {
  return new FoodCategory(fc_index++, name, description, labelColor);
}
function CreateNutritionCategory(name, description, score) {
  return new NutritionCategory(nc_index++, name, description, score);
}
function CreateFood(name, quantity, bulkcost, category_id, nutrition_id) {
  return new Food(food_index++, name, quantity, bulkcost, category_id, nutrition_id);
}


// Many:Many relationships
function Create_DBox_Menu(dbox_id, menu_id, mealTime) {
  return new DBox_Menu(dbox_menu_index++, dbox_id, menu_id, mealTime);
}
function Create_Menu_Food(menu_id, food_id) {
  return new Menu_Food(menu_food_index++, menu_id, food_id);
}