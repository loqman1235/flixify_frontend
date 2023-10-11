import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpPage = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    password_conf: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    password_conf: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Password confirmation is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await api.post("/users/register", values);
      console.log(response.data);
      if (response.status === 201) {
        const userId = response.data.user._id;
        setErrors({});
        navigate(`/plans?userId=${userId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#FEFEFF] pb-20">
      <Navbar />

      {/* Create Account Form */}
      <div className="w-full flex flex-col items-center px-5 pt-28">
        <h2 className="font-semibold text-2xl text-[#333333] mb-4">
          Create an account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="w-full md:w-1/3 flex flex-col gap-4">
              <div className="relative">
                <Field
                  autoComplete="off"
                  type="text"
                  id="username"
                  name="username"
                  className={`block px-2.5 py-5  w-full text-sm text-gray-900 bg-transparent rounded-sm border border-1 ${
                    errors.username ? "border-red-700" : "border-gray-300"
                  } appearance-none dark:text-whitefocus:outline-none focus:ring-0 peer outline-none`}
                  placeholder=" "
                />
                <label
                  htmlFor="username"
                  className="absolute text-[16px] text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Username
                </label>
              </div>
              <ErrorMessage
                name="username"
                component="p"
                className="text-sm text-red-700"
              />

              <div className="relative">
                <Field
                  autoComplete="off"
                  type="email"
                  id="email"
                  name="email"
                  className={`block px-2.5 py-5  w-full text-sm text-gray-900 bg-transparent rounded-sm border border-1 ${
                    errors.email ? "border-red-700" : "border-gray-300"
                  } appearance-none dark:text-whitefocus:outline-none focus:ring-0 peer outline-none`}
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute text-[16px] text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Email
                </label>
              </div>
              <ErrorMessage
                name="email"
                component="p"
                className="text-sm text-red-700"
              />

              <div className="relative">
                <Field
                  autoComplete="off"
                  type="password"
                  id="password"
                  name="password"
                  className={`block px-2.5 py-5  w-full text-sm text-gray-900 bg-transparent rounded-sm border border-1 ${
                    errors.password ? "border-red-700" : "border-gray-300"
                  } appearance-none dark:text-whitefocus:outline-none focus:ring-0 peer outline-none`}
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute text-[16px] text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-sm text-red-700"
              />

              <div className="relative">
                <Field
                  autoComplete="off"
                  type="password"
                  id="password_conf"
                  name="password_conf"
                  className={`block px-2.5 py-5  w-full text-sm text-gray-900 bg-transparent rounded-sm border border-1 ${
                    errors.password_conf ? "border-red-700" : "border-gray-300"
                  } appearance-none dark:text-whitefocus:outline-none focus:ring-0 peer outline-none`}
                  placeholder=" "
                />
                <label
                  htmlFor="password_conf"
                  className="absolute text-[16px] text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password Confirmation
                </label>
              </div>
              <ErrorMessage
                name="password_conf"
                component="p"
                className="text-sm text-red-700"
              />

              <button
                type="submit"
                className="primary_btn py-4"
                disabled={isSubmitting}
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
