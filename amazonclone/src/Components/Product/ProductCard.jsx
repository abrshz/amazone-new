import React, { useContext } from 'react'
import Rating from '@mui/material/Rating';
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat"
import classes from "./Product.module.css"
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utilities/action';

function ProductCard({product, flex, renderDesc , renderAdd}) {
  const {image , title , id , rating , price , description} = product;

  const [state, dispatch]=useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type:Type.ADD_TO_BASKET,
      item:{
        image, title , id , rating , price, description
      }
    })
  }

  return (
    <div className={`${classes.card_container} ${flex?classes.product_flex: ""}`}>
        <Link to={`/products/${id}`}>
          <img src={image} key={id} alt="" />
        </Link>
     <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{maxWidth: "750px"}}>{description}</div> }
        <div className={classes.rating}>
            <Rating name="half-rating" value={rating?.rate || 0} precision={0.1} />
            <small>({rating?.count})</small>
        </div>
        <div>
            <CurrencyFormat amount={price} />
        </div>
        {renderAdd && <button className={classes.button} onClick={addToCart}>
          Add to cart
        </button>
        }        
     </div>
    </div>
  )
}

export default ProductCard