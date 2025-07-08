const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");






const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // React app's URL
  credentials: true, // Allow cookies to be sent with the request
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: 'API is working!' });
})




app.listen(PORT, () => {
  console.log(`Zesco app running on port ${PORT}`);
});