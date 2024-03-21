import React,{useState,useEffect} from "react";
import Errorbox from "../Errorbox/Errorbox";
import AddNewProduct from "../AddNewProduct/AddNewProduct";
import ProductsTable from "../ProductsTable/ProductsTable";
import DeleteModal from "../DeleteModal/DeleteModal";

export default function Products() {
  const [allProducts,setAllProducts] = useState([])
  useEffect(() => {
      
    getAllProducts()
  },[])

  const getAllProducts = () => {
    fetch("http://localhost:8000/api/products/")
    .then((res) => res.json())
    .then((productData) => {
      setAllProducts(productData)
      console.log(productData);
    });
  }

  return (
    <>
      <AddNewProduct getAllProducts={getAllProducts} />
      <ProductsTable getAllProducts={getAllProducts} allProducts={allProducts} />
      {/* <DeleteModal/> */}
    </>
  );
}
