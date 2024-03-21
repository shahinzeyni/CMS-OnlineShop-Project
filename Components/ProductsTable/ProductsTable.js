import React,{useEffect, useState} from 'react'
import DeleteModal from '../DeleteModal/DeleteModal';
import DetailsModal from '../DetailsModal/DetailsModal';
import EditModal from '../EditModal/EditModal';
import Errorbox from '../Errorbox/Errorbox';
import {AiOutlineDollarCircle} from 'react-icons/ai'


import './ProductsTable.css'

export default function ProductsTable({getAllProducts ,allProducts}) {
    const [isShowModal,setIsShowModal] = useState(false)
    const [isShowDetailModal,setIsShowDetailModal] = useState(false)
    const [isShowEditModal,setIsShowEditModal] = useState(false)
    
    const [productId,setProductId] = useState(null)
    const [productDetailObj,setProductDetailObj] = useState({})


    const [productNewTitle, setProductNewTitle] = useState("");
    const [productNewPrice, setProductNewPrice] = useState("");
    const [productNewCount, setProductNewCount] = useState("");
    const [productNewImg, setProductNewImg] = useState("");
    const [productNewPopularity, setProductNewPopularity] = useState("");
    const [productNewSale, setProductNewSale] = useState("");
    const [productNewColors, setProductNewColors] = useState("");
    

    

    const deleteModalCancelAction = () => {
        setIsShowModal(false)
        console.log('Cancel Clicked!');
    }

    const deleteModalSubmitAction = () => {
        fetch(`http://localhost:8000/api/products/${productId}`, {
          method: "DELETE"
        }).then((res) => res.json())
        .then(result => {
          setIsShowModal(false)
          getAllProducts()

        })
        // setIsShowModal(false)
        console.log('Submit Clicked!')
    }

    
    const closeDetialModal = () => {
        setIsShowDetailModal(false)
    }

    const updateProductInfos = (event) => {
      event.preventDefault()

      const NewUpdateProduct = {
        title: productNewTitle,
        price:productNewPrice,
        count:productNewCount,
        img:productNewImg,
        popularity:productNewPopularity,
        sale:productNewSale,
        colors:productNewColors
      }

      fetch(`http://localhost:8000/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(NewUpdateProduct)
      }).then((res) => res.json())
      .then(result => {
        console.log(result)
        console.log('object');
        getAllProducts()
        setIsShowEditModal(false)
      })
    }

    console.log(allProducts);
  return (
    <>
      {allProducts.length ? (
        <table className="products-table">
          <thead>
            <tr className="products-table-heading-tr">
              <th>عکس</th>
              <th>اسم</th>
              <th>قیمت</th>
              <th>موجودی</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr className="products-table-tr" key={product.id}>
                <td>
                  <img
                    src={product.img}
                    alt="oil image"
                    className="products-table-img"
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price} تومان</td>
                <td>{product.count}</td>
                <td>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowDetailModal(true);
                      setProductDetailObj(product);
                    }}
                  >
                    جزییات
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowModal(true);
                      setProductId(product.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="products-table-btn"
                    onClick={() => {
                      setIsShowEditModal(true);

                      setProductId(product.id);

                      setProductNewTitle(product.title);
                      setProductNewPrice(product.price);
                      setProductNewCount(product.count);
                      setProductNewImg(product.img);
                      setProductNewPopularity(product.popularity);
                      setProductNewSale(product.sale);
                      setProductNewColors(product.colors);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Errorbox mag="محصولی یافت نشد! " />
      )}
      {isShowModal && (
        <DeleteModal
          cancelAction={deleteModalCancelAction}
          submitAction={deleteModalSubmitAction}
        />
      )}
      {isShowDetailModal && (
        <DetailsModal  onHide={closeDetialModal}>
          <table className="cms-table">
            <thead>
              <tr className="detail-tr">
                <th className="detail-th">محبوبیت</th>
                <th className="detail-th">فروش</th>
                <th className="detail-th">رنگ بندی</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{productDetailObj.popularity}</td>
                <td>{productDetailObj.sale}</td>
                <td>{productDetailObj.colors}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>
      )}
      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updateProductInfos}
        >
          <div className="edit-proructs-form-group">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="edit-product-input"
              value={productNewTitle}
              onChange={(event) => setProductNewTitle(event.target.value)}
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
              value={productNewPrice}
              onChange={(event) => setProductNewPrice(event.target.value)}
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
              value={productNewCount}
              onChange={(event) => setProductNewCount(event.target.value)}
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
              value={productNewImg}
              onChange={(event) => setProductNewImg(event.target.value)}
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
              value={productNewPopularity}
              onChange={(event) => setProductNewPopularity(event.target.value)}
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
              value={productNewSale}
              onChange={(event) => setProductNewSale(event.target.value)}
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
              value={productNewColors}
              onChange={(event) => setProductNewColors(event.target.value)}
            />
          </div>
        </EditModal>
      )}
    </>
  );
}