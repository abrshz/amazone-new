import React, { useContext } from 'react'
import Rating from '@mui/material/Rating';
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat"
import classes from "./Product.module.css"
import { Link } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utilities/action';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
function ProductCard({product, flex, renderDesc , renderAdd , showFavorites}) {
  const {image , title , id , rating , price , description} = product;

  const [{favorites, state}, dispatch]=useContext(DataContext);


  const addToCart = () => {
    dispatch({
      type:Type.ADD_TO_BASKET,
      item:{
        image, title , id , rating , price, description
      }
    })
  }

  function truncate(str,n) {
    return str.length > n ? str.substring(0, n-1)+ '...' : str
  }

  const toggleFavorite = () => {
    if (favorites?.some(item => item.id === id)){
      dispatch({
        type: Type.REMOVE_FROM_FAVORITES,
        id: id,
      })
    } else {
      dispatch({
        type: Type.ADD_TO_FAVORITES,
        item: product,
        });
    }
  }

  return (
    <div className={`${classes.card_container} ${flex?classes.product_flex: ""}`}>
      {showFavorites || <div className={classes.favorite_icon} onClick={toggleFavorite}>
        {favorites?.some(item => item.id === id) ? (
          <FaHeart className={classes.favorite_filled} />
        ) : (
          <FaRegHeart className={classes.favorite_outline} />
        )}
      </div>}
      
        <Link to={`/products/${id}`}>
          <img src={image} key={id} alt="" />
        </Link>
     <div>
        <h3>{renderDesc ? title : truncate(title, 30)}</h3>
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