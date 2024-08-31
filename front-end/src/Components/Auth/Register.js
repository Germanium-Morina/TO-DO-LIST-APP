import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";

function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });

    // Validate the field being typed in
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.trim() ? "" : "Full Name is required";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address";
      case "password":
        return value.length >= 6
          ? ""
          : "Password must be at least 6 characters";
      case "confirmPassword":
        if (!value) {
          return "Confirm Password is required";
        }
        return value === form.password ? "" : "Passwords do not match";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    newErrors.fullName = validateField("fullName", form.fullName);
    newErrors.email = validateField("email", form.email);
    newErrors.password = validateField("password", form.password);
    newErrors.confirmPassword = validateField(
      "confirmPassword",
      form.confirmPassword
    );

    for (let key in newErrors) {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setIsSubmitted(true);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", form);
      // Redirect to another page after successful submission
      navigate("/");
    }
  };
  const togglePasswordVisibility = (field) => {
    setShowPasswords((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <div className="flex justify-center items-center w-full h-full mt-14 ">
      <div className="flex flex-col bg-white rounded-lg xl:w-2/5 lg:w-2/4 md:w-3/5 sm:w-3/4 mobile:w-4/5 w-full shadow-gray-200 shadow-lg ml-3 mr-3 mb-6">
        <div className="flex justify-start items-center gap-2 mb-4 border-b-4 pb-4 md:pl-6 md:pr-6 pl-3 pr-4 pt-4">
          <MDBIcon fas icon="user-plus" size="lg" />
          <h1 className="text-xl m-0">Sign Up</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-10 md:pl-6 md:pr-6 pl-2 pr-2">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="fullName">Full Name:</label>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:outline-none focus:shadow-gray-100 focus:shadow-sm hover:shadow-gray-100 hover:shadow-sm text-sm"
                  placeholder="Enter your full name"
                />
                {isSubmitted && errors.fullName && (
                  <span className="pl-1 text-sm text-red-600">
                    {errors.fullName}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="email">Email:</label>
              <div className="flex flex-col">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border rounded-md p-2 focus:outline-none focus:shadow-gray-100 focus:shadow-sm hover:shadow-gray-100 hover:shadow-sm text-sm"
                  placeholder="Enter your email address"
                />
                {isSubmitted && errors.email && (
                  <span className="pl-1 text-sm text-red-600">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="password">Password:</label>
              <div className="flex flex-col">
                <div className="flex relative">
                  <input
                    type={showPasswords.password ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="border rounded-md p-2 focus:outline-none focus:shadow-gray-100 focus:shadow-sm hover:shadow-gray-100 hover:shadow-sm text-sm w-full"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 focus:outline-none">
                    {showPasswords.password ? (
                      <MDBIcon far icon="eye" />
                    ) : (
                      <MDBIcon far icon="eye-slash" />
                    )}
                  </button>
                </div>
                {isSubmitted && errors.password && (
                  <span className="pl-1 text-sm text-red-600">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="flex flex-col">
                <div className="flex relative">
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="border rounded-md p-2 focus:outline-none focus:shadow-gray-100 focus:shadow-sm hover:shadow-gray-100 hover:shadow-sm text-sm w-full"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 focus:outline-none">
                    {showPasswords.confirmPassword ? (
                      <MDBIcon far icon="eye" />
                    ) : (
                      <MDBIcon far icon="eye-slash" />
                    )}
                  </button>
                </div>
                {isSubmitted && errors.confirmPassword && (
                  <span className="pl-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center mb-3 gap-4">
            <Link to="/" className="text-sm text-blue-700">
              Already have an account?
            </Link>
            <button
              type="submit"
              className="text-base bg-blue-600 text-white pl-3 pr-3 pt-2 pb-2 rounded-lg whitespace-nowrap">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register;
