import { useEffect, useState } from 'react';
import { MDBIcon } from 'mdb-react-ui-kit';

function TableItems({ items, searchQuery, setIsTyping }) {
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    if (searchQuery) {
      setFilteredItems(
        items.filter(item =>
          Object.values(item).toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setIsTyping(true);
    } else {
      setFilteredItems(items);
      setIsTyping(false);
    }
  }, [searchQuery, items, setIsTyping]);

  return (
    <div className='flex flex-col pb-4 max-h-[calc(85vh-300px)] min-w-[1000px]'>
      <ul className='flex flex-col m-0 p-0'>
  {filteredItems.map((item, index) => (
    <li
      key={index}
      className='flex flex-row items-center justify-between text-gray-600 border-b-2 last:border-b-0'
    >
      <span className='flex-1 text-center pt-3 pb-3'>{index + 1}</span>
      <span className='flex-3 text-left pt-3 pb-3'>{item.task}</span>
      <span className='flex-2 text-center pt-3 pb-3'>{item.status}</span>
      <span className='flex-3 text-center pt-3 pb-3'>{item.dueDate}</span>
      <div className='flex-2 flex items-center justify-center pt-3 pb-3 gap-4'>
        <button><MDBIcon fas icon="check" /></button>
        <button><MDBIcon fas icon="pen" /></button>
        <button><MDBIcon fas icon="trash-alt" /></button>
      </div>
    </li>
  ))}
</ul>
    </div>
  );
}

export default TableItems;
