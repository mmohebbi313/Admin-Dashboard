import React, { useState } from 'react'
import './AddNewProduct.css'

export default function AddNewProduct() {
    const[addProductTitle ,setAddProductTitle] = useState('')
    const[addProductPrice ,setAddProductPrice] = useState('')
    const[addProductCount ,setAddProductCount] = useState('')
    const[addProductImg ,setAddProductImg] = useState('')
    const[addProductPopularity ,setAddProductPopularity] = useState('')
    const[addProductSale ,setAddProductSale] = useState('')
    const[addProductColors ,setAddProductColors] = useState('')

    const sendProductData = {
        title : addProductTitle , 
        price : addProductPrice,
        count : addProductCount,
        img : addProductImg,
        popularity : addProductPopularity,
        sale : addProductSale,
        colors : addProductColors,
    }

    const sendProduct = (event)=> {
        event.preventDefault()



        
        fetch('http://localhost:8000/api/products', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendProductData),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
            });
            
    }


  return (
      <div className='products-main'>
          <h1 className='products-title'>افزودن محصول جدید</h1>

          <form action="#" className='add-products-form'>
              <div className='add-products-form-wrap'>
                  <div className='add-products-form-group'>
                      <input type="text" placeholder='اسم محصول را بنویسید' className='add-products-input' 
                      value={addProductTitle}
                      onChange={(ev) => setAddProductTitle(ev.target.value)}
                      />
                  </div>
                  <div className='add-products-form-group'>
                      <input type="text" placeholder='قیمت محصول را بنویسید' className='add-products-input'
                      value={addProductPrice}
                      onChange={(ev) => setAddProductPrice(ev.target.value)}
                      />
                  </div>
                  <div className='add-products-form-group'>
                      <input type="text" placeholder='موجودی محصول را بنویسید' className='add-products-input'
                      value={addProductCount}
                      onChange={(ev) => setAddProductCount(ev.target.value)}
                      />
                  </div>
                  <div className='add-products-form-group'>
                      <input type="text" placeholder='آدرس عکس محصول را بنویسید' className='add-products-input'
                      value={addProductImg}
                      onChange={(ev) => setAddProductImg(ev.target.value)}
                      />
                  </div>
                  <div className='add-products-form-group'>
                      <input type="text" placeholder='میزان محبوبیت محصول را بنویسید' className='add-products-input'
                      value={addProductPopularity}
                      onChange={(ev) => setAddProductPopularity(ev.target.value)}
                      />
                  </div>
                  <div className='add-products-form-group'>
                      <input type="text" placeholder='میزان فروش محصول را بنویسید' className='add-products-input'
                      value={addProductSale}
                      onChange={(ev) => setAddProductSale(ev.target.value)}
                      />
                  </div>
                  <div className='add-products-form-group'>
                      <input type="text" placeholder='تعداد رنگ بندی محصول را بنویسید' className='add-products-input'
                      value={addProductColors}
                      onChange={(ev) => setAddProductColors(ev.target.value)}
                      />
                  </div>
              </div>
              <button className='add-products-submit' onClick={sendProduct}>ثبت محصول</button>
          </form>
      </div>
  )
}
