import React, { useContext, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from "./Payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard"
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';

function Payment() {
	const [{ basket , user }] = useContext(DataContext);
  const [cardError ,  setCardError] = useState(null)
  const stripe = useStripe();
  const elements = useElements();
  
  const totalItems = basket?.reduce((amount ,item)=>{
		return (item?.amount || 0) + amount;
	}, 0)

  const total = basket.reduce((amount, item) => (
    amount + (item?.price || 0) * (item?.amount ?? 1)
  ), 0)

 

  const handleChange = (e) =>{
     setCardError(e?.error?.message ? e?.error?.message : "")
  }

	return (
    <LayOut> 
		
				<div className={classes.payment_header}>
					Checkout  {totalItems} items 
				</div>
        <section className={classes.payment}>
          {/* Address */}
          <div className={classes.flex}>
            <h3>Delivery Address</h3>
            <div>
              <div>{user?.email}</div>
              <div>street</div>
              <div>State, City</div>
            </div>
          </div>
          <hr />
          {/* Product */}
          <div className={classes.flex}>
            <h3>Review items and delivery</h3>
            <div>
              {
                basket?.map((item => 
                  (<ProductCard
                    key={item.id}
                    product={item} flex={true} />)
                ))
              }
            </div>
          </div>
          <hr />
          {/* Card form */}
          <div className={classes.flex}>
            <h3>Payment methods</h3>
            <div className={classes.payment_card_container}>
              <div className={classes.payment_details}>
                <form action="">
                  {cardError && <small style={{color: "red"}}>{cardError}</small>}
                  <CardElement onChange={handleChange} />
                  <div className={classes.payment_price}>
                    <div>
                      <span >
                        <p>Total order |</p> <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <button>
                      Pay Now 
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

      
				
		
    </LayOut>
	);
}

export default Payment