const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 1000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Ordering')
   .then(() => console.log('Connected to ordering database'))
   .catch((err) => console.log('Connection was a failure'));

const Order = mongoose.model('Order', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

const Payment = mongoose.model('Payment', new mongoose.Schema({
    payMode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));



app.get('/api/order-list', async (req,res) => {
    const orders = await Order.find();
    res.send(orders);
});

app.post('/api/order-list', async (req,res) => {
    let order = new Order({
        name: req.body.name
    })
    order = await order.save();
    res.send(order);
});

app.get('/api/order-payment/:id', async (req,res) => {
    const order = await Order.findById(req.params.id);
    const payments = await Payment.find();

    let newObj = {
        fetchedOrder : order,
        paymentOpts : payments
    }
    res.json(newObj)
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})