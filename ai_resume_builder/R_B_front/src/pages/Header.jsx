import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className='flex justify-between bg-white p-4 px-15 shadow-md'>
      <div className='img-center'>
        <img src='/logo.svg' width={50} height={50}></img>
      </div>
      <div className='text-blue-600'>
        <p>Regno: 12318621 Name: Souravjyoti dutta</p>
      </div>
      <div className='space-x-2'>

        <Link to={'/'}>
          <Button>Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}


export default Header
