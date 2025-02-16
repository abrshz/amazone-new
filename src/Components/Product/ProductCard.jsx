import React from 'react'
import Rating from '@mui/material/Rating';
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat"
import classes from "./Product.module.css"
import { Link } from 'react-router-dom';

function ProductCard({product}) {
  const {image , title , id , rating , price } = product;
  return (
    <div className={classes.card_container}>
         <Link to={`/products/${id}`}>
        <img src={image} key={id} alt="" />
     </Link>
     <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
            {/* Rating */}
            <Rating name="half-rating" value={rating?.rate || 0} precision={0.1} />
            <small>({rating?.count})</small>
        </div>
        <div>
            {/* price */}
            <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>
          Add to cart
        </button>
     </div>
    </div>
  )
}

export default ProductCard