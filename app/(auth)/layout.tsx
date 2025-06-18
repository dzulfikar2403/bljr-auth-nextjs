import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <div className='w-full min-h-svh'>
        {children}
    </div>
  )
}

export default layout