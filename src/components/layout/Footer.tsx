import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div className='text-sm my-4'>
        <div className='text-foreground filter grayscale selection:bg-pink-500 selection:text-white pb-2'>
            Designed & Made with ❤️
        </div>
     
        <div className='text-muted '>
            © {year} ShridMishra. All rights reserved.
        </div>
    </div>
  )
}

export default Footer