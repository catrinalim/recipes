const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const inventoryRouter = require('./routes/inventory');

// Mount Routes
app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/inventory', inventoryRouter);

// Test Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Recipe API is running!',
    endpoints: {
      users: 'api/users',
      recipes: '/api/recipes',
      ingredients: '/api/ingredients',
      inventory: '/api/inventory'
    }
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong :(',
    message: err.mesage
  });
});

// 404 Handler (must be last)
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    availableEndpoints: [
      '/api/users',
      '/api/recipes',
      '/api/ingredients',
      '/api/inventory'
    ]
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});