import './App.css';
import KitchenSinkExample from './Card/Card';
import { useState, useEffect } from 'react';

// Component level comment: This is the main App component for a product search and display application
function App() {
  // State variable to store the search term entered by the user
  const [search, setsearch] = useState("");

  // State variable to store the list of products fetched from the API
  const [product, setproduct] = useState([]);

  // Effect to fetch products based on the search term
  useEffect(() => {
    const url = search!== ""
     ? `https://fakestoreapi.com/products/category/${search}`
      : `https://fakestoreapi.com/products`;

    // Fetch products from the API and update the product state
    fetch(url)
     .then((res) => res.json())
     .then((json) => setproduct(json));
  }, [search]);

  // Log the search term for debugging purposes
  console.log(search);

  // State variable to store the category search term entered by the user
  const [categorysearch, setcategorysearch] = useState("");

  // Effect to fetch products based on the category search term
  useEffect(() => {
    const urls = categorysearch!== ""? `https://fakestoreapi.com/products/category/${categorysearch}`
      : `https://fakestoreapi.com/products`;

    // Fetch products from the API and update the product state
    fetch(urls)
     .then((res) => res.json())
     .then((json) => setproduct(json));
  }, [categorysearch]);

  // Log the category search term for debugging purposes
  console.log(categorysearch);
  //create veriable for search price 
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  useEffect(() => {
    const url = `https://fakestoreapi.com/products`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // Filter products based on price range
        const filteredProducts = json.filter(product => {
          if (minPrice !== "" && maxPrice !== "") {
            return product.price >= parseFloat(minPrice) && product.price <= parseFloat(maxPrice);
          }
          return true;
        });
        setproduct(filteredProducts);
      });
  }, [minPrice, maxPrice]);

  
  
    
  
  // Return the JSX for the App component
  return (
    <div className="App">
      <div className='layout'>
        <div className='filter-side'>
          <div className='input-box'>
            <h4>Search</h4>
            <input type='text' value={search} onChange={(e) => setsearch(e.target.value)} placeholder='Search product' />
          </div>
          <div className='category'>
            <h4>Category</h4>
            <span><input type='radio' name='radio' value={categorysearch} onChange={(e) => e.target.checked && setcategorysearch("men's clothing" )}/>Men</span>
            <span><input type='radio' name='radio' value={categorysearch} onChange={(e) => e.target.checked && setcategorysearch("women's clothing" )} />Women</span>
            <span><input type='radio' name='radio' value={categorysearch} onChange={(e) => e.target.checked && setcategorysearch( "jewelery" )} />Jewelery</span>
            <span><input type='radio' name='radio' value={categorysearch} onChange={(e) => e.target.checked && setcategorysearch( "electronics" )} />Electronics</span>
          </div>
          <div className='category'>
            <h4>Price</h4>
            <span><input type='radio' name='price' onChange={() => { setMinPrice("0"); setMaxPrice("100") }} />0 To 100</span>
            <span><input type='radio' name='price' onChange={() => { setMinPrice("100"); setMaxPrice("400") }} />100 To 400</span>
            <span><input type='radio' name='price' onChange={() => { setMinPrice("400"); setMaxPrice("800") }} />400 To 800</span>
            <span><input type='radio' name='price' onChange={() => { setMinPrice("800"); setMaxPrice("1200") }} />800 To 1200</span>
          </div>
        </div>
        <div className='product-side'>
          {product?.map((product, index) => {
            return <KitchenSinkExample {...product} />;
          })}
          {product.length === 0 && (
            <div className="notfouns">
              <h1>Product Not Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;