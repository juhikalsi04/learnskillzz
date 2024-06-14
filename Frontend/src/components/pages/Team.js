import React from 'react'
import sawi from "../../components/images/s.png"

const Team = ({ name, mail, linkedin, image }) => {
  return (


    <div className="mb-4 rounded-md mx-auto p-6 h-1/2 bg-blue-200 ">
      <div className="w-[200px]">
        <img src={image} alt="Team Member" className="w-[70%] h-50 rounded-full mb-2" />
      </div>
      <h3 className="text-lg font-bold m-2">{name}</h3>
      <h3 className=" m-2">Web Developer</h3>
      <div className="flex flex-row">
        <h3 className="text-lg font-bold  m-2">{mail}</h3>
        <h3 className="text-lg font-bold  m-2">{linkedin}</h3>
      </div>

    </div>


  )
}

export default Team