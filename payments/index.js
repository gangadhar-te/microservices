const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 2000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Ordering')
   .then(() => console.log('Connected to ordering database'))
   .catch((err) => console.log('Connection was a failure'));

const Payment = mongoose.model('Payment', new mongoose.Schema({
    payMode: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


app.get('/api/payment-list', async (req,res) => {
    const payments = await Payment.find();
    res.send(payments);
})

app.post('/api/payment-list', async (req,res) => {
    let payment = new Payment({
        payMode: req.body.payMode
    })
    payment = await payment.save();
    res.send(payment);
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})