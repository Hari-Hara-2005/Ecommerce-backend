const pool = require('../db/db');

// ✅ INSERT (ADD BAR)
exports.addBar = async (req, res) => {
  const { bar_text } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO topbar (bar_text) VALUES ($1) RETURNING *",
      [bar_text]
    );

    res.status(200).json({
      message: "Topbar added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ FETCH ALL
exports.getBar = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM topbar ORDER BY bar_id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ DELETE
exports.deleteBar = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM topbar WHERE bar_id = $1", [id]);

    res.json({ message: "Topbar deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server error" });
  }
};