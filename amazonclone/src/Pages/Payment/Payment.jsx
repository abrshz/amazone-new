import React, { useContext, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import classes from "./Payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard"
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners';
import {db} from "../../Utilities/firebase"
import { useNavigate} from 'react-router-dom';

function Payment() {
	const [{ basket , user }, dispatch] = useContext(DataContext);
  const [cardError ,  setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  
  const totalItems = basket?.reduce((amount ,item)=>{
		return (item?.amount || 0) + amount;
	}, 0)

  const total = basket.reduce((amount, item) => (
    amount + (item?.price || 0) * (item?.amount ?? 1)
  ), 0)

 

  const handleChange = (e) =>{
     setCardError(e?.error?.message ? e?.error?.message : "")
  }

  const handlePayment = async(e) => {
    e.preventDefault()
    try {
      setProcessing(true)
      // step 1,Backend function  -> contact to the client secret
      const response = await axiosInstance({ 
        method: "POST",
        url: `/payment/create?total=${total*100}`,
    })
    const clientSecret = response.data?.clientSecret;

    // step 2,  client side (react side confirmation )
    const {paymentIntent} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
        card: elements.getElement(CardElement)
        }}
      );
    // step 3, after the confirmation -> order firestore database save, clear basket 
    await db.collection("users").doc(user.uid).collection("orders").doc(paymentIntent.id).set(
      {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      }
    )
    // Empty the basket
    dispatch({
      type: "EMPTY_BASKET"
    });

    setProcessing(false)
    navigate("/orders", {state: {msg:"You have placed new Order"} })


    }catch (error){
      console.log(error);
      setProcessing(false)
    };

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
                <form action="" onSubmit={handlePayment}>
                  {cardError && <small style={{color: "red"}}>{cardError}</small>}
                  <CardElement onChange={handleChange} />
                  <div className={classes.payment_price}>
                    <div>
                      <span >
                        <p>Total order |</p> <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <button type='submit'>
                      {processing? (
                        <div className={classes.loading}>  
                          <ClipLoader color='gray' />
                          <p>Please wait ...</p> 
                        </div>
                      ) : "Pay Now"}
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