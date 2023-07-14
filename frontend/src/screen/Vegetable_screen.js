import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button,Form} from 'react-bootstrap'
import Rating from '../components/Rating.js'
import { listVegDetails } from '../action/vegAction.js'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader.js'
import Message from '../components/Message.js'
import { useNavigate } from 'react-router-dom';

const Vegetable_screen = ({history}) => {
    
    const navigate = useNavigate();
    const [qty,setqty] =useState(1)
    const {id} = useParams()
    const dispatch = useDispatch()
    const vegDetail = useSelector(state => state.vegDetail)
    console.log(id)
    const {loading , error ,veg} = vegDetail
    console.log("veg is ")
    console.log(veg)
    useEffect(()=>{
        dispatch(listVegDetails({id}))
      },[dispatch])
    console.log(qty)
    const addToCartHandler=(id,qty)=>{
        console.log("in func ")
        console.log(qty)
        navigate(`/cart/${id}?qty=${qty}`);
    };
  return (
    <>
   <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
   
    {loading ? <Loader/> : error?<Message variant ='danger'>{error}</Message>:(
        <Row>
        <Col md ={6}>
        <Image src={veg.image} alt={veg.name} fluid/>
    </Col>
    <Col md={3}>
<ListGroup variant='flush'>
    <ListGroup.Item>
        <h3>{veg.name}</h3>
    </ListGroup.Item>
    <ListGroup.Item>
        <Rating value={veg.rating} text={`${veg.numreviews} reviews`}/>
    </ListGroup.Item>
    <ListGroup.Item>
        Price : ${veg.price}
    </ListGroup.Item>
    <ListGroup.Item>
        Description : {veg.description}
    </ListGroup.Item>
</ListGroup>
    </Col>
    <Col md={3}>
        <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>
                        Price : 
                        </Col>
                        <Col>
                         <strong>${veg.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>
                        Status : 
                        </Col>
                        <Col>
                        {veg.countInStock >0 ? 'In stock' :'Out of stock'}
                        </Col>
                    </Row>
                </ListGroup.Item>
                {veg.countInStock>0 && (
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            <Form.Control as='select' value={qty} onChange={(e)=>setqty(e.target.value)}>
                                {
                                [...Array(veg.countInStock).keys()].map((x) => (
                                    <option key={x+1} value={x+1}>{x+1}</option>
                                ))
                            }
                            </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}
                <ListGroup.Item>
                    <Button className='btn-block' type='button' disabled={veg.countInStock === 0}
                    onClick={()=>addToCartHandler(id, qty)}>
                        Add To Cart
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    </Col>
   </Row>
    )}


   </>
  )
}

export default Vegetable_screen
