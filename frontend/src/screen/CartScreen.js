import React,{useState,useEffect} from 'react'
import {Link, Navigate, useParams} from 'react-router-dom'
import { Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'
import { addToCart ,removeFromCart} from '../action/cartActions'

const CartScreen = () => {
  const {id} =useParams()
  const qty = useParams().qty || 1;
  const dispatch =useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state=>state.cart)
  const {cartItems} = cart
  useEffect(()=>{
    console.log("id in effect")
    console.log(id)
    if(id){
        dispatch(addToCart(id,qty))
    }
  },[dispatch])
  
  const removeFromCartHnadler=(id)=>{
    dispatch(removeFromCart(id))
  }
  const checkoutHandler=()=>{
    navigate(`/shipping`)
  }
  console.log('cartItems')
  console.log(cartItems)
  return (
    <Row>
      <Col md={8}>
        <h1>My Cart</h1>
        {cartItems.length === 0 ? <Message >Cart is Empty<Link to='/'>Go Bcak</Link></Message>:
        (
            <ListGroup variant='flush'>
                {cartItems.map(item =>(
                    <ListGroupItem key={item.veg}>
                        <Row>
                            <Col md ={2}>
                                <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col md ={3}>
                                <Link to={`/api/veg/${item.veg}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>${item.price}</Col>
                            <Col md={2}>
                            <Form.Control as='select' value={item.qty} onChange={(e)=>dispatch(addToCart(item.veg,e.target.value))}>
                                {
                                [...Array(item.countInStock).keys()].map((x) => (
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                ))
                            }
                            </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type ='button' variant='light' onClick={()=> removeFromCartHnadler(item.veg)}> <i className='fas fa-trash'></i></Button>
                               
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))}
            </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>SubTotal({cartItems.reduce((acc,item)=> acc+item.qty,0)}) items</h2>
                    ${cartItems.reduce((acc,item)=> acc + item.qty*item.price,0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button type='button' className='btn-block' disabled={cartItems.length===0} onClick={checkoutHandler}>
                        Buy
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </Col>
    </Row>
  )
}

export default CartScreen
