import React, { useState } from 'react'
import "../../App.css"
import {
  FaBars,
  FaBookOpen,
  FaBookmark,
  FaHome,

  FaRegChartBar,
  FaTh, FaUserAlt,
} from "react-icons/fa"
import { NavLink } from 'react-router-dom'

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaHome />
    },
    {
      path: "/discussion",
      name: "Discussion",
      icon: <FaRegChartBar />
    },
    {
      path: "/placement",
      name: "Placement",
      icon: <FaBookmark />
    },
    {
      path: "/onlinetest",
      name: "Online Test",
      icon: <FaBookOpen />
    },
    {
      path: "/about",
      name: "About",
      icon: <FaUserAlt />
    },
  ]

  return (

    <div className='container'>
      <div style={{ width: isOpen ? "250px" : "50px" }} className='sidebar'>
        <div className='top_section mx-2 my-5'>
          <h1 style={{ display: isOpen ? "block" : "none" }} className='logo'>LearnSkillz</h1>



          <div style={{ marginLeft: isOpen ? "80px" : "0px" }} className='bars'>

            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeclassname="active">
              <div className='icon'>{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className='link_text'>{item.name}</div>
            </NavLink>
          ))
        }

      </div>
      <main>{children}</main>
    </div>


  )
}

export default Sidebar