import React, { useEffect, useState } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import './Comments.css'
import DetailsModal from "./../DetailsModal/DetailsModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from './../EditModal/EditModal'


export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetails , setIsshowDetails] = useState(false)
  const [dataDetils , setDataDetils] = useState('')
  const [isShowDelet , setIsShowDelet] = useState(false)
  const [commentId , setCommentId] = useState(null)
  const [isShowEdit , setIsShowEdit] = useState(false)
  const [dataEditComment , setDataEditComment] = useState(null)
  const [isShowAccpt , setIsShowAccept] = useState(false)
  const [isShowReject , setIsShowReject] = useState(false)


  const sendOnCloseEdit = () => setIsShowEdit(false)

  const sendCancelActionAccept = ()=> setIsShowAccept(false)

  const sendCancelActionReject = ()=> setIsShowReject(false)

  const sendSubmitReject = ()=> {
    console.log('رد کامنت با موفقیت انجام شد');
    fetch(`http://localhost:8000/api/comments/reject/${commentId}`, {
      method: 'Post'
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setIsShowReject(false)
      fetchData()
    })
  }

  const sendonHide = ()=> {
    setIsshowDetails(false)
  }

  const sendSubmitAccept = ()=> {

    fetch(`http://localhost:8000/api/comments/accept/${commentId}`, {
      method: "POST",
    }).then(result => result.json())
    .then( (res) => {
      console.log(res);
      setIsShowAccept(false);
      fetchData()
    })
   
  }

  const sendCanselAction = () => {
    setIsShowDelet(false)
  }

  const senOnSubmitEdit = (event) => {
    event.preventDefault()

    fetch(`http://localhost:8000/api/comments/${commentId}` , {
      method: 'Put',
      headers: {
        "Content-type" : "application/json"
      } ,
      body : JSON.stringify({
        body : dataEditComment
      })
    }).then( (result) => result.json())
    .then((res) => {
      setIsShowEdit(false);
      fetchData()
    })
    
  }

  const sendCancelAction = () => {
    
    fetch(`http://localhost:8000/api/comments/${commentId}` , {
      method: 'Delete'
    }).then( result => result.json())
    .then( res => {
      setIsShowDelet(false)
      fetchData()
    }
    )
    
    setIsShowDelet(false)
  }
  useEffect(() => {
     fetchData()  
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8000/api/comments")
    .then((res) => res.json())
    .then((comments) => setAllComments(comments));
  }

  return (
    <div className="cms-main">
      {allComments.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>اسم کاربر</th>
              <th>محصول</th>
              <th>کامنت</th>
              <th>تاریخ</th>
              <th>ساعت</th>
            </tr>
          </thead>

          <tbody>
            {allComments.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.userID}</td>
                <td>{comment.productID}</td>
                <td>
                  <button className="button-class"
                  onClick={()=> {
                    setIsshowDetails(true)
                    setDataDetils(comment.body)
                  }}
                  >دیدن متن</button>
                </td>
                <td>{comment.date}</td>
                <td>{comment.hour}</td>
                <td>
                  <button className="button-class" onClick={()=> {
                    setIsShowDelet(true)
                    setCommentId(comment.id)
                  }}>حذف</button>
                  <button className="button-class" onClick={ () => {
                     setIsShowEdit(true)
                     setDataEditComment(comment.body)
                     setCommentId(comment.id)
                  }}>ویرایش</button>
                  <button className="button-class">پاسخ</button>
                  { comment.accept === 0 ? (
                   <button className="button-class" onClick={ () => {
                    setIsShowAccept(true)
                    setCommentId(comment.id)
                  }}>تایید</button>
                  ) : 
                  (
                    <button className="button-class" onClick={ () => {
                     setIsShowReject(true)
                     setCommentId(comment.id)
                   }}>رد کامنت</button>
                   )
                  }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      ) : (
        <ErrorBox msg="هیچ کامنتی یافت نشد" />
      )}

        {isShowDetails && 
          <DetailsModal onHide={sendonHide}>
            <h5>{dataDetils}</h5>
            <button onClick={() => setIsshowDetails(false)} className="text-modal-close-btn">بستن</button>
          </DetailsModal>
        }

        {
          isShowDelet && 
          <DeleteModal cancelAction={sendCancelAction} submitAction={sendCancelAction} >

          </DeleteModal>
        }

        { isShowEdit && 
         <EditModal onClose={sendOnCloseEdit}  onSubmit={senOnSubmitEdit}>
            <textarea name="" id="" value={dataEditComment} onChange={(ev) => setDataEditComment(ev.target.value)}></textarea>
         </EditModal>
        }

        {isShowAccpt && 
        <DeleteModal title={"آیا از حذف کامنت اطمینان دارید؟"} submitAction={sendSubmitAccept} cancelAction={sendCancelActionAccept}>

        </DeleteModal>
        }

       {isShowReject && 
        <DeleteModal title={"آیا از رد کامنت اطمینان دارید؟"} submitAction={sendSubmitReject} cancelAction={sendCancelActionReject}>

        </DeleteModal>
        } 
    </div>
  );
}
