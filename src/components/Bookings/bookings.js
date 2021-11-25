import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
const Bookings = () => {

    const [bookings,setBookings] = useState([]);
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    useEffect(()=>{
        // fetch(`https://vast-sands-78362.herokuapp.com/bookings?email`+loggedInUser.email,{
        //     method:'GET',
        //     headers:{"Content-Type":"application/json"},
        //     authorization:`Bearer ${sessionStorage.getItem('token')}`  ,  
        // })
        fetch('https://vast-sands-78362.herokuapp.com/bookings?email='+loggedInUser.email,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`,
            }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
    },[loggedInUser.email]);
   

    console.log(bookings);

    return (
        <div>
            <h1>You have : {bookings.length} Bookings</h1>
            {
                bookings.map(booking => <li> key={booking._id} Name : {booking.name} From : {new Date(booking.checkIn).toDateString('dd/MM/yy')} To : {new Date(booking.checkOut).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;