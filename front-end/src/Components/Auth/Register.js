import React from 'react'
import { useState } from 'react'
import { MDBIcon } from 'mdb-react-ui-kit';
function Register() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const validateForm = () => {
    const errors = {}
    if (!form.fullName) {
      errors.fullName = 'Full Name is required'
    }
    if (!form.email) {
      errors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errors.email = 'Invalid email format'
    }
    if (!form.password) {
      errors.password = 'Password is required'
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 8 characters long'
    }
    if (!form.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required'
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = 'Passwords do not match'
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    if (validateForm()) {
      // API call here to register user
    }
  }


  return (
    <div className='flex justify-center items-center w-full h-full'>
      <div className='flex flex-col bg-white pl-6 pr-6 pt-3 rounded-lg'>
        <div className='flex justify-start items-center gap-2 mb-4'>
          <MDBIcon fas icon="user-plus" size='lg'/>
          <h1 className='text-xl m-0'>
            Register
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <span>{errors.fullName}</span>}
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div>
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
            <button type="submit">Register</button>
          </div>
        </form>
      </div>

    </div>
  )
}
export default Register