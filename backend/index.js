import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product from './models/product.js';

const app = express();
app.use(cors());
app.use(express.json()); // requests from frontend will be in json (JSON string), so with this express can deal with a json request

// ------ connecting to MongoDB

mongoose.connection.on('error', (e) => {
    console.log("Mongo Error", e);
});
mongoose.connection.on('connecting', () => {
    console.log(">> Mongo Connecting");
});
mongoose.connection.on('disconnected', () => {
    console.log(">> Mongo Disconnected");
});

// user jimmy already exists in the exampledb database
// otherwise you need to do it like that:
// $ mongo
// > use exampledb
// > db.createUser({user: "jimmy", pwd: "passw0rd", roles: ["readWrite"]})
const cs = "mongodb://jimmy:passw0rd@localhost:27017/exampledb";
await mongoose.connect(cs);

// ------ handle requests from frontend

app.get('/products', async (req, res) => {
    const allProducts = await Product.find();
    res.json(allProducts);
})

app.post('/products', (req, res) => {
    console.log("New product request!");
    console.log(req.body); // this only works with express.json() above!
    const newProduct = new Product(req.body);
    newProduct.save()
    .then(() => {
            console.log("Product saved!")
            res.send({ message: "All good" });
        })
        .catch((e) => {
            console.log("Error during product save", e)
            res.status(400);
            res.send({ message: "All bad" })
        })
        // .finally(() => mongoose.connection.close())
})

app.delete('/products/:productId', (req, res) => {
    // first find the product
    // const toBeDeleted = await Product.find({_id: })
    // delete the product
    Product.deleteOne({ _id: req.params.productId })
        .then(result => {
            console.log(result);
            res.send({ message: "All very good"})
        })
        .catch(err => {
            console.log("Error while deleting", err);
            res.status(400);
            res.send({ message: "All very bad"})
        })
    // then respond with "done"
})

app.listen(3333, () => {
    console.log("Listening for requests at http://localhost:3333");
})