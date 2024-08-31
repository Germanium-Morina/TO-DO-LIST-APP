import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { MDBIcon } from "mdb-react-ui-kit";
export default function AddModal({ show, handleClose, handleSubmit }) {
  const [form, setForm] = useState({
    task: "",
    dueDate: "",
    status: "1", // Default to 'Open'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalRef = useRef(null);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "task":
        return value.trim() ? "" : "Task is required";
      case "dueDate":
        return value ? "" : "Due Date is required";
      default:
        return "";
    }
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    newErrors.task = validateField("task", form.task);
    newErrors.dueDate = validateField("dueDate", form.dueDate);

    for (let key in newErrors) {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    }

    return newErrors;
  }, [form]);

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsSubmitted(true);

    if (Object.keys(validationErrors).length === 0) {
      handleSubmit(form);
      handleClose();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, handleClose]);

  const handleSubmitClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Programmatically submit the form
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      // Trigger validation when `isSubmitted` changes
      setErrors(validateForm());
    }
  }, [form, isSubmitted, validateForm]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-lg m-3">
        <div className="border-b-4 pt-3 p-3 px-4 flex flex-row justify-start items-center gap-2">
          <MDBIcon fas icon="plus" size="lg" />
          <h2 className="text-xl m-0">Add New Task</h2>
        </div>
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="py-4 sm:pl-4 sm:pr-4 pl-2 pr-2 gap-3 flex flex-col">
          <div className="flex flex-col">
            <label htmlFor="task" className="block text-gray-500">
              Task:
            </label>
            <input
              type="text"
              name="task"
              value={form.task}
              onChange={handleChange}
              className="border rounded-md p-2 focus:outline-none focus:shadow-gray-100 focus:shadow-sm hover:shadow-gray-100 hover:shadow-sm text-md w-full"
              placeholder="Enter your task"
            />
            {isSubmitted && errors.task && (
              <span className="pl-1 text-sm text-red-600">{errors.task}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="dueDate" className="block text-gray-500">
              Due Date:
            </label>
            <input
              type="datetime-local"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="border rounded-md p-2 focus:outline-none focus:shadow-gray-100 focus:shadow-sm hover:shadow-gray-100 hover:shadow-sm text-md w-full"
            />
            {isSubmitted && errors.dueDate && (
              <span className="pl-1 text-sm text-red-600">
                {errors.dueDate}
              </span>
            )}
          </div>
        </form>
        <div className="flex justify-between border-t-4 sm:pl-4 sm:pr-4 pl-2 pr-2 py-4 mt-3">
          <button
            onClick={handleSubmitClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-blue-200 shadow-md hover:shadow-blue-300 hover:shadow-md hover:bg-blue-800">
            Add Task
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow-gray-200 shadow-md hover:shadow-gray-300 hover:shadow-md hover:bg-gray-500">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
AddModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
