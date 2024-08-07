import React from 'react';


const TextWithHover = ({displayText, active,onClick}) => {
  return (

      <div className="flex items-center justify-start cursor-pointer" onClick={onClick}>
      <div className= {`${active ? "text-white": "text-gray-400"} text-lg font-semibold hover:text-white`}>
        {displayText}
      </div>
    </div>

  )
}

export default TextWithHover
