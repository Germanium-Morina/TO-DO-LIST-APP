import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MDBIcon } from 'mdb-react-ui-kit';

function TableItems({ items, searchQuery, setIsTyping, handleStatusChange }) {
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

  const statusOptions = [
    { value: 1, label: 'Open' },
    { value: 2, label: 'In Progress' },
    { value: 3, label: 'Done' },
    { value: 4, label: 'Canceled' },
  ];

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
            <span className='flex-2 text-center pt-3 pb-3'>
              <select
                value={item.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className="bg-transparent border border-gray-300 p-1 focus:outline-none focus:shadow-gray-100 focus:shadow-sm hover:shadow-gray-100 hover:shadow-sm rounded-md"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </span>
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

TableItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    task: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
  })).isRequired,
  searchQuery: PropTypes.string.isRequired,
  setIsTyping: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};


export default TableItems;
