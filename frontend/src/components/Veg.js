import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Rating from  '../components/Rating'

const Veg = ({veg}) => {
  
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/veg/${veg._id}`}>
      <Card.Img src={veg.image} variant='top'/>
      </Link>
      <Card.Body>
        <Link to={`/veg/${veg._id}`}>
        <Card.Title as='div'> <strong>{veg.name}</strong> </Card.Title>
        </Link>
        <Card.Text as ='div'>
            <Rating value={veg.rating} text={`${veg.numreviews}`}/>
        </Card.Text>
        <Card.Text className='h3'>
            ${veg.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Veg
