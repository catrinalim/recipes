const BASE_URL = 'http://x.x.x.x:3000'; // 🔁 replace with your actual IP

// ✅ Get all recipes (Home screen)
export async function getAllRecipes() {
  const res = await fetch(`${BASE_URL}/api/recipes`);

  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return res.json();
}

// ✅ Get single recipe (Detail screen)
export async function getRecipeById(id: string | number) {
  const res = await fetch(`${BASE_URL}/api/recipes/${id}`);

  if (!res.ok) {
    throw new Error('Failed to fetch recipe');
  }

  return res.json();
}