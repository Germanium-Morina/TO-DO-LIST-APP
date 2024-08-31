import React from 'react';
import PropTypes from 'prop-types';
import { MDBIcon } from "mdb-react-ui-kit";

 function DeleteModal({ show, handleClose, handleDelete, task }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg m-3">
        <div className="border-b-4 pt-3 p-3 px-4 flex flex-row justify-start items-center gap-2">
        <MDBIcon fas icon="trash-alt" size='lg'/>
          <h2 className="text-xl m-0">Delete Task</h2>
        </div>
        <div className="p-5 flex justify-center items-center">
          <p className='m-0'>Are you sure you want to delete the task: <strong>{task?.task}</strong>?</p>
        </div>
        <div className="flex justify-between border-t-4 sm:pl-4 sm:pr-4 pl-2 pr-2 py-4 ">
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-red-200 shadow-md hover:shadow-red-300 hover:shadow-md hover:bg-red-800">Delete</button>
          <button type="button" onClick={handleClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-gray-200 shadow-md hover:shadow-gray-300 hover:shadow-md hover:bg-gray-500">Cancel</button>
        </div>
      </div>
    </div>
  );
}

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  task: PropTypes.shape({
    task: PropTypes.string,
    status: PropTypes.number,
    dueDate: PropTypes.string,
  }),
};

export default DeleteModal;