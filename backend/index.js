const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const userRouter = require("./routes/user");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "realtime_db",
  port: process.env.DB_PORT || 5432
});

// Initialize users table
pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`).then(() => console.log("Users table ready"))
  .catch(err => console.error("Table creation error:", err));

app.use((req, res, next) => { req.db = pool; next(); });
app.use("/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

