import React, { useContext } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from "../../Components/Product/ProductCard"
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import classes from "./Cart.module.css"
import {Type} from "../../Utilities/action"
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{basket ,user} , dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => (
    amount + (item?.price || 0) * (item?.amount ?? 1)
  ), 0)

const increment =(item) => {
  dispatch({type: Type.ADD_TO_BASKET, item})
}

const decrement = (id) => {
  dispatch({type: Type.REMOVE_FROM_BASKET, id})
  }
  return (
    <LayOut >
      <section className={classes.container}>
        <div className={classes.cart_container} >
          <h2>Hello</h2>
          <h3>Your shopping basket </h3>
          <hr />
          {
            basket?.length==0?(<p>Oops! No item in your cart</p>):(
              basket?.map((item, i)=> {                
                return(<section className={classes.cart_product} key={i}>
                 <ProductCard
                // key={i}
                product={item}
                renderDesc={true}
                flex={true}
                renderAdd={false}
                />
              <div className={classes.btn_container}>
                <button onClick={()=> increment(item)}><IoIosArrowUp /></button>
                <span>{item?.amount || 0}</span>
                <button onClick={()=>decrement(item?.id)}><IoIosArrowDown /></button>
              </div>          
              </section>)
              })
            )
          }
        </div>
        {basket?.length !== 0  && 
        (<div className={classes.subtotal}   >
          <div>
            <p>Subtotal ({basket?.length} items)</p>
            <CurrencyFormat amount={total} />
          </div>
          <span>
            <input type='checkbox'  />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payment"> Continue to payment </Link>
        </div>) }
      </section>
    </LayOut>
  )
}

export default Cart