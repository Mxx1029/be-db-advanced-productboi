# Backend - Databse - Advanced- Product listing thing

- this example we built together as a Full stack app

# Background

# Steps

- create frontend/backend folders
- create .gitignore and README files
- start to work on the frontend
    - $ npm init -y
    - $ npm install react react-dom react-scripts
    - change script in package.json to "start": "react-scripts start"
    - create public and src folders
    - create index.html in public folder (div#root)
    - create index.js in src folder:
        - import ReactDOM from 'react-dom'
        - import App from './App.jsx'
        - ReactDOM.render(<App />, document.querySelector("#root"));
    - test that react app starts
    - create mini react app (means coding in App.jsx)
        - App lists product and tries to send new products to backend
        - getProducts() w/ a fetch request to get all products, to be reused 3 times 
        - useEffect to load Products from MongoDB only once when page loads (using getProducts())
        - addProduct() w/ a fetch post request and then getProducts() to update
        - deleteProduct(product) w/ a fetch delete request and then getProducts() to update
- start to work on backend
    - $ npm init -y
    - $ npm install express mongoose cors
    - add "type": "module" to package.json and change script to "start": "node index.js"
    - create express server in index.js
        - import express from 'express'
        - import cors from 'cors'
        - import mongoose from 'mongoose'
        - const app = express();
        - app.use(cors());
        - app.use(express.json());
        - connect to MongoDB using a ConnectionString
        - create MongoDB connection event handlers
        - create endpoints for requests from the frontend
            - app.get --> gets all Products
            - app.post --> saves a new product
            - app.delete --> deletes a product by using req.params._id
        - app.listen(3333, console.log("Express App listening at http://localhost:3333"))