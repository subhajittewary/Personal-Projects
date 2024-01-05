import React, { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  productCreate,
  productList,
} from "../acions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import LinkContainer from "react-router-bootstrap/lib/LinkContainer";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
  PRODUCT_DETAILS_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";
import swal from "sweetalert";
import { useGetProductListQuery } from "../services/api/productsApi";


const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();
 
  const {isLoading: loading, error, data: products} = useGetProductListQuery();
  console.log("products",products)

  const { product: createdProduct, success } = useSelector(
    (state) => state.productCreate
  );

  const { success: successDeleted } = useSelector(
    (state) => state.productDelete
  );

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch({ type: PRODUCT_UPDATE_RESET });
    dispatch({ type: PRODUCT_DETAILS_RESET });
    if (success) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(productList());
    }
    if (successDeleted) {
      swal("Success!", "You have deleted the product!", "success");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
  }, [dispatch, success, history, createdProduct, successDeleted]);
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch(productCreate());
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus">Create Product</i>
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
//the this keyword refers to the object that the function is a property of...
