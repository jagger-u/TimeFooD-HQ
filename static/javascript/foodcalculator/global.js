let dbox_index = 1;
let menu_index = 1;
let fc_index = 1;
let nc_index = 1;
let food_index = 1;

// Many:Many relationships
let dbox_menu_index = 1;
let menu_food_index = 1;



let ALL_DBOXes = [];
let ALL_MENUs = [];
let ALL_FOODCATs = [];
let ALL_NUTRITIONCATs = [];
let ALL_FOODs = [];

// Many:Many relationships
let ALL_DBOX_MENUs = [];
let ALL_MENU_FOODs = [];






function WHAT_IS_DA_TOTAL_FOOD_COST_EH() {
  let sum = 0;
  ALL_DBOXes.forEach((dbox) => sum += dbox.CalcTotal());
  return Number((sum).toPrecision(5));
}

class DBox {
  constructor(dbox_id, day, month, year) {
    this.dbox_id = dbox_id;
    this.day = day;
    this.month = month;
    this.year = year;
  }
  CalcTotal() {
    if (ALL_DBOX_MENUs.length > 0) {
      let sum = 0;
      let result = ALL_DBOX_MENUs.filter((dbox_m) => dbox_m.dbox_id == this.dbox_id);
      result.forEach((dbox_m) => {
        let menus = ALL_MENUs.filter((m) => (m.menu_id == dbox_m.menu_id));
        menus.forEach((m) => {
          sum += m.CalcTotal();
        });
      });
      return Number((sum).toPrecision(5));
    } else {
      // console.log(`ERROR: ALL_DBOX_MENUs array is empty!`);
      return 0;
    }
  }
}



class Menu {
  constructor(menu_id, name) {
    this.menu_id = menu_id;
    this.name = name;
  }
  CalcTotal() {
    if (ALL_MENU_FOODs.length > 0) {
      let sum = 0;
      let result = ALL_MENU_FOODs.filter((mf) => (mf.menu_id == this.menu_id));
      result.forEach((mf) => {
        let food = ALL_FOODs.filter((food) => (mf.food_id == food.food_id))[0];
        sum += food.CalcTotal();
      });
      return Number((sum).toPrecision(5));
    } else {
      // console.log(`ERROR: ALL_MENU_FOODs array is empty!`);
    }
  }
}


class FoodCategory {
  constructor(fc_id, name, description, labelColor) {
    this.fc_id = fc_id;
    this.name = name;
    this.description = description;
    this.labelColor = labelColor;
  }
}

class NutritionCategory {
  constructor(nc_id, name, description, score) {
    this.nc_id = nc_id;
    this.name = name;
    this.description = description;
    this.score = score;
  }
}



class Food {
  constructor(food_id, name, quantity, bulkcost, category_id, nutrition_id) {
    this.food_id = food_id;
    this.name = name;
    this.quantity = quantity;
    this.bulkcost = bulkcost;
    this.category_id = category_id;
    this.nutrition_id = nutrition_id;
  }
  CalcTotal() {
    return Number((this.quantity*this.bulkcost).toPrecision(5));
  }
}




// Many:Many relationships
class DBox_Menu {
  constructor(dbox_menu_id, dbox_id, menu_id, mealTime) {
    this.dbox_menu_id = dbox_menu_id;
    this.dbox_id = dbox_id;
    this.menu_id = menu_id;
    this.mealTime = mealTime;
  }
}

class Menu_Food {
  constructor(mf_id, menu_id, food_id) {
    this.mf_id = mf_id;
    this.menu_id = menu_id;
    this.food_id = food_id; 
  }
}
