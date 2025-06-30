import React, { useEffect, useState } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import './Users.css'
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from './../EditModal/EditModal'
import {AiOutlineDollarCircle} from 'react-icons/ai'


export default function Users() {
  const [users, setUsers] = useState([]);
  const [isShowDelete , setIsShowDelete] = useState(false)
  const [userId , setUserId] = useState(null)
  const [isShowDetailsModal , setIsShowDetailsModal] = useState(false)
  const [detailsData , setDatailsData] = useState({})
  const [isShowEditModal , setIsShowEditModal] = useState(false)
  ///////////////////////////////
    const [newFirst , setNewFirst] = useState('')
    const [newLast , setNewLast] = useState('')
    const [newUserName , setNewUserName] = useState('')
    const [newPassword , setNewPassword] = useState('')
    const [newPhone , setNewPhone] = useState('')
    const [newEmail , setNewEmail] = useState('')
    const [newCity , setNewCity] = useState('')
    const [newAdres , setNewAdres] = useState('')
    const [newScore , setNewScore] = useState('')
    const [newBuy , setNewBuy] = useState('')
  ///////////////////////////////

  const sendCancleDelete = () => setIsShowDelete(false)
  const closeDetailsmodal = () => setIsShowDetailsModal(false)

  useEffect(() => {
     fetchData()
  }, []);


  const fetchData = () => {
    fetch(`http://localhost:8000/api/users`)
    .then((res) => res.json())
    .then((users) => setUsers(users));
  }


  const sendSubmitDelet = () => {

    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: 'Delete'
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setIsShowDelete(false)
      fetchData()
    })

  } 

  const updateProductInfos = (event) => {
     event.preventDefault()

    const putNewData = {

      firsname : newFirst, 
      lastname : newLast,  
      username : newUserName,
      password : newPassword, 
      phone : newPhone, 
      city : newCity,
      email : newEmail,
      address : newAdres,
      score : newScore, 
      buy : newBuy
    }
    fetch(`http://localhost:8000/api/users/${userId}` , {
      method : 'Put',
      headers : {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify(putNewData)
    }).then( result => result.json())
    .then( (res) => {
      console.log(res);
      setIsShowEditModal(false)
      fetchData()
    })
  }

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کاربران</h1>

      
      
      <table className="cms-table">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>یوزرنیم</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={1}>
                <td>{user.firsname} {user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={ () => {
                    setIsShowDelete(true)
                    setUserId(1)
                  }}>حذف</button>
                  <button onClick={()=> {
                    setIsShowDetailsModal(true)
                    setDatailsData(user)
                  }}>جزییات</button>
                  <button onClick={() => {
                   setIsShowEditModal(true)
                   setUserId(user.id)
                   setNewFirst(user.firsname)
                   setNewLast(user.lastname)
                   setNewUserName(user.username)
                   setNewPassword(user.password)
                   setNewPhone(user.phone)
                   setNewEmail(user.email)
                   setNewCity(user.city)
                   setNewAdres(user.address)
                   setNewScore(user.score)
                   setNewBuy(user.buy)
                  }}
                  >ویرایش</button>
                </td>
              </tr>
             ))} 
          </tbody>
        </table>
      


      {/* {users.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>یوزرنیم</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firsname} {user.lastname}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={ () => {
                    setIsShowDelete(true)
                    setUserId(user.id)
                  }}>حذف</button>
                  <button>جزییات</button>
                  <button>ویرایش</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کاربری یافت نشد" />
      )} */}

    { isShowDelete && <DeleteModal title={'آیا از حذف کاربر مطئمن هستید؟'} submitAction= {sendSubmitDelet} cancelAction={sendCancleDelete}>


    </DeleteModal>
    }


          {isShowDetailsModal && (
          <DetailsModal onHide={closeDetailsmodal}>
            <table className="cms-table">
              <thead>
                <tr>
                  <th>شهر</th>
                  <th>آدرس</th>
                  <th>نمره</th>
                  <th>تعداد خرید</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{detailsData.city}</td>
                  <td>{detailsData.address}</td>
                  <td>{detailsData.score}</td>
                  <td>{detailsData.buy}</td>
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
                  <input type="text" placeholder="نام جدید را وارد کنید" className="edit-product-input" 
                  value={newFirst}
                  onChange={(ev) => setNewFirst(ev.target.value)}
                  />
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <input type="text" placeholder="نام خانوادگی را وارد کنید" className="edit-product-input" 
                  value={newLast}
                  onChange={(ev) => setNewLast(ev.target.value)}
                  />
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <input type="text" placeholder="یوزرنیم جدید را وارد کنید" className="edit-product-input" 
                  value={newUserName}
                  onChange={(ev) => setNewUserName(ev.target.value)}
                  />
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <input type="text" placeholder="پسورد جدید را وارد کنید" className="edit-product-input" 
                  value={newPassword}
                  onChange={(ev) => setNewPassword(ev.target.value)}
                  />
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <input type="text" placeholder="شماره جدید را وارد کنید" className="edit-product-input" 
                  value={newPhone}
                  onChange={(ev) => setNewPhone(ev.target.value)}
                  />
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <input type="text" placeholder="ایمیل جدید را وارد کنید" className="edit-product-input" 
                  value={newEmail}
                  onChange={(ev) => setNewEmail(ev.target.value)}
                  />
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <input type="text" placeholder="شهر جدید را وارد کنید" className="edit-product-input" 
                  value={newCity}
                  onChange={(ev) => setNewCity(ev.target.value)}
                  />
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <textarea type="text" placeholder="آدرس جدید را وارد کنید" className="edit-product-input" 
                  value={newAdres}
                  onChange={(ev) => setNewAdres(ev.target.value)}
                  >
                    </textarea>
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <input type="text" placeholder="نمره جدید کاربر را وارد کنید" className="edit-product-input" 
                  value={newScore}
                  onChange={(ev) => setNewScore(ev.target.value)}
                  />
                </div>
                <div className="edit-proructs-form-group">
                  <span>
                    <AiOutlineDollarCircle />
                  </span>
                  <input type="text" placeholder="تعداد خرید جدید کاربر را وارد کنید" className="edit-product-input" 
                  value={newBuy}
                  onChange={(ev) => setNewBuy(ev.target.value)}
                  />
                </div>


              </EditModal>}
    </div>


  );
}
