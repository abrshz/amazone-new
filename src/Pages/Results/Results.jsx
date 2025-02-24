import React, { useEffect, useState } from 'react'
import classes from "./Results.module.css"
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router'
import axios from 'axios'
import ProductCard from '../../Components/Product/ProductCard'
import productUrl from "../../Api/endPoints"
import Loader from '../../Components/Loader/Loader'

function Results() {
  const [result , setResult] = useState([])
  const [loading , setLoading] = useState(false)
  const {categoryName} = useParams()
  useEffect(()=> {
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      setResult(res.data);
      setLoading(false)
    })
    .catch((err)=>{
      console.log(err);
      setLoading(false)
      })
  }, [])
 
  return (
    <LayOut>
      <section>
        <h1 style={{padding: "30px"}}>Results</h1>
        <p style={{padding: "30px"}}>Category / {categoryName}</p>
        <hr />
        {loading ? (<Loader />) : (
        <div className={classes.products_container}>
          {result?.map((product)=> (
            <ProductCard key={product.id} product={product} renderDesc={false} renderAdd={true}/>
          )
          )}
        </div>
        )}
      </section>
    </LayOut>
  )
}

export default Results