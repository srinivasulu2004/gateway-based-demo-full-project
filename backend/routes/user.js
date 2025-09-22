const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, role } = req.body;
  try {
    const result = await req.db.query(
      "INSERT INTO users(name, role) VALUES($1, $2) RETURNING *",
      [name, role]
    );
    res.json({ message: `User ${result.rows[0].name} saved successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await req.db.query("SELECT * FROM users ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;

