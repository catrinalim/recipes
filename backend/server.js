const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const recipesRouter = require('./routes/recipes');
const inventoryRouter = require('./routes/inventory');

app.use('/api/recipes', recipesRouter);
app.use('/api/inventory', inventoryRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Recipe API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});