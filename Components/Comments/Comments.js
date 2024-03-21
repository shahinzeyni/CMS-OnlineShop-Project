import React, { useEffect, useState } from 'react'
import DeleteModal from '../DeleteModal/DeleteModal'
import ErrorBox from '../Errorbox/Errorbox'
import DetailsModal from "../DetailsModal/DetailsModal"



export default function Comments() {
  const [allComments,setAllComments] = useState([])
  const [isShowDetailModal,setIsShowDetailModal] = useState(false)
  const [commentDetailObj,setCommentDetailObj] = useState({})
  const [isShowDeleteModal,setIsShowDeleteModal] = useState(false)
  const [commentID,setCommentID] = useState("")

  useEffect(() => {
    getAllComments()
  })

  const getAllComments = () =>{
    fetch("http://localhost:8000/api/comments/")
    .then(res => res.json())
    .then(commentsDATA => setAllComments(commentsDATA))
  }

  const onCloseDetailModal = () => {
    setIsShowDetailModal(false)
  }

  const cancelActionModal = () => {
    setIsShowDeleteModal(false)
  }
  const submitActionModal= () => {
    fetch(`http://localhost:8000/api/comments/${commentID}`,{
      method:"DELETE"
    }).then(res => res.json())
    .then(result => {
      setIsShowDeleteModal(false)
      getAllComments()
    })
  }

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کامنت‌ها</h1>
      <div className="cms-main">
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
          {allComments.length ? (
            <tbody>
              {allComments.map((comment) => (
                <tr key={comment.id}>
                  <td>{comment.userID}</td>
                  <td>{comment.productID}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDetailModal(true);
                        setCommentDetailObj(comment);
                      }}
                    >
                      دیدن متن
                    </button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td>
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true)
                        setCommentID(comment.id);
                      }}
                    >
                      حذف
                    </button>
                    <button>ویرایش</button>
                    <button>پاسخ</button>
                    <button>تایید</button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <ErrorBox msg="هیچ کامنتی یافت نشد" />
          )}
          {isShowDetailModal && (
            <DetailsModal onHide={onCloseDetailModal}>
              <table className="cms-table">
                <p style={{ marginBottom: 30 }}>
                  {commentDetailObj.userID}: {commentDetailObj.body}
                </p>
              </table>
            </DetailsModal>
          )}

          {isShowDeleteModal && (
            <DeleteModal
              submitAction={submitActionModal}
              cancelAction={cancelActionModal}
            />
          )}
        </table>
      </div>
    </div>
  );
}
