const pool = require('../db/db');

exports.addCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;
    try {
        const response = await pool.query('Insert into cart_item(user_id,product_id,quantity) values($1,$2,$3) returning *', [user_id, product_id, quantity]);
        res.status(200).json({ message: 'Sucessfully Added..!' });
    } catch (error) {
        console.log(error.message);
    }
}

exports.fetchData = async (req, res) => {
    try {
        const response = await pool.query('Select * from cart_item');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await pool.query('delete from cart_item where item_id=$1', [id]);
        res.status(200).json({ message: 'Deleted Sucessfully' });
    } catch (error) {
        console.log(error.message);
    }
}
