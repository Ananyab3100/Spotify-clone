import React from 'react'

const PasswordInput = ({label,placeholder,value, setValue}) => {
  return (
    <div className="textInputDiv flex flex-col space-y-2 w-full">
  <label for={label} className='font-bold'>{label}</label>
   
  <input type="text" placeholder={placeholder} 
  className="p-2 border border-gray-500 border-solid rounded placeholder-gray-500"
  id={label}
  value= {value}
  onChange ={(e) =>{
    setValue(e.target.value)
  }}
  />
  </div>
  )
}

export default PasswordInput
