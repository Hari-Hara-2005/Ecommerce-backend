const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/athu', require('./routes/athu.routes'));
app.use('/api', require('./routes/product.routes'));
app.use('/api', require('./routes/order.routes'));
app.use('/api', require('./routes/category.routes'));
app.use('/api', require('./routes/cart.route'));
app.use('/api', require('./routes/banner.routes'));
app.listen(5000, () => {
    console.log("The Serever Running in the Port : 5000");
});
