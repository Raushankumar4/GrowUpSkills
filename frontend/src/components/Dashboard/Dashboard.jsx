import React, { useState } from 'react'
import Sidebar from '../Sidbar/Sidebar';
import Content from '../Sidbar/Content';

const Dashboard = () => {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className='flex'>
      <Sidebar setActive={setActive} />
      <Content active={active} />
    </div>
  )
}

export default Dashboard