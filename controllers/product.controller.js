
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
                 image_url = $4, 
                 public_id = $5,
                 hover_image = $6,
                 strikeout_price = $7,
                 rating = $8,
                 label = $9
             WHERE product_id = $10`,
            [name, price, category, image_url, public_id, hover_image, strikeout_price, rating, label, id]
        );

        res.status(200).json({ message: 'Updated Successfully!' });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};;
