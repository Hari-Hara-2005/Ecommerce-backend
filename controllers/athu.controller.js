const jwt = require('jsonwebtoken');
const pool = require('../db/db');
const bcrypt = require('bcrypt');

const secureToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";
exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await pool.query('Insert into users(user_email,user_password) values($1,$2) RETURNING*', [email, hashedPassword]);
        res.status(200).json({
            message: 'SuccessFully created..!',
            user: response.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(error.message);
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query('select * from users where user_email=$1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Incorrect Email or Password' });
        }
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Incorrect Email or Password' });
        }
        const token = jwt.sign({ userId: user.rows[0].user_id }, secureToken, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: 'strict',
            secure: true
        })
        res.status(200).json({
            message: "Login Succesfully..!",
            user: {
                id: user.rows[0].user_id,
                email: user.rows[0].user_email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Error..!' });
        console.log(error.message);
    }
}