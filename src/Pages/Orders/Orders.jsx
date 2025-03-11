import React, { useContext, useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { db } from '../../Utilities/firebase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import classes from "./Orders.module.css"
import ProductCard from '../../Components/Product/ProductCard'
import { useNavigate } from 'react-router'

function Orders() {
  const [{ user, basket }, dispatch] = useContext(DataContext)
  const [orders, setOrders] = useState([])
  const navigate = useNavigate();
  

  useEffect(() => {
    if(user) {
      db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
    } else {
      setOrders([])
    }
  }, [user])

  // Handle reorder functionality
  const handleReorder = (item) => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: item
    })
    navigate('/cart')
  }

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order_container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have any orders yet.</div>
          )}
          
          <div>
            {orders?.map((eachOrder, i) => (
              <div key={eachOrder.id || i}>
                <hr />
                <div className={classes.order_header}>
                  <p>Order ID: {eachOrder?.id}</p>
                  <p>Date: {new Date(eachOrder?.data?.created * 1000).toLocaleDateString()}</p>
                </div>
                
                {eachOrder?.data?.basket?.map((order) => (
                  <div className={classes.order_item} key={order.id}>
                    <ProductCard
                      flex={true}
                      product={order}
                      key={order.id}
                    />
                    <button 
                      className={classes.reorder_btn}
                      onClick={() => handleReorder(order)}
                    >
                       Reorder
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Orders