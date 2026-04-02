-- Sample Testing Data

-- Test user
INSERT INTO users (username, email, password_hash)
VALUES ('testuser', 'test@example.com', 'test_password')
RETURNING id;

-- Test recipes
INSERT INTO recipes (user_id, title, directions, notes)
VALUES
    (1, 'Palitaw',
     '1. Combine glutinous rice flour and water in a bowl, then mix and knead until a smooth dough forms.
      2. Scoop about 2 tablespoons of dough and shape it into a ball.
      3. Flatten the dough gently using the palm of your hands into a thin oval disc, about a quarter inch thick.
      4. Bring a pot of water to a boil and add dough pieces.
      5. Once the dough floats to teh surface, remove it.
      6. In a separate bowl, combine sugar and sesame seeds.
      7. Roll each warm rice cake in graded coconut, then coat with sugar and sesame seed mixture.',
      'Dessert'),
    (1, 'Scrambled Eggs',
     '1. Crack eggs into bowl.
      2. Whisk with salt and pepper.
      3. Cook',
      'Breakfast')
    