import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useQuery } from "../hooks";
import { useGetProductListQuery } from "../services/api/productsApi";
// import { productList } from "../acions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  let query = useQuery();
  let productName = query.get("searchitem");
  let { isLoading: loading, isError: error, data: products } = useGetProductListQuery(productName);
  if (!products) {
    error = "No Product Found";
  }
  // console.log("productName", productName)
  //    let { isLoading: loadingSearch, isError: errorSearch, data: productsSearch } = useGetProductByNameQuery(productName);

  // if (productName) {
  //   products = productsSearch;
  // }

  // if(!loading) {
  //   dispatch(productList())
  // }
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <h1>
          <Loader />
        </h1>
      ) : error ? (
        <Message>{error} </Message>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}

          {/* {productsSearch &&
            productsSearch.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={products} />
              </Col>
            ))} */}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
