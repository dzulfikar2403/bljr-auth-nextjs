import { auth } from '@/auth'
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react'

const layout = async ({children}:{children:ReactNode}) => {
  const session = await auth();
  if(session) redirect('/dashboard');
  return (
    <div className='w-full min-h-svh'>
        {children}
    </div>
  )
}

export default layout