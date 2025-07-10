const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const pool = require('./models/database');






const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React app's URL
  credentials: true, // Allow cookies to be sent with the request
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async(req, res) => {
  // res.json({ message: 'API is working!' });
  const result = await pool.query('SELECT NOW()');
  res.json({ dbTime: result.rows[0].now });
})




app.listen(PORT, () => {
  console.log(`Zesco app running on port ${PORT}`);
});