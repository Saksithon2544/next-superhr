import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function about() {

  async function getPosts() {
    try {
      const res = await axios.get('/api/user')
      const data = await res.data

      console.log(data)
    } catch (error) {

    }
  }


  useEffect(() => {
    getPosts()
  }, [])


  return (
    <div>about</div>
  )
}
