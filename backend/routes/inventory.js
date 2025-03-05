const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.post('/add', async(req, res)=>{
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json({ message: "Item added Succesfully", newItem });   
    } catch(error){
        res.status(500).json({error: "FAiled to Add Item"});
    }
});

//get all inventory items

router.get('/', async(req, res)=> {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error:error.message});
    }
});

//update inventory item

router.put('/update/:id', async(req, res)=>{
    try{
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {new:true});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;