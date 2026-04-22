const express = require('express');
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
app.use('/api', require('./routes/topbar.routes'));
app.use('/api', require('./routes/deliveryprice.routes'));


module.exports = serverless(app);
