import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';
import axios from 'axios';
const baseurl="http://localhost:8000/api/user"

function Form() {

    const location =useLocation()
    console.log("location",location)

    const verifyToken=async()=>{
        const {token ,id} = queryString.parse(location.search);
    //   const {data} = await axios(`${baseurl}/verify-token?token=${token}&id=${id}`)
    //   console.log("data",data)
    }

    useEffect(()=>{
        verifyToken()
    },[])

  return (
    <div>
        <h3>Reset password</h3>
        <input type='password' placeholder='******'/>
        <br/>
        <input type='password' placeholder='******'/>
        <br/>
        <input type="submit" value="reset password" />
    </div>
  )
}

export default Form