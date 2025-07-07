const pool = require('../db/db');

exports.addOrder = async (req, res) => {
    const { status, total_price, user_id, items } = req.body;
    try {
        const response = await pool.query('Insert into orders(user_id,status,total_amount) values($1,$2,$3) RETURNING order_id', [user_id, status, total_price])
        const order_id = response.rows[0].order_id;

        for (const item of items) {
            await pool.query('Insert into order_item(order_id,product_id,quantity,price) values($1,$2,$3,$4)', [order_id, item.product_id, item.quantity, item.price]);
        }
        res.status(200).json({ message: 'Ordered Sucessfully', order_id: order_id });
    } catch (error) {
        console.log(error.message);
    }
}