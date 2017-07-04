import React, { PropTypes } from 'react'

const CustomFrame = ({children, onRemove, editable, title}) => {
  return (
    <div className='x_panel fixed_height_320'>
      <div className='x_title'>
        <h2>{title}</h2>
        <div className='clearfix' />
      </div>
      <div className='x_content'>
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
