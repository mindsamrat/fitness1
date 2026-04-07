import { FoodItem } from '@/lib/types';

// Common foods for offline/quick access + fallback
export const foods: FoodItem[] = [
  // Fruits
  { id: "apple", name: "Apple", category: "fruits", servingSize: "1 medium (182g)", servingGrams: 182, calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, sugar: 19 },
  { id: "banana", name: "Banana", category: "fruits", servingSize: "1 medium (118g)", servingGrams: 118, calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, sugar: 14 },
  { id: "orange", name: "Orange", category: "fruits", servingSize: "1 medium (131g)", servingGrams: 131, calories: 62, protein: 1.2, carbs: 15, fat: 0.2, fiber: 3.1, sugar: 12 },
  { id: "strawberries", name: "Strawberries", category: "fruits", servingSize: "1 cup (152g)", servingGrams: 152, calories: 49, protein: 1, carbs: 12, fat: 0.5, fiber: 3, sugar: 7 },
  { id: "grapes", name: "Grapes", category: "fruits", servingSize: "1 cup (151g)", servingGrams: 151, calories: 104, protein: 1.1, carbs: 27, fat: 0.2, fiber: 1.4, sugar: 23 },
  { id: "watermelon", name: "Watermelon", category: "fruits", servingSize: "1 cup (152g)", servingGrams: 152, calories: 46, protein: 0.9, carbs: 11, fat: 0.2, fiber: 0.6, sugar: 9 },
  { id: "mango", name: "Mango", category: "fruits", servingSize: "1 cup (165g)", servingGrams: 165, calories: 99, protein: 1.4, carbs: 25, fat: 0.6, fiber: 2.6, sugar: 23 },
  { id: "pineapple", name: "Pineapple", category: "fruits", servingSize: "1 cup (165g)", servingGrams: 165, calories: 82, protein: 0.9, carbs: 22, fat: 0.2, fiber: 2.3, sugar: 16 },
  { id: "blueberries", name: "Blueberries", category: "fruits", servingSize: "1 cup (148g)", servingGrams: 148, calories: 84, protein: 1.1, carbs: 21, fat: 0.5, fiber: 3.6, sugar: 15 },
  { id: "avocado", name: "Avocado", category: "fruits", servingSize: "1 medium (150g)", servingGrams: 150, calories: 240, protein: 3, carbs: 13, fat: 22, fiber: 10, sugar: 1 },

  // Vegetables
  { id: "broccoli", name: "Broccoli", category: "vegetables", servingSize: "1 cup (91g)", servingGrams: 91, calories: 31, protein: 2.6, carbs: 6, fat: 0.3, fiber: 2.4, sugar: 2 },
  { id: "spinach", name: "Spinach (raw)", category: "vegetables", servingSize: "1 cup (30g)", servingGrams: 30, calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7, sugar: 0.1 },
  { id: "carrot", name: "Carrot", category: "vegetables", servingSize: "1 medium (61g)", servingGrams: 61, calories: 25, protein: 0.6, carbs: 6, fat: 0.1, fiber: 1.7, sugar: 3 },
  { id: "tomato", name: "Tomato", category: "vegetables", servingSize: "1 medium (123g)", servingGrams: 123, calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2, fiber: 1.5, sugar: 3 },
  { id: "potato", name: "Potato (baked)", category: "vegetables", servingSize: "1 medium (173g)", servingGrams: 173, calories: 161, protein: 4.3, carbs: 37, fat: 0.2, fiber: 3.8, sugar: 2 },
  { id: "sweet-potato", name: "Sweet Potato", category: "vegetables", servingSize: "1 medium (114g)", servingGrams: 114, calories: 103, protein: 2.3, carbs: 24, fat: 0.1, fiber: 3.8, sugar: 7 },
  { id: "cucumber", name: "Cucumber", category: "vegetables", servingSize: "1 cup (104g)", servingGrams: 104, calories: 16, protein: 0.7, carbs: 3.1, fat: 0.2, fiber: 0.5, sugar: 2 },
  { id: "bell-pepper", name: "Bell Pepper", category: "vegetables", servingSize: "1 medium (119g)", servingGrams: 119, calories: 31, protein: 1, carbs: 6, fat: 0.3, fiber: 2.1, sugar: 4 },
  { id: "onion", name: "Onion", category: "vegetables", servingSize: "1 medium (110g)", servingGrams: 110, calories: 44, protein: 1.2, carbs: 10, fat: 0.1, fiber: 1.9, sugar: 5 },
  { id: "corn", name: "Corn", category: "vegetables", servingSize: "1 ear (90g)", servingGrams: 90, calories: 77, protein: 2.9, carbs: 17, fat: 1.1, fiber: 2.4, sugar: 3 },

  // Protein
  { id: "chicken-breast", name: "Chicken Breast (grilled)", category: "protein", servingSize: "100g", servingGrams: 100, calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0 },
  { id: "salmon", name: "Salmon (baked)", category: "protein", servingSize: "100g", servingGrams: 100, calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0 },
  { id: "ground-beef", name: "Ground Beef (90% lean)", category: "protein", servingSize: "100g", servingGrams: 100, calories: 176, protein: 20, carbs: 0, fat: 10, fiber: 0, sugar: 0 },
  { id: "eggs", name: "Egg (whole)", category: "protein", servingSize: "1 large (50g)", servingGrams: 50, calories: 72, protein: 6.3, carbs: 0.4, fat: 5, fiber: 0, sugar: 0.2 },
  { id: "tuna", name: "Tuna (canned)", category: "protein", servingSize: "100g", servingGrams: 100, calories: 116, protein: 26, carbs: 0, fat: 0.8, fiber: 0, sugar: 0 },
  { id: "turkey-breast", name: "Turkey Breast", category: "protein", servingSize: "100g", servingGrams: 100, calories: 135, protein: 30, carbs: 0, fat: 1, fiber: 0, sugar: 0 },
  { id: "shrimp", name: "Shrimp", category: "protein", servingSize: "100g", servingGrams: 100, calories: 99, protein: 24, carbs: 0.2, fat: 0.3, fiber: 0, sugar: 0 },
  { id: "tofu", name: "Tofu (firm)", category: "protein", servingSize: "100g", servingGrams: 100, calories: 76, protein: 8, carbs: 1.9, fat: 4.8, fiber: 0.3, sugar: 0.6 },
  { id: "pork-chop", name: "Pork Chop", category: "protein", servingSize: "100g", servingGrams: 100, calories: 196, protein: 27, carbs: 0, fat: 9, fiber: 0, sugar: 0 },
  { id: "bacon", name: "Bacon", category: "protein", servingSize: "3 slices (34g)", servingGrams: 34, calories: 161, protein: 12, carbs: 0.4, fat: 12, fiber: 0, sugar: 0 },

  // Grains
  { id: "white-rice", name: "White Rice (cooked)", category: "grains", servingSize: "1 cup (186g)", servingGrams: 186, calories: 206, protein: 4.3, carbs: 45, fat: 0.4, fiber: 0.6, sugar: 0 },
  { id: "brown-rice", name: "Brown Rice (cooked)", category: "grains", servingSize: "1 cup (195g)", servingGrams: 195, calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, sugar: 0.7 },
  { id: "pasta", name: "Pasta (cooked)", category: "grains", servingSize: "1 cup (140g)", servingGrams: 140, calories: 220, protein: 8, carbs: 43, fat: 1.3, fiber: 2.5, sugar: 0.8 },
  { id: "white-bread", name: "White Bread", category: "grains", servingSize: "1 slice (25g)", servingGrams: 25, calories: 67, protein: 2, carbs: 13, fat: 0.8, fiber: 0.6, sugar: 1.5 },
  { id: "whole-wheat-bread", name: "Whole Wheat Bread", category: "grains", servingSize: "1 slice (28g)", servingGrams: 28, calories: 69, protein: 3.6, carbs: 12, fat: 1, fiber: 1.9, sugar: 1.4 },
  { id: "oatmeal", name: "Oatmeal", category: "grains", servingSize: "1 cup cooked (234g)", servingGrams: 234, calories: 154, protein: 5.4, carbs: 27, fat: 2.6, fiber: 4, sugar: 1 },
  { id: "quinoa", name: "Quinoa (cooked)", category: "grains", servingSize: "1 cup (185g)", servingGrams: 185, calories: 222, protein: 8.1, carbs: 39, fat: 3.6, fiber: 5.2, sugar: 1.6 },
  { id: "tortilla", name: "Flour Tortilla", category: "grains", servingSize: "1 medium (45g)", servingGrams: 45, calories: 140, protein: 3.6, carbs: 24, fat: 3.5, fiber: 1.3, sugar: 1 },
  { id: "bagel", name: "Bagel", category: "grains", servingSize: "1 medium (105g)", servingGrams: 105, calories: 270, protein: 10, carbs: 53, fat: 1.6, fiber: 2.3, sugar: 5 },
  { id: "cereal", name: "Cereal (corn flakes)", category: "grains", servingSize: "1 cup (28g)", servingGrams: 28, calories: 101, protein: 1.9, carbs: 24, fat: 0.2, fiber: 0.7, sugar: 3 },

  // Dairy
  { id: "whole-milk", name: "Whole Milk", category: "dairy", servingSize: "1 cup (244ml)", servingGrams: 244, calories: 149, protein: 8, carbs: 12, fat: 8, fiber: 0, sugar: 12 },
  { id: "skim-milk", name: "Skim Milk", category: "dairy", servingSize: "1 cup (244ml)", servingGrams: 244, calories: 83, protein: 8.3, carbs: 12, fat: 0.2, fiber: 0, sugar: 12 },
  { id: "greek-yogurt", name: "Greek Yogurt (plain)", category: "dairy", servingSize: "1 cup (245g)", servingGrams: 245, calories: 130, protein: 22, carbs: 8, fat: 0.7, fiber: 0, sugar: 7 },
  { id: "cheddar-cheese", name: "Cheddar Cheese", category: "dairy", servingSize: "1 oz (28g)", servingGrams: 28, calories: 113, protein: 7, carbs: 0.4, fat: 9.3, fiber: 0, sugar: 0.1 },
  { id: "cottage-cheese", name: "Cottage Cheese", category: "dairy", servingSize: "1 cup (226g)", servingGrams: 226, calories: 206, protein: 28, carbs: 6, fat: 9, fiber: 0, sugar: 6 },
  { id: "butter", name: "Butter", category: "dairy", servingSize: "1 tbsp (14g)", servingGrams: 14, calories: 102, protein: 0.1, carbs: 0, fat: 12, fiber: 0, sugar: 0 },
  { id: "cream-cheese", name: "Cream Cheese", category: "dairy", servingSize: "1 oz (28g)", servingGrams: 28, calories: 99, protein: 1.7, carbs: 1.6, fat: 10, fiber: 0, sugar: 0.7 },
  { id: "mozzarella", name: "Mozzarella", category: "dairy", servingSize: "1 oz (28g)", servingGrams: 28, calories: 85, protein: 6.3, carbs: 0.7, fat: 6.3, fiber: 0, sugar: 0.3 },
  { id: "paneer", name: "Paneer", category: "dairy", servingSize: "100g", servingGrams: 100, calories: 265, protein: 18, carbs: 1.2, fat: 21, fiber: 0, sugar: 0 },
  { id: "yogurt", name: "Yogurt (regular)", category: "dairy", servingSize: "1 cup (245g)", servingGrams: 245, calories: 149, protein: 8.5, carbs: 17, fat: 8, fiber: 0, sugar: 17 },

  // Fast Food
  { id: "cheeseburger", name: "Cheeseburger", category: "fast-food", servingSize: "1 burger", servingGrams: 156, calories: 303, protein: 16, carbs: 30, fat: 13, fiber: 1, sugar: 7 },
  { id: "pizza-slice", name: "Pizza (cheese slice)", category: "fast-food", servingSize: "1 slice (107g)", servingGrams: 107, calories: 272, protein: 12, carbs: 34, fat: 10, fiber: 2.3, sugar: 4 },
  { id: "french-fries", name: "French Fries", category: "fast-food", servingSize: "medium (117g)", servingGrams: 117, calories: 365, protein: 4, carbs: 44, fat: 17, fiber: 4, sugar: 0.3 },
  { id: "chicken-nuggets", name: "Chicken Nuggets", category: "fast-food", servingSize: "6 pieces (96g)", servingGrams: 96, calories: 280, protein: 14, carbs: 18, fat: 17, fiber: 1, sugar: 0 },
  { id: "hot-dog", name: "Hot Dog", category: "fast-food", servingSize: "1 with bun", servingGrams: 98, calories: 290, protein: 10, carbs: 24, fat: 17, fiber: 0.8, sugar: 4 },
  { id: "burrito", name: "Burrito (bean & cheese)", category: "fast-food", servingSize: "1 burrito", servingGrams: 200, calories: 380, protein: 15, carbs: 55, fat: 12, fiber: 6, sugar: 3 },
  { id: "fried-chicken", name: "Fried Chicken (thigh)", category: "fast-food", servingSize: "1 piece (130g)", servingGrams: 130, calories: 294, protein: 23, carbs: 11, fat: 17, fiber: 0.4, sugar: 0 },
  { id: "tacos", name: "Taco (beef)", category: "fast-food", servingSize: "1 taco", servingGrams: 85, calories: 210, protein: 10, carbs: 20, fat: 10, fiber: 2, sugar: 2 },
  { id: "sub-sandwich", name: "Sub Sandwich (6in)", category: "fast-food", servingSize: "6 inch", servingGrams: 230, calories: 410, protein: 20, carbs: 45, fat: 16, fiber: 3, sugar: 6 },
  { id: "mac-and-cheese", name: "Mac and Cheese", category: "fast-food", servingSize: "1 cup (200g)", servingGrams: 200, calories: 380, protein: 14, carbs: 46, fat: 16, fiber: 2, sugar: 6 },

  // Snacks
  { id: "almonds", name: "Almonds", category: "snacks", servingSize: "1 oz (28g)", servingGrams: 28, calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, sugar: 1.2 },
  { id: "peanuts", name: "Peanuts", category: "snacks", servingSize: "1 oz (28g)", servingGrams: 28, calories: 161, protein: 7, carbs: 4.6, fat: 14, fiber: 2.4, sugar: 1.3 },
  { id: "potato-chips", name: "Potato Chips", category: "snacks", servingSize: "1 oz (28g)", servingGrams: 28, calories: 152, protein: 2, carbs: 15, fat: 10, fiber: 1.2, sugar: 0.1 },
  { id: "popcorn", name: "Popcorn (air-popped)", category: "snacks", servingSize: "3 cups (24g)", servingGrams: 24, calories: 93, protein: 3, carbs: 19, fat: 1.1, fiber: 3.5, sugar: 0.2 },
  { id: "granola-bar", name: "Granola Bar", category: "snacks", servingSize: "1 bar (42g)", servingGrams: 42, calories: 190, protein: 3, carbs: 29, fat: 7, fiber: 2, sugar: 12 },
  { id: "dark-chocolate", name: "Dark Chocolate", category: "snacks", servingSize: "1 oz (28g)", servingGrams: 28, calories: 155, protein: 1.4, carbs: 17, fat: 9, fiber: 2, sugar: 14 },
  { id: "trail-mix", name: "Trail Mix", category: "snacks", servingSize: "1 oz (28g)", servingGrams: 28, calories: 137, protein: 4, carbs: 13, fat: 9, fiber: 2, sugar: 8 },
  { id: "pretzels", name: "Pretzels", category: "snacks", servingSize: "1 oz (28g)", servingGrams: 28, calories: 108, protein: 3, carbs: 23, fat: 1, fiber: 0.9, sugar: 0.5 },
  { id: "protein-bar", name: "Protein Bar", category: "snacks", servingSize: "1 bar (60g)", servingGrams: 60, calories: 210, protein: 20, carbs: 22, fat: 7, fiber: 3, sugar: 6 },
  { id: "banana-chips", name: "Banana Chips", category: "snacks", servingSize: "1 oz (28g)", servingGrams: 28, calories: 147, protein: 0.6, carbs: 17, fat: 10, fiber: 2, sugar: 10 },

  // Beverages
  { id: "coffee-black", name: "Coffee (black)", category: "beverages", servingSize: "1 cup (240ml)", servingGrams: 240, calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, sugar: 0 },
  { id: "orange-juice", name: "Orange Juice", category: "beverages", servingSize: "1 cup (248ml)", servingGrams: 248, calories: 112, protein: 1.7, carbs: 26, fat: 0.5, fiber: 0.5, sugar: 21 },
  { id: "cola", name: "Cola", category: "beverages", servingSize: "1 can (355ml)", servingGrams: 355, calories: 140, protein: 0, carbs: 39, fat: 0, fiber: 0, sugar: 39 },
  { id: "green-tea", name: "Green Tea", category: "beverages", servingSize: "1 cup (240ml)", servingGrams: 240, calories: 2, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 },
  { id: "protein-shake", name: "Protein Shake (whey)", category: "beverages", servingSize: "1 scoop + water", servingGrams: 270, calories: 120, protein: 24, carbs: 3, fat: 1, fiber: 0, sugar: 1 },
  { id: "smoothie", name: "Fruit Smoothie", category: "beverages", servingSize: "1 cup (240ml)", servingGrams: 240, calories: 150, protein: 2, carbs: 36, fat: 0.5, fiber: 2, sugar: 30 },
  { id: "beer", name: "Beer (regular)", category: "beverages", servingSize: "1 can (355ml)", servingGrams: 355, calories: 153, protein: 1.6, carbs: 13, fat: 0, fiber: 0, sugar: 0 },
  { id: "wine-red", name: "Red Wine", category: "beverages", servingSize: "5 oz (148ml)", servingGrams: 148, calories: 125, protein: 0.1, carbs: 4, fat: 0, fiber: 0, sugar: 1 },
  { id: "latte", name: "Latte", category: "beverages", servingSize: "16 oz (480ml)", servingGrams: 480, calories: 190, protein: 13, carbs: 19, fat: 7, fiber: 0, sugar: 17 },
  { id: "coconut-water", name: "Coconut Water", category: "beverages", servingSize: "1 cup (240ml)", servingGrams: 240, calories: 46, protein: 1.7, carbs: 9, fat: 0.5, fiber: 2.6, sugar: 6 },

  // Condiments
  { id: "olive-oil", name: "Olive Oil", category: "condiments", servingSize: "1 tbsp (14ml)", servingGrams: 14, calories: 119, protein: 0, carbs: 0, fat: 14, fiber: 0, sugar: 0 },
  { id: "peanut-butter", name: "Peanut Butter", category: "condiments", servingSize: "2 tbsp (32g)", servingGrams: 32, calories: 188, protein: 8, carbs: 6, fat: 16, fiber: 2, sugar: 3 },
  { id: "honey", name: "Honey", category: "condiments", servingSize: "1 tbsp (21g)", servingGrams: 21, calories: 64, protein: 0.1, carbs: 17, fat: 0, fiber: 0, sugar: 17 },
  { id: "ketchup", name: "Ketchup", category: "condiments", servingSize: "1 tbsp (17g)", servingGrams: 17, calories: 20, protein: 0.2, carbs: 5, fat: 0, fiber: 0, sugar: 4 },
  { id: "mayonnaise", name: "Mayonnaise", category: "condiments", servingSize: "1 tbsp (13g)", servingGrams: 13, calories: 94, protein: 0.1, carbs: 0.1, fat: 10, fiber: 0, sugar: 0.1 },
  { id: "soy-sauce", name: "Soy Sauce", category: "condiments", servingSize: "1 tbsp (16ml)", servingGrams: 16, calories: 9, protein: 0.9, carbs: 1, fat: 0, fiber: 0, sugar: 0.2 },
  { id: "ranch-dressing", name: "Ranch Dressing", category: "condiments", servingSize: "2 tbsp (30g)", servingGrams: 30, calories: 129, protein: 0.4, carbs: 2, fat: 13, fiber: 0, sugar: 1 },
  { id: "salsa", name: "Salsa", category: "condiments", servingSize: "2 tbsp (32g)", servingGrams: 32, calories: 10, protein: 0.5, carbs: 2, fat: 0.1, fiber: 0.5, sugar: 1.5 },

  // Prepared/Indian
  { id: "dal", name: "Dal (lentils cooked)", category: "prepared", servingSize: "1 cup (198g)", servingGrams: 198, calories: 230, protein: 18, carbs: 40, fat: 0.8, fiber: 16, sugar: 3.5 },
  { id: "chicken-curry", name: "Chicken Curry", category: "prepared", servingSize: "1 cup (240g)", servingGrams: 240, calories: 285, protein: 22, carbs: 12, fat: 16, fiber: 2, sugar: 4 },
  { id: "biryani", name: "Chicken Biryani", category: "prepared", servingSize: "1 cup (250g)", servingGrams: 250, calories: 350, protein: 18, carbs: 45, fat: 12, fiber: 2, sugar: 3 },
  { id: "roti", name: "Roti / Chapati", category: "prepared", servingSize: "1 piece (40g)", servingGrams: 40, calories: 120, protein: 3.5, carbs: 20, fat: 3.5, fiber: 2, sugar: 0.5 },
  { id: "naan", name: "Naan", category: "prepared", servingSize: "1 piece (90g)", servingGrams: 90, calories: 262, protein: 8.7, carbs: 45, fat: 5, fiber: 2, sugar: 3 },
  { id: "fried-rice", name: "Fried Rice", category: "prepared", servingSize: "1 cup (200g)", servingGrams: 200, calories: 238, protein: 6, carbs: 35, fat: 8, fiber: 1.5, sugar: 2 },
  { id: "grilled-chicken-salad", name: "Grilled Chicken Salad", category: "prepared", servingSize: "1 bowl (300g)", servingGrams: 300, calories: 230, protein: 28, carbs: 10, fat: 9, fiber: 4, sugar: 4 },
  { id: "scrambled-eggs", name: "Scrambled Eggs", category: "prepared", servingSize: "2 eggs (122g)", servingGrams: 122, calories: 182, protein: 12, carbs: 2, fat: 14, fiber: 0, sugar: 1 },
  { id: "chicken-tikka", name: "Chicken Tikka", category: "prepared", servingSize: "100g", servingGrams: 100, calories: 148, protein: 25, carbs: 2, fat: 4.5, fiber: 0.5, sugar: 1 },
  { id: "idli", name: "Idli", category: "prepared", servingSize: "2 pieces (60g)", servingGrams: 60, calories: 78, protein: 2, carbs: 17, fat: 0.1, fiber: 0.8, sugar: 0 },
  { id: "dosa", name: "Dosa (plain)", category: "prepared", servingSize: "1 piece (80g)", servingGrams: 80, calories: 133, protein: 3, carbs: 22, fat: 3.7, fiber: 1, sugar: 0.5 },
  { id: "paratha", name: "Paratha (plain)", category: "prepared", servingSize: "1 piece (80g)", servingGrams: 80, calories: 260, protein: 5, carbs: 36, fat: 10, fiber: 2, sugar: 1 },
];

// Nutritionix API search for foods not in local database
export async function searchFoodAPI(query: string): Promise<FoodItem[]> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10`
    );
    const data = await res.json();
    if (!data.products) return [];
    return data.products
      .filter((p: Record<string, unknown>) => p.product_name && (p.nutriments as Record<string, unknown>)?.['energy-kcal_100g'])
      .map((p: Record<string, unknown>): FoodItem => {
        const n = p.nutriments as Record<string, number>;
        return {
          id: `api-${p._id}`,
          name: (p.product_name as string) || 'Unknown',
          category: 'api-result',
          servingSize: '100g',
          servingGrams: 100,
          calories: Math.round(n['energy-kcal_100g'] || 0),
          protein: Math.round((n.proteins_100g || 0) * 10) / 10,
          carbs: Math.round((n.carbohydrates_100g || 0) * 10) / 10,
          fat: Math.round((n.fat_100g || 0) * 10) / 10,
          fiber: Math.round((n.fiber_100g || 0) * 10) / 10,
          sugar: Math.round((n.sugars_100g || 0) * 10) / 10,
        };
      })
      .slice(0, 10);
  } catch {
    return [];
  }
}
