import React,{useState,useEffect} from 'react'
import {Link, useLocation,useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import {login} from '../action/userActions.js'

const LoginScreen = () => {
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userLogin = useSelector(state=>state.userLogin)
    const {loading,error,userInfo}=userLogin
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/login';

    useEffect(() => {
      if (userInfo) {
       navigate(redirect)
      }
    }, [navigate,userInfo, redirect]);


    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>PassWord </Form.Label>
            <Form.Control type='password' placeholder='Enter PassWord' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' >Sign In</Button>
      </Form>
      <Row className='py-3'>
        <Col>
        New Customer? <Link to={redirect? `/register?redirect=${redirect}`:'/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
