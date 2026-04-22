const pool = require('../db/db');


// ✅ CREATE
exports.addDeliveryPrice = async (req, res) => {
    const { price } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO deliveryprice(price) VALUES($1) RETURNING *',
            [price]
        );

        res.status(201).json({
            message: "Delivery price added",
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};



// ✅ READ (All)
exports.getAllDeliveryPrices = async (req, res) => {
    try {
        const result = await pool.query('SELECT  price FROM deliveryprice LIMIT 1');
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};





// ✅ UPDATE
exports.updateDeliveryPrice = async (req, res) => {
    const { id } = req.params;
    const { price } = req.body;

    try {
        const result = await pool.query(
            'UPDATE deliveryprice SET price = $1 WHERE id = $2 RETURNING *',
            [price, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({
            message: "Updated successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};



// ✅ DELETE
exports.deleteDeliveryPrice = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM deliveryprice WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Not found" });
        }

        res.status(200).json({
            message: "Deleted successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};