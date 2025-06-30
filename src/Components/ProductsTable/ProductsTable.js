import React, { useEffect, useState } from "react";
import "./ProductsTable.css";
import DeleteModal from "./../DeleteModal/DeleteModal";
import DetailsModal from "./../DetailsModal/DetailsModal";
import EditModal from './../EditModal/EditModal'
import {AiOutlineDollarCircle} from 'react-icons/ai'
import ErrorBox from "../Errorbox/Errorbox";

export default function ProductsTable() {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productShow , setProductShow] = useState([])
  const [productID , setProductID] = useState([])
  const [detailsData , setDetailsData] = useState({})
  /////////////////////
  const [newTitle , setNewTitle] = useState('')
  const [newPrice , setNewPrice] = useState('')
  const [newCount , setNewCount] = useState('')
  const [newImg , setNewImg] = useState('')
  const [newPopularity , setNewPopularity] = useState('')
  const [newSale , setNewSale] = useState('')
  const [newColors , setNewColors] = useState('')
  /////////////////////////
  useEffect( ()=> {
     fetch("http://localhost:8000/api/products/")
     .then((data) => data.json())
     .then((pruduct)=> setProductShow(pruduct))
  }, [isShowDeleteModal,isShowEditModal])
  

  const deleteModalCancelAction = () => {
    console.log("مدال کنسل شد");
    setIsShowDeleteModal(false);

  };

  const deleteModalSubmitAction = () => {
    console.log("مدال تایید شد");
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(result => {
      setIsShowDeleteModal(false);
      // getAllProducts()
    })

  };

  const closeDetailsmodal = () => {
    setIsShowDetailsModal(false)
    console.log('مدال جزییات بسته شد');
  }

  const updateProductInfos = (event) => {
    event.preventDefault()
  
    
    const putDataProduct ={
      title : newTitle,
        price : newPrice,
        count : newCount,
        img : newImg,
        popularity : newPopularity,
        sale : newSale,
        colors : newSale
    }

    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: 'Put',
      headers: {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(putDataProduct),
      
    }).then(result => result.json())
    .then(res => 
      setIsShowEditModal(false)
     )
    
     console.log('محصول ویرایش شد');
  }

  console.log(detailsData);
  

  return (
    <>
    { productShow.length ? (
            <table className="products-table">
            <thead>
              <tr className="products-table-heading-tr">
                <th>عکس</th>
                <th>اسم</th>
                <th>قیمت</th>
                <th>موجودی</th>
              </tr>
            </thead>
    
    
            {productShow.map(data=> (
             
             <tbody key={data.id}>
             <tr  className="products-table-tr" >
               <td>
                 <img
                   src={data.img}
                   alt="oil image"
                   className="products-table-img"
                 />
               </td>
               <td>{data.title}</td>
               <td>{data.price} </td>
               <td>{data.popularity}</td>
               <td>
                 <button
                   className="products-table-btn"
                   onClick={() => {
                    setIsShowDetailsModal(true)
                    setDetailsData(data)
                   }
                   }
                 >
                   جزییات
                 </button>
                 <button
                   className="products-table-btn"
                   onClick={() => {setIsShowDeleteModal(true)
                    setProductID(data.id)
                   }}
                 >
                   حذف
                 </button>
                 <button className="products-table-btn"
                   onClick={() => {setIsShowEditModal(true)
                    setProductID(data.id)
                    setNewTitle(data.title)
                    setNewPrice(data.price)
                    setNewCount(data.count)
                    setNewImg(data.img)
                    setNewPopularity(data.popularity)
                    setNewSale(data.sale)
                    setNewColors(data.colors)
                   }}
                 >ویرایش</button>
               </td>
             </tr>
           </tbody>
    
            ))}
    


    {/* ////////////////////////////////////////////////////////////////////////////////////////////////// */}
          </table>
    ) : (
      <ErrorBox msg="هیچ محصولی یافت نشد" />
    )}

      {isShowDeleteModal && (
        <DeleteModal
          submitAction={deleteModalSubmitAction}
          cancelAction={deleteModalCancelAction}
          title={"آیا از حدف اطمینان کامل را دارید؟"}
        />
      )}
      {isShowDetailsModal && (
      <DetailsModal onHide={closeDetailsmodal}>
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم</th>
              <th>قیمت</th>
              <th>محبوبیت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detailsData.title}</td>
              <td>{detailsData.price}</td>
              <td>{detailsData.popularity}</td>
            </tr>
          </tbody>
        </table>
      </DetailsModal>
      )}
      {isShowEditModal && <EditModal
        onClose={() => setIsShowEditModal(false)}
        onSubmit={updateProductInfos}
      >

        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder="عنوان جدید را وارد کنید" className="edit-product-input" 
          value={newTitle}
          onChange={(ev) => setNewTitle(ev.target.value)}
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder="قیمت جدید را وارد کنید" className="edit-product-input" 
          value={newPrice}
          onChange={(ev) => setNewPrice(ev.target.value)}
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder="تعداد مجودی جدید را وارد کنید" className="edit-product-input" 
          value={newCount}
          onChange={(ev) => setNewCount(ev.target.value)}
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder="آدرس عکس جدید را وارد کنید" className="edit-product-input" 
          value={newImg}
          onChange={(ev) => setNewImg(ev.target.value)}
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder="میزان محبوبیت جدید را وارد کنید" className="edit-product-input" 
          value={newPopularity}
          onChange={(ev) => setNewPopularity(ev.target.value)}
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder="میزان فروش جدید را وارد کنید" className="edit-product-input" 
          value={newSale}
          onChange={(ev) => setNewSale(ev.target.value)}
          />
        </div>
        <div className="edit-proructs-form-group">
          <span>
            <AiOutlineDollarCircle />
          </span>
          <input type="text" placeholder="تعداد رنگ جدید را وارد کنید" className="edit-product-input" 
          value={newColors}
          onChange={(ev) => setNewColors(ev.target.value)}
          />
        </div>

      </EditModal>}
    </>
  );
}
