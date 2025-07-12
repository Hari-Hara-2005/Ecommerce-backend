const pool = require('../db/db');
const uploadToCloudinary = require('../db/cloudinaryConfig');
exports.fetchBanner = async (req, res) => {
    try {
        const response = await pool.query("select * from banner");
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.addBanner = async (req, res) => {
    const { image_url, public_id } = req.body;
    try {
        const response = await pool.query('Insert into banner(image_url,public_id) values($1,$2) returning*', [image_url, public_id]);
        res.status(200).json({ message: 'Added Sucessfully' });
    }
    catch (error) {
        console.log(error.message);
    }
}

exports.updateBanner = async (req, res) => {
    const { id } = req.params;
    const { image_url, public_id } = req.body;
    try {
        const response = await pool.query(`update banner set image_url=$1 ,public_id=$2 where id=$3`, [image_url, public_id, id]);
        res.status(200).json({ message: 'Updated Successfully..!' });
    }
    catch (error) {
        console.log(error.message);
    }
}

exports.deleteBanner = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT public_id FROM banner where id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Record not found or unauthorized" });
        }

        const public_id = result.rows[0].public_id;
        if (public_id) {
            await uploadToCloudinary.uploader.destroy(public_id);
        }

        await pool.query('DELETE FROM banner WHERE id = $1', [id]);
        res.status(200).json({ message: "Deleted Successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};