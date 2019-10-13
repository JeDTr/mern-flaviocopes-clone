import React from 'react'
import { Link } from 'react-router-dom'

import './Dashboard.css'

const Dashboard = () => (
  <div>
    <h1 className='text-center'>Dashboard</h1>
    <div className='text-center'>
      <Link to='/' className='btn bg-gray'>
        Blog Page
      </Link>
      <Link to='/create-post' className='btn bg-green'>
        Create Post
      </Link>
      <Link to='/create-tag' className='btn bg-green'>
        Create Tag
      </Link>
    </div>
  </div>
)

export default Dashboard
