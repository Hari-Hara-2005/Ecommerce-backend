const pool = require('../db/db');
const uploadToCloudinary = require('../db/cloudinaryConfig');
exports.addCategory = async (req, res) => {
    const { name, image_url, public_id } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    try {
        const response = await pool.query('Insert into category(category_name,slug,category_image,category_public_id) values($1,$2,$3,$4) returning *', [name, slug, image_url, public_id]);
        res.status(200).json({ message: 'Added Successfully..!' });
    } catch (error) {
        console.log(error.message);
    }
}

exports.fetchData = async (req, res) => {
    try {
        const response = await pool.query('select * from category');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT category_public_id FROM category WHERE category_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Record not found or unauthorized" });
        }

        const public_id = result.rows[0].category_public_id;
        if (public_id) {
            await uploadToCloudinary.uploader.destroy(public_id);
        }
        const response = await pool.query('delete from category where category_id=$1', [id]);
        res.status(200).json({
            message: 'deleted Successfully'
        });
    }
    catch {
        console.log(error.message);
    }
}

exports.updateCategory = async (req, res) => {
    const { name, image_url, public_id } = req.body;
    const { id } = req.params;
    try {
        const response = await pool.query(`update category set category_name = $1,category_image=$2,category_public_id=$3 where category_id = $4`, [name, image_url, public_id, id]);
        res.status(200).json({
            message: 'updated Successfully'
        });
    } catch (error) {
        console.log(error.message);
    }
}