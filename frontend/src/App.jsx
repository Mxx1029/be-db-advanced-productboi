import { useState, useEffect } from 'react';

export default function App() {

    const [ name, setName ] = useState(""); // "" keeps the placeholder visible on reload
    const [ price, setPrice ] = useState(0); // null keeps the placeholder visible on reload, instead of 0

    // const defaultProducts = [
    //     { name:  "iPad", price: 10},
    //     { name:  "iPod", price: 3},
    //     { name:  "iMac", price: 12}
    // ]
    // const [ products, setProducts ] = useState(defaultProducts);
    const [ products, setProducts ] = useState([]);

    const getProducts = () => {
        const url = "http://localhost:3333/products";
        fetch(url)
            .then(response => response.json())
            .then(results => {
                console.log(results);
                setProducts(results);
            })
            .catch(e => console.log("Error while fetching products", e))
    }

    // to fetch the products from Mongo only once, we use the useEffect() hook
    useEffect( getProducts, [] )
    // only renders one time! React normally rerenderes whenever there is just one tiny change to any variable
    
    const addProduct = () => {
        // alert("Click " + name) // good for testing if setName works
        
        // now we call the backend here
        const newProduct = { name, price }; // this is the body
        const url = "http://localhost:3333/products";
        // config or init is the default name
        const config = {
            headers: { 
                "Content-Type": "application/json" // sometimes called "mimetype"
            },
            method: "POST",
            body: JSON.stringify(newProduct) // for sending data you need to turn it into a string when you use fetch (axios does that automatically)
        }
        
        fetch(url, config)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                getProducts(); // in this function is another fetch request to update the product list
                setName(""); // to empty the input fields after saving
                setPrice(0); // if your form is huge you would do a reset function to take care of that
            })
            .catch(err => console.log("Errrror", err))
    }
        // with axios you need less steps, but get result.data!
        // axios.post(url, newProduct)
        //     .then(result => console.log(result.data))
        //     .catch(err => console.log("Errrror", err))

    const deleteProduct = (product) => {
        // alert("Deleting " + product.name);
        const url = "http://localhost:3333/products/" + product._id; // you give it the exact path which is the _id
        const config = {
            method: "DELETE"
        }

        fetch(url, config)
            .then(response => response.json())
            .then(result => {
                getProducts();
            })
            .catch(err => console.log("Error while deleting", err))
    }
    
    return (
        <>
            <h3>Product Listing Example App</h3>
            <ul>
                {products.map((item) => {
                return (
                    <li key={item._id}>{item.name} {item.price} <button onClick={() => deleteProduct(item)}>delete</button>
                </li>)
                })}
            </ul>

            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Product name"
            />
            <br />
            <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(parseInt(e.target.value))} // it seems you don't need the parseInt, but apparently often typeof e.target.value is a string
                placeholder="Price"
            />
            <br />
            <button onClick={addProduct}>Add new product</button>

        </>
        
    )

}