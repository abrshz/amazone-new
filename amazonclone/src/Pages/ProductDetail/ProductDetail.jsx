import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router'
import axios from 'axios'
import productUrl from '../../Api/endPoints'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

function ProductDetail() {
  const {productId} = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data);
      setLoading(false)
    }).catch((err)=>{
      console.log(err);
      setLoading(false)
    })
  }, [productId])
  return (
    <LayOut>
      {loading ? (<Loader />) : product?(<ProductCard product={product}
      flex = {true}
      renderDesc={true}
      renderAdd={true}
      />) : (
        <p>Product not found</p>
      )}
      
    </LayOut>
  )
}

export default ProductDetail