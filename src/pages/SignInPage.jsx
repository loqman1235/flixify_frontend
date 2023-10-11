import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SignInPage = () => {
  const { login } = useContext(AuthContext);
  const backgroundImageUrl = "landing_page_bg.png";
  const mainDivStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    position: "relative",
  };

  const initialValues = {
    email: "",
    password: "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // Handle Login
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const { email, password } = values;
      await login(email, password);
    } catch (error) {
      console.log("Login error:", error);
      // Display the error message below the corresponding input field
      setErrors({
        email: error.message,
        password: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="overflow-hidden w-full h-screen before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-gradient-to-t before:from-[#141515] before:from-10% before:to-[#141515]/50"
      style={mainDivStyle}
    >
      <div className="absolute w-full h-full top-0 left-0 z-10">
        <Navbar />
        {/* Sign In Form */}
        <div className="w-full flex items-center justify-center mt-28">
          <div className="w-[480px] bg-black/70 p-16 rounded-sm flex flex-col shadow-xl">
            <h3 className="text-3xl text-white font-semibold mb-4">Sign In</h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form className="w-full flex flex-col gap-4 mb-10">
                  <div className="relative">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className={`overflow-hidden block px-2.5 py-5 w-full text-sm text-white bg-[#454545] rounded-sm appearance-none dark:text-whitefocus:outline-none focus:ring-0 peer outline-none ${
                        errors.password
                          ? "border-b-2 border-red-700"
                          : "border-none"
                      } `}
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-[16px] text-[#8c8c8c] duration-300 transform -translate-y-1 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-[#8c8c8c] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-1 left-1"
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
                      type="password"
                      id="password"
                      name="password"
                      className={`overflow-hidden block px-2.5 py-5 w-full text-sm text-white bg-[#454545] rounded-sm appearance-none dark:text-whitefocus:outline-none focus:ring-0 peer outline-none ${
                        errors.password ? "border-b-2 border-red-700" : ""
                      } `}
                      placeholder=" "
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-[16px] text-[#8c8c8c] duration-300 transform -translate-y-1 scale-75 top-1 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-[#8c8c8c] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-1 left-1"
                    >
                      Password
                    </label>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-700"
                  />
                  <button
                    type="submit"
                    className="primary_btn py-4"
                    disabled={isSubmitting}
                  >
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-[#737373]">
              New to Flixify?{"  "}
              <Link className="text-white" to="/sign-up">
                Sign up now.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
