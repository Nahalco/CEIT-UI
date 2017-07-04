import React from 'react'

const Header = () => {
  return (
    <div className='nav-top'>
      <nav>
        <div className='nav-title'>
          <img src={require('../assets/aolab-logo.png')} height='60px' />
        </div>
      </nav>
    </div>
  )
}

export default Header
