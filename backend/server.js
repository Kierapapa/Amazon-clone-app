/* esversion: 6 */

// load the things we need
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config()

// module
const {products} = require(__dirname + "/data.js");
const config = require(__dirname + "/config.js");
const User = require(__dirname + "/models/userModel.js");
const userRoute = require(__dirname + "/routes/userRoute.js")
const productRoute = require(__dirname + "/routes/productRoute.js")

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const mongodbUrl = config.MONGODB_URL

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error=>console.log(error.message));

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// const app = express();

// app.set('view engine', 'ejs');

// //app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(express.static("public"));

// There is no need to use static
// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = products.find(x => Number(x._id) === Number(productId))
//     if (product) {
//         res.send(product)
//     } else {
//         res.status(404).send({msg:"Product Not Found."})
//     }
    
// })
// app.get("/api/products", (req, res) => {
//     res.send(products)
// })

app.listen(5000, ()=>{console.log("Server is running at http://localhost:5000")})