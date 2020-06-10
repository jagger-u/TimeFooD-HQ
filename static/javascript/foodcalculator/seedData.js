

ALL_FOODCATs.push(CreateFoodCategory("Long term", "Salt, sugar, oil, spice, seeds etc...", 
'#969696'));
ALL_FOODCATs.push(CreateFoodCategory("Fixed, Staple", "Rice, noodles, flour, oats, muesli etc...", 
'#29a4de'));
ALL_FOODCATs.push(CreateFoodCategory("Essential veggies", "Brocolli, garlic, onion, carrots, potato etc...", 
'#01c574'));
ALL_FOODCATs.push(CreateFoodCategory("Extra veggies", "Cucumber, tomato, mushroom, leaves etc...", 
'#55e872'));
ALL_FOODCATs.push(CreateFoodCategory("Fruits", "Apples, bananas, oranges, grapes etc...", 
'#00fffa'));
ALL_FOODCATs.push(CreateFoodCategory("Protein source, Meat", "Chicken, turkey, pork, beef, eggs, fish etc...", 
'#ff4141'));
ALL_FOODCATs.push(CreateFoodCategory("Dairy", "Yogurt, kefir, milk, cheese etc...", 
'#a4b6ff'));
ALL_FOODCATs.push(CreateFoodCategory("Snacks", "Chips, chocolate, sode, cookies, icecream etc...", 
'#ffc107'));
ALL_NUTRITIONCATs.push(CreateNutritionCategory("Neutral", "Not included in calculations", 0));
ALL_NUTRITIONCATs.push(CreateNutritionCategory("Healthy", "Considered healthy", 1));
ALL_NUTRITIONCATs.push(CreateNutritionCategory("Unhealthy", "Considered unhealthy", -2));








// CreateMenu(day_id, name);
ALL_MENUs.push(CreateMenu("Oats and Muesli"));
ALL_MENUs.push(CreateMenu("Movie Snack"));
ALL_MENUs.push(CreateMenu("Chicken soup"));
ALL_MENUs.push(CreateMenu("Soba noodles"));
ALL_MENUs.push(CreateMenu("Fried rice"));

// CreateFood(menu_id, name, quantity, bulkcost, category_id, nutrition_id);
ALL_FOODs.push(CreateFood("Chicken", 1/4, 520, 6, 1)); // 1
ALL_FOODs.push(CreateFood("Chips", 1, 420, 8, 3));
ALL_FOODs.push(CreateFood("Potato", 1, 100, 3, 1)); // 3
ALL_FOODs.push(CreateFood("Rice", 1/5, 320, 2, 1));
ALL_FOODs.push(CreateFood("Oats", 1/8, 230, 2, 2)); // 5
ALL_FOODs.push(CreateFood("Muesli", 1/8, 560, 2, 2));
ALL_FOODs.push(CreateFood("Pasta", 1/4, 200, 2, 1)); // 7
ALL_FOODs.push(CreateFood("Brocolli", 1/4, 500, 3, 2));
ALL_FOODs.push(CreateFood("Soy sauce", 1/15, 1500, 1, 1)); // 9

// Create_Menu_Food(menu_id, food_id);
ALL_MENU_FOODs.push(Create_Menu_Food(1, 5));
ALL_MENU_FOODs.push(Create_Menu_Food(1, 6));

ALL_MENU_FOODs.push(Create_Menu_Food(2, 2));

ALL_MENU_FOODs.push(Create_Menu_Food(3, 1));
ALL_MENU_FOODs.push(Create_Menu_Food(3, 3));
ALL_MENU_FOODs.push(Create_Menu_Food(3, 4));

ALL_MENU_FOODs.push(Create_Menu_Food(4, 1));
ALL_MENU_FOODs.push(Create_Menu_Food(4, 7));
ALL_MENU_FOODs.push(Create_Menu_Food(4, 8));
ALL_MENU_FOODs.push(Create_Menu_Food(4, 9));

ALL_MENU_FOODs.push(Create_Menu_Food(5, 1));
ALL_MENU_FOODs.push(Create_Menu_Food(5, 3));
ALL_MENU_FOODs.push(Create_Menu_Food(5, 4));
ALL_MENU_FOODs.push(Create_Menu_Food(5, 8));