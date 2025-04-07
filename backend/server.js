const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sql, poolPromise } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// Rota para buscar clientes
app.get("/clientes", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT top 10 nome, no, ncont  FROM CL");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

