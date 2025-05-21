import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import  logo from '@/public/dressmaupays-logo.png'
import { Button } from './ui/button';
import { Camera, AlertCircle, Home,CircleChevronLeft,CircleUserRound   } from "lucide-react";
const Navbar = () => {
  return (
    <div className='w-full  '>
        <nav className='  py-4 px-5 bg-accent'>
        
          <div className='max-w-7xl justify-between flex items-center mx-auto '>
            <div className="logo"><Link href="/">
            <Image priority src={logo} alt="logo" className='w-full h-10'/>
            </Link></div>
            <Link href="/add-report"><Button  className='rounded-full'>Report  Issue</Button></Link>    
            
         
          </div>

        </nav>
      
    </div>
  )
}

export default Navbar
