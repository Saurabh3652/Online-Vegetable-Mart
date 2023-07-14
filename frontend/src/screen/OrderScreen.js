import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
// import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../action/orderAction.js';

const OrderScreen = () => {
  
  const orderId =useParams()
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const orderDetails=useSelector(state=>state.orderDetails)
  const {order,loading,error}=orderDetails

  useEffect(()=>{
    dispatch(getOrderDetails(orderId))
  },[orderId,dispatch])


  return loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>:
  <>
    <h1>Order {order._id}</h1>
    <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p><strong>Name : </strong>{order.user.name}</p>
               <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddressFromStorage.address}, {cart.shippingAddressFromStorage.city}{' '}
                {cart.shippingAddressFromStorage.postalCode},{' '}
                {cart.shippingAddressFromStorage.country}
              </p>
              {order.isDelivered?<p className='text-success'>Piad On{order.deliveredAt}</p>:
              <p className='text-danger'>Not Delivered</p>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
              <strong>Method: </strong>
              {order.paymentMethod}
              </p>
              {order.isPaid?<p className='text-success'>Piad On{order.paidid}</p>:
              <p className='text-danger'>Not Paid</p>}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {/* {error && <Message variant='danger'>{error}</Message>} */}
              </ListGroup.Item>
              <ListGroup.Item>{error && <Message variant='danger'>{error}</Message>} </ListGroup.Item>
              <ListGroup.Item>
                {/* {isLoading && <Loader />} */}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
  </>
};

export default OrderScreen;