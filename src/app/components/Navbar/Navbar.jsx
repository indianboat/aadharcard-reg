import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='p-3 shadow-md sticky top-0 flex items-center justify-between bg-white z-50'>
      <h1 className='text-xl font-semibold'>
        Aadhar Registration
      </h1>

      <div className="">
        <ul>
          <li>
            <Link href="/" className="">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Navbar