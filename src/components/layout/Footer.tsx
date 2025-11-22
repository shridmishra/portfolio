import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <div className='text-sm my-8'>
        <div className='text-foreground filter grayscale pb-2'>
            Designed & Made with ❤️
        </div>
     
        <div className='text-muted py-2'>
            © {year} ShridMishra. All rights reserved.
        </div>
    </div>
  )
}

export default Footer