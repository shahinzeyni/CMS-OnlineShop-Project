import React, { useEffect, useState } from "react";
import ErrorBox from "../Errorbox/Errorbox";
import DeleteModal from "../DeleteModal/DeleteModal"
import DetailsModal from "../DetailsModal/DetailsModal";
import EditModal from "../EditModal/EditModal";
import {AiOutlineDollarCircle} from 'react-icons/ai'

import "./Users.css";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [isShowDeleteUserModal, setIsShowDeleteUserModal] = useState(false);
  const [userID,setUserID] = useState("")  
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [detailModal, setDetailModal] = useState({});
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [editFirsname, setEditFirsname] = useState("");
  const [editlastname, setEditlastname] = useState("");
  const [editusername, setEditusername] = useState("");
  const [editpassword, setEditpassword] = useState("");
  const [editphone, setEditphone] = useState("");
  const [editcity, setEditcity] = useState("");
  const [editemail, setEditemail] = useState("");
  const [editaddress, setEditaddress] = useState("");
  const [editscore, setEditscore] = useState("");
  const [editbuy, setEditbuy] = useState("");


  
  

  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllUsers = () => {
    fetch(`http://localhost:8000/api/users`)
    .then((res) => res.json())
    .then((users) => setUsers(users));
  }


  console.log(users);

  const submitDeleteUserModal = () => {

    fetch(`http://localhost:8000/api/users/${userID}`, {
      method: "DELETE"
    }).then(res => res.json())
    .then(result => {
      setIsShowDeleteUserModal(false)
      getAllUsers()
    })
  }

  const cancelDeleteUserModal = () => {
    setIsShowDeleteUserModal(false)
  }

  const cancelDetailModal = () => {
    setIsShowDetailModal(false)
  }

  const submitEditModal = (event) => {
    event.preventDefault()
    const NewEditUser = {
      firsname: editFirsname,
      lastname: editlastname,
      username: editusername,
      password: editpassword,
      phone: editphone,
      city: editcity,
      email: editemail,
      address: editaddress,
      score: editscore,
      buy: editbuy
    };
    fetch(`http://localhost:8000/api/users/${userID}`,{
      method:"PUT",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(NewEditUser)
    }).then(res => res.json())
    .then(result => {
      console.log(result);
      setIsShowEditModal(false)
      getAllUsers()
    })
  }


  const cancelEditModal = () => {
    setIsShowEditModal(false)
  }

  return (
    <div className="cms-main">
      <h1 className="cms-title">لیست کاربران</h1>

      {users.length ? (
        <table className="cms-table">
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>رمز عبور</th>
              <th>شماره تماس</th>
              <th>ایمیل</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {user.firstname} {user.lastname}
                </td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                
                  <div className="btns">
                    <button
                      onClick={() => {
                        setIsShowDeleteUserModal(true);
                        setUserID(user.id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setIsShowDetailModal(true);
                        setDetailModal(user);
                      }}
                    >
                      جزییات
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditModal(true);
                        setUserID(user.id);
                        setEditFirsname(user.firsname);
                        setEditlastname(user.lastname);
                        setEditusername(user.username);
                        setEditpassword(user.password);
                        setEditphone(user.phone);
                        setEditcity(user.city);
                        setEditemail(user.email);
                        setEditaddress(user.address);
                        setEditscore(user.score);
                        setEditbuy(user.buy);
                      }}
                    >
                      ویرایش
                    </button>
                    
                  </div>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ErrorBox msg="هیچ کاربری یافت نشد" />
      )}

      {isShowDeleteUserModal && (
        <DeleteModal
          title="آیا از حذف اطمینان دارید؟"
          submitAction={submitDeleteUserModal}
          cancelAction={cancelDeleteUserModal}
        ></DeleteModal>
      )}

      {isShowDetailModal && (
        <DetailsModal onHide={cancelDetailModal}>
          <table className="cms-table">
            <thead>
              <tr className="detail-tr">
                <th className="detail-th">نام و نام خانوادگی</th>
                <th className="detail-th">آدرس</th>
                <th className="detail-th">نمره </th>
                <th className="detail-th">شهر</th>
                <th className="detail-th">ایمیل</th>
                <th className="detail-th">خرید</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  {detailModal.firsname}
                  {detailModal.lastname}
                </td>
                <td>{detailModal.address}</td>
                <td>{detailModal.score}</td>
                <td>{detailModal.city}</td>
                <td>{detailModal.email}</td>
                <td>{detailModal.buy}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}

      {isShowEditModal && (
        <EditModal onClose={cancelEditModal} onSubmit={submitEditModal}>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
              value={editFirsname}
              onChange={(event) => setEditFirsname(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="قیمت جدید را وارد کنید"
              className="edit-product-input"
              value={editlastname}
              onChange={(event) => setEditlastname(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="موجودی جدید را وارد کنید"
              className="edit-product-input"
              value={editusername}
              onChange={(event) => setEditusername(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="آدرس کاور جدید را وارد کنید"
              className="edit-product-input"
              value={editpassword}
              onChange={(event) => setEditpassword(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="محبوبیت جدید را وارد کنید"
              className="edit-product-input"
              value={editphone}
              onChange={(event) => setEditphone(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="میزان فروش جدید را وارد کنید"
              className="edit-product-input"
              value={editcity}
              onChange={(event) => setEditcity(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="تعداد رنگ بندی جدید را وارد کنید"
              className="edit-product-input"
              value={editemail}
              onChange={(event) => setEditemail(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="میزان فروش جدید را وارد کنید"
              className="edit-product-input"
              value={editaddress}
              onChange={(event) => setEditaddress(event.target.value)}
            />
          </div>
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="میزان فروش جدید را وارد کنید"
              className="edit-product-input"
              value={editscore}
              onChange={(event) => setEditscore(event.target.value)}
            />
          </div>{" "}
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="میزان فروش جدید را وارد کنید"
              className="edit-product-input"
              value={editbuy}
              onChange={(event) => setEditbuy(event.target.value)}
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}

