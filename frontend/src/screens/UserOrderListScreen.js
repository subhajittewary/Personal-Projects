import React from "react";
import { Col, Row, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetOrderListQuery } from "../services/api/ordersApi";


const UserOrderListScreen = () => {

  const { isLoading: loading, error, data: orders } = useGetOrderListQuery();
  console.log("orders", orders)


  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Delivered</th>
              <th>Paid</th>
              <th>Price Total</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                  <td>{order.isPaid? 'Yes' : 'No'}</td>
                  <td>{order.totalPrice}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserOrderListScreen;
//the this keyword refers to the object that the function is a property of...
