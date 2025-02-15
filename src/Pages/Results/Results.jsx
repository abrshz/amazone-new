import React, { useEffect, useState } from 'react'
import classes from "./Results.module.css"
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router'
import axios from 'axios'
import ProductCard from '../../Components/Product/ProductCard'
import productUrl from "../../Api/endPoints"

function Results() {
  const [result , setResult] = useState([])
  const {categoryName} = useParams()
  useEffect(()=> {
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      setResult(res.data);
    })
    .catch((err)=>{
      console.log(err);
      })
  }, [])
 
  return (
    <LayOut>
      <section>
        <h1 style={{padding: "30px"}}>Results</h1>
        <p style={{padding: "30px"}}>Category / {categoryName}</p>
        <div className={classes.products_container}>
          {result?.map((product)=> (
            <ProductCard key={product._id} product={product} />
          )
          )}
        </div>
      </section>
    </LayOut>
  )
}

export default Results