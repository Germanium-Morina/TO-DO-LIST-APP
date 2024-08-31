import { MDBIcon } from 'mdb-react-ui-kit';
export default function Search({ searchQuery, handleInputChange, clearSearch, isTyping }) {
  return (
    <div className='flex flex-row gap-3 justify-start items-center relative md:w-1/2 sm:w-4/5 w-full'>
    <input
      type="text"
      name="search"
      value={searchQuery}
      onChange={handleInputChange}
      className='border rounded-md p-2 focus:outline-none focus:shadow-gray-100 focus:shadow-sm hover:shadow-gray-100 hover:shadow-sm text-sm w-full'
      placeholder='Search tasks...'
    />
    <button
      className="absolute inset-y-0 right-3 focus:outline-none"
      onClick={isTyping ? clearSearch : null}
    >
      <MDBIcon fas icon={isTyping ? "times" : "search"} size='md' />
    </button>
  </div>
  )
}
