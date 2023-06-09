const express = require("express");
const PORT = process.env.PORT || 8000;
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const chalk = require("chalk");
const ConnectDb = require("./config/config");
const errorHandler = require("./middleware/errorMiddleware");
//Routes Path
const authRoutes = require("./routes/authRouter");

//dotenv
dotenv.config();

//connect databse
ConnectDb();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

//API Routes
app.use("/api/v1/auth", authRoutes);

//static files ---- Now run on cyclic
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", function (req, res) {
//   res.send(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, () => {
  console.log(chalk.blue.inverse("Server is running at port no :", PORT));
});
