import React from 'react'
import Link from 'next/link'
import { Camera, AlertCircle, Home,CircleChevronLeft,CircleUserRound   } from "lucide-react";
const Navbar = () => {
  return (
    <div className='w-full  '>
        <nav className='  justify-between h-20 items-center flex p-5 bg-amber-300'>
        
          <div className="logo"><Link href="/">DressMauPays</Link></div>
          <div className="flex gap-5">
<Link href="/add-report">report an issue</Link>    

<CircleUserRound strokeWidth={1.5} size={32} />
          </div>
      

        </nav>
      
    </div>
  )
}

export default Navbar
