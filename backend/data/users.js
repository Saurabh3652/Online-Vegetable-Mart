import bcrypt from 'bcryptjs'
const users =[
    {
        name:"Farmer User",
        email:'farmer@example.com',
        password:bcrypt.hashSync('123456',10),
        isFarmer:true
    },
    {
        name:"Saurabh patel",
        email:'saurabh@example.com',
        password:bcrypt.hashSync('123456',10)
    },
    {
        name:"Vinay",
        email:'vinay@example.com',
        password:bcrypt.hashSync('123456',10)
    },
]

export default users