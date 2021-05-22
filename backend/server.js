/* esversion: 6 */

// load the things we need
const express = require("express");

// module
const {products} = require(__dirname + "/data.js");

const app = express();
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = products.find(x => Number(x._id) === Number(productId))
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({msg:"Product Not Found."})
    }
    
})
app.get("/api/products", (req, res) => {
    res.send(products)
})

app.listen(5000, ()=>{console.log("Server is running at http://localhost:5000")})