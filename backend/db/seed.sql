-- Sample Testing Data

-- Test user
INSERT INTO users (username, email, password_hash)
VALUES ('testuser', 'test@example.com', 'test_password')
RETURNING id;

-- Test recipes (user_id = 1)
INSERT INTO recipes (user_id, title, directions, notes) VALUES 
  (1, 'Scrambled Eggs',
  '1. Crack eggs into a bowl and whisk
  2. Heat butter in a pan over medium heat.
  3. Pour eggs into the pan.
  4. Stir gently as eggs cook.
  5. Remove from heat when soft and slightly runny.
  6. Add salt and serve.',
  'Breakfast'),
  (1, 'Grilled Cheese',
  '1. Butter one side of each slice of break.
  2. Place one slice, butter-side down, in a pan.
  3. Add cheese on top.
  4. Place second slice on top, butter-side up.
  5. Cook on medium heat until golden brown.
  6. Flip and cook the other side until cheese is melted.',
  'Lunch')
RETURNING id;

-- Ingredients for Scrambled Eggs (recipe_id = 1)
INSERT INTO recipe_ingredients (recipe_id, ingredient_name, quantity) VALUES
  (1, 'eggs', '3'),
  (1, 'butter', '1 tbsp'),
  (1, 'salt', 'to taste'),
  (1, 'pepper', 'to taste');

-- Ingredients for Grilled Cheese (recipe_id = 2)
INSERT INTO recipe_ingredients (recipe_id, ingredient_name, quantity) VALUES
  (2, 'bread', '2 slices'),
  (2, 'cheese', '2 slices'),
  (2, 'butter', '1 tbsp');

-- User household inventory
INSERT INTO user_inventory (user_id, ingredient_name) VALUES
  (1, 'eggs'),
  (1, 'butter'),
  (1, 'salt'),
  (1, 'pepper'),
  (1, 'bread');