
const pool = require('../db/db');
const uploadToCloudinary = require('../db/cloudinaryConfig');
exports.addProduct = async (req, res) => {
    const {
        name,
        price,
        category,
        image_url,
        public_id,
        hover_image,
        strikeout_price,
        rating,
        label
    } = req.body;

    try {
        const response = await pool.query(
            `INSERT INTO products 
            (product_name, product_price, category_id, image_url, public_id, hover_image, strikeout_price, rating, label) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *`,
            [name, price, category, image_url, public_id, hover_image, strikeout_price, rating, label]
        );

        res.status(200).json({
            message: 'Successfully Added!',
            product: response.rows[0]
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT public_id FROM products WHERE product_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Record not found or unauthorized" });
        }

        const public_id = result.rows[0].public_id;
        if (public_id) {
            await uploadToCloudinary.uploader.destroy(public_id);
        }

        await pool.query('DELETE FROM products WHERE product_id = $1', [id]);
        res.status(200).json({ message: "Deleted Successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.fetchProduct = async (req, res) => {
    try {
        const response = await pool.query('select p.*,c.* from products p join category c on p.category_id = c.category_id');
        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server Error.!" });
    }
};


exports.fetchArrival = async (req, res) => {
    try {
        const categoryId = '9e7361e1-92a9-48bf-b372-28dd38c0e237';

        const response = await pool.query(
            "SELECT * FROM products WHERE category_id = $1",
            [categoryId]
        );

        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server Error.!" });
    }
};


exports.fetchEarrings = async (req, res) => {
    try {
        const categoryId = 'd2a55103-b77b-4381-9830-d45c5973dbfa';

        const response = await pool.query(
            "SELECT * FROM products WHERE category_id = $1",
            [categoryId]
        );

        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server Error.!" });
    }
};


exports.fetchHairaccessories = async (req, res) => {
    try {
        const categoryId = '743e0e9b-f735-45df-8d43-55a9e3b8f314';

        const response = await pool.query(
            "SELECT * FROM products WHERE category_id = $1",
            [categoryId]
        );

        res.status(200).json(response.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server Error.!" });
    }
};


exports.getProduct = async (req, res) => {
    const { slug } = req.params;

    try {
        const productResult = await pool.query(
            'SELECT p.*,c.* FROM products p join category c on p.category_id = c.category_id WHERE c.slug = $1',
            [slug]
        );
        const category_name = productResult.rows[0].category_name;
        res.status(200).json({
            products: productResult.rows,
            category: category_name
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        price,
        category,
        image_url,
        public_id,
        hover_image,
        strikeout_price,
        rating,
        label
    } = req.body;

    try {
        await pool.query(
            `UPDATE products 
             SET product_name = $1, 
                 product_price = $2, 
                 category_id = $3, 
                 strikeout_price = $4,
                 rating = $5,
                 label = $6
             WHERE product_id = $17`,
            [name, price, category, strikeout_price, rating, label, id]
        );

        res.status(200).json({ message: 'Updated Successfully!' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};