import React, { PropTypes } from 'react'

const CustomFrame = ({children, onRemove, editable, title}) => {
  return (
    <div className='panel card'>
      <div className='card-block'>
        <div className='panel-title'>
          <h2 className='card-title'>{title}</h2>
          <div className='clearfix' />
        </div>
        <div className='panel-content'>
          {children}
        </div>
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
