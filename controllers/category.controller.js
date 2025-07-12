const pool = require('../db/db');

exports.addCategory = async (req, res) => {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    try {
        const response = await pool.query('Insert into category(category_name,slug) values($1,$2) returning *', [name, slug]);
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
    const { name } = req.body;
    const { id } = req.params;
    try {
        const response = await pool.query('update category set category_name = $1 where category_id = $2', [name, id]);
        res.status(200).json({
            message: 'updated Successfully'
        });
    } catch (error) {
        console.log(error.message);
    }
}