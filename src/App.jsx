import React from "react";
import Header from "./Components/Header/Header";
import Carousel from "./Components/Carousel/Carousel";
import Category from "./Components/Category/Category";
import "./App.css";
import Product from "./Components/Product/Product";


function App() {
	return (
		<div>
			<Header />
			<Carousel />
			<Category />
			<Product />
		</div>
	);
}

export default App;
