import React, { ReactNode } from 'react'
import { AuthProvider } from '@/utils/AuthContext'
import Link from 'next/link'
const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <AuthProvider>
            <div className='flex '>
              <div className="w-[15rem] h-[90vh] flex flex-col justify-between items-center border-2 py-10 "> 
                <div className='space-y-15'>
                   <div>
                       <Link href="/admin/pendingreports"> <div className='border-2 rounded-full px-4 py-2 bg-accent text-center'>
                        Pending Requests
                                      </div></Link>
                   </div>
                                  <div className='border-2 rounded-full px-4 py-2 bg-accent text-center'> Resolution Requests</div>
                </div>

                 <div className='border-2 rounded-full px-4 py-2 bg-accent text-center'>
                   sign out
                                  </div>
              </div>
                {children}
            </div>
      
      </AuthProvider>
    </div>
  )
}

export default layout
