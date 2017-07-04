import React, { PropTypes } from 'react'

const CustomFrame = ({children, onRemove, editable, title}) => {
  return (
    <div className='panel'>
      <div className='title'>
        <h2>{title}</h2>
        <div className='clearfix' />
      </div>
      <div className='content'>
        {children}
      </div>
    </div>
  )
}

CustomFrame.propTypes = {
  children: PropTypes.element,
  onRemove: PropTypes.func,
  editable: PropTypes.bool,
  title: PropTypes.string
}

export default CustomFrame
