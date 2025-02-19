import React, { useContext } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/Data Provider/DataProvider'
import ProductCard from "../../Components/Product/ProductCard"
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import classes from "./Card.module.css"

function Card() {
  const [{basket ,user} , dispatch] = useContext(DataContext);
  const total = basket.reduce((amount , item) =>{
    return item.price + amount
  }, 0)
  return (
    <LayOut >
      <section className={classes.container}>
        <div className={classes.cart_container} >
          <h2>Hello</h2>
          <h3>Your shopping basket </h3>
          <hr />
          {
            basket?.length==0?(<p>Oops! No item in your cart</p>):(
              basket?.map((item)=> {
                return (<ProductCard
                key={item.id}
                product={item}
                renderDesc={true}
                flex={true}
                renderAdd={false}
                />)
              })
            )
          }
        </div>
        {basket?.length !== 0  && 
        <div className={classes.subtotal}   >
          <div>
            <p>Subtotal ({basket?.length} items)</p>
            <CurrencyFormat amount={total} />
          </div>
          <span>
            <input type='checkbox'  />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payment"> Continue to payment </Link>

        </div> }
      </section>
    </LayOut>
  )
}

export default Card