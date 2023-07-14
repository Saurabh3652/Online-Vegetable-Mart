import React,{useState,useEffect} from 'react'
import {Link, useLocation,useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import FormContainer from '../components/FormContainer.js'
import {login, register} from '../action/userActions.js'

const RegisterScreen = () => {
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    const [password,setPassword] =useState('')
    const [confirmpassword,setconfirmPassword] =useState('')
    const [msg,setMsg] =useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userRegister = useSelector(state=>state.userRegister)
    const {loading,error,userInfo}=userRegister
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/register';

    useEffect(() => {
      if (userInfo) {
       navigate(redirect)
      }
    }, [navigate,userInfo, redirect]);


    const submitHandler=(e)=>{
        e.preventDefault()
        //dispatch register
        if(password!==confirmpassword)
        {
            setMsg('Password do not matched')
        }
        else{
            dispatch(register(name,email,password))
        }
    }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {
        msg && <Message variant='danger'>{msg}</Message>
      }
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader/>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
            <Form.Label>PassWord </Form.Label>
            <Form.Control type='password' placeholder='Enter PassWord' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm PassWord </Form.Label>
            <Form.Control type='password' placeholder='Enter PassWord' value={confirmpassword} onChange={(e)=>setconfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' >Sign In</Button>
      </Form>
      <Row className='py-3'>
        <Col>
        Already have an Account? <Link to={redirect? `/login?redirect=${redirect}`:'/login'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
