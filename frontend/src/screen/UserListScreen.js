import React,{useState,useEffect} from 'react'
import {Link, useLocation,useNavigate} from 'react-router-dom'
import {Form,Button,Row,Col, Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import {LinkContainer} from 'react-router-bootstrap'
import { listUsers ,deleteUsers} from '../action/userActions.js'

const UserListScreen = () => {
    const dispatch = useDispatch()

    const userList = useSelector((state)=>state.userList)
    const {loading ,error,users} =userList

    const userDelete = useSelector((state)=>state.userDelete)
    const {success:successDelete} =userDelete

    useEffect(()=>{
        dispatch(listUsers())
    },[dispatch,successDelete])

    const deleteHandler= (id) =>{
        dispatch(deleteUsers(id))
    }
  return (
    <>
      <h1>Costomers</h1>
      {loading ?<Loader/> : error  ?<p className='danger'>{error}</p>
      :(
        <Table className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>{user.isFarmer ? (<i className='fas fa-check' style={{color:'blue'}}></i>) : (
                                <i className='fas fa-times' style={{color:'red'}}></i>
                            )}</td>
                            <td>
                            <td>
                                <LinkContainer to={`/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                    <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                </td>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
