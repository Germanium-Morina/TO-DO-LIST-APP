import React from 'react'
import { MDBIcon } from 'mdb-react-ui-kit';
function List() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='bg-white w-4/5 h-96 pr-4 pl-4 pt-3 pb-3 rounded-lg shadow-gray-200 shadow-lg'>
        <div className='flex flex-row w-full justify-start items-center gap-2 '>
        <MDBIcon fas icon="tasks" size='lg'/>
          <h1 className='text-2xl m-0'>Task List</h1>
        </div>
      </div>
      
    </div>
  )
}

export default List
