const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get("/",async(req,res)=>{
    try{
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
});

router.post("/", async(req,res) =>{
    try{
        const order = new Order(req.body);
        const savedOrder = await order.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete( "/:id" , async(req,res) =>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.json({message:"order deleted successfully"});
    } catch(error){
        res.status(500).json({message:error.message});
    }
})



module.exports = router;
