import React,{useState, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Veg from '../components/Veg'
import {useDispatch,useSelector} from 'react-redux'
import { listVeg } from '../action/vegAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
const HomeScreen = () => {

  const dispatch=useDispatch()

  const vegList = useSelector(state=> state.vegList)
  const{loading,error,vegies}=vegList


  useEffect(()=>{
    dispatch(listVeg())
  },[dispatch])

  // const veg = []
  console.log("home screen ")
  return (
    
    <>
      <h1>Fresh Vegies </h1>
      {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:<Row>
      {console.log("array is ")}
      {console.log(vegies)}
        {vegies.map((veg)=>(
            <Col key={veg._id} sm={12} lg={4} md={6} xl={3}>
                <Veg veg={veg}/>
            </Col>
        ))}
      </Row>}
      
    </>
  )
}

export default HomeScreen
