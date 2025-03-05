const express = require('express');
const connectDB=require('./db');
const inventoryRoutes=require('./routes/inventory');
const cors=require('cors');
require('dotenv').config();

const app=express();
app.arguments(express.json());
app.arguments(cors());

//connect database 
connectDB();

//API Routes
app.use('/api/inventory',inventoryRoutes);

//start server
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log('Server running on port ${PORT}'));