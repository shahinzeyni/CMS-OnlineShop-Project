import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import ErrorBox from "../Errorbox/Errorbox";
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";

import "./Comments.css";
export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [commentDetailObj, setCommentDetailObj] = useState({});
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [commentID, setCommentID] = useState("");
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [bodyEditComment, setBodyEditComment] = useState("");
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);

  useEffect(() => {
    getAllComments();
  },[]);

  const getAllComments = () => {
    fetch("http://localhost:8000/api/comments/")
      .then(res => res.json())
      .then(commentsDATA => setAllComments(commentsDATA));
  };

  const onCloseDetailModal = () => {
    setIsShowDetailModal(false);
  };

  const cancelActionModal = () => {
    setIsShowDeleteModal(false);
  };
  const submitActionModal = () => {
    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        setIsShowDeleteModal(false);
        getAllComments();
      });
  };

  const cancelActionEditModal = event => {
    event.preventDefault();
    setIsShowEditModal(false);
  };

  const submitActionEditModal = event => {
    event.preventDefault();

    const NewBodyTitle = {
      body: bodyEditComment
    };

    fetch(`http://localhost:8000/api/comments/${commentID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(NewBodyTitle)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setIsShowEditModal(false);
      });
  };

  const closeConfirmModal = () => {
    setIsShowConfirmModal(false);
  };

  const submitConfirmModal = () => {
    fetch(`http://localhost:8000/api/comments/accept/${commentID}`, {
      method: "POST"
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowConfirmModal(false);
      });
  };

  const closeRejectModal = () => {
    setIsShowRejectModal(false);
  };

  const submitRejectModal = () => {
    fetch(`http://localhost:8000/api/comments/reject/${commentID}`, {
      method: "POST"
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsShowRejectModal(false);
      });
  };



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
                        setIsShowDeleteModal(true);
                        setCommentID(comment.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setBodyEditComment(comment.body);
                        setCommentID(comment.id);
                      }}
                    >
                      ویرایش
                    </button>
                    <button>پاسخ</button>

                    {comment.isAccept === 0 ? (
                      <button
                        onClick={() => {
                          setIsShowConfirmModal(true);
                          setCommentID(comment.id);
                        }}
                      >
                        تایید
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsShowRejectModal(true);
                          setCommentID(comment.id);
                        }}
                      >
                        رد
                      </button>
                    )}
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
              title="آیا از حذف اطمینان دارید؟"
              submitAction={submitActionModal}
              cancelAction={cancelActionModal}
            />
          )}

          {isShowEditModal && (
            <EditModal
              onClose={cancelActionEditModal}
              onSubmit={submitActionEditModal}
            >
              <textarea
                className="textAreaComment"
                cols="30"
                rows="1"
                value={bodyEditComment}
                onChange={(event) => setBodyEditComment(event.target.value)}
              />
            </EditModal>
          )}

          {isShowConfirmModal && (
            <DeleteModal
              title="آیا از تایید اطمینان دارید؟"
              submitAction={submitConfirmModal}
              cancelAction={closeConfirmModal}
            />
          )}

          {isShowRejectModal && (
            <DeleteModal
              title="آیا از رد اطمینان دارید؟"
              submitAction={submitRejectModal}
              cancelAction={closeRejectModal}
              

            />
          )}

          
        </table>
      </div>
    </div>
  );
}
