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

const { decode } = require("html-entities");

app.get("/imagem-banner", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT (SELECT BulkColumn as '*' FOR XML PATH('')) AS imagebase64 FROM TempBase64");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Imagem não encontrada" });
    }

    let imagemBase64XmlEncoded = result.recordset[0].imagebase64;

    // Decodificar entidades XML para string normal
    const imagemBase64 = decode(imagemBase64XmlEncoded); // <--- transforma &lt; em <, etc.

    res.json({ imagemBase64 });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


// TESTES UPLOAD
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const multer = require("multer");

// Define onde e como guardar os ficheiros
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // pasta onde será guardada
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

app.post("/upload-imagem", upload.single("imagem"), (req, res) => {
  try {
    const filePath = req.file.path;
    console.log(req.file);

 // ex: uploads/imagem-123456.png
    console.log("Imagem guardada em:", filePath);

    res.json({
      message: "Imagem guardada com sucesso!",
      path: filePath,
      originalName: req.file.originalname,
    });
  } catch (err) {
    console.error("Erro ao guardar imagem:", err);
    res.status(500).json({ error: "Erro ao guardar imagem" });
  }
});
