// Register
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // validation error message and validation
import axios from "axios"; // api access
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


//  initialValues
const initialValues = {
  username: "",
  email: "",
  password: "",
};

// validation  schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const navigate = useNavigate();
  // handleSubmit
  const submit = async (values) => {
    try {
      await axios
        .post("http://localhost:8000/register", values)
        .then((res) => {
           toast("User Register");
           navigate("/auth/login");
         
        })
        .catch((e) => {
          toast("user Already Exist");
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen ">
          <div className="shadow-sm shadow-slate-500 p-10 rounded-md">
            <h1 className="font-bold text-2xl mb-5  ml-12  flex justify-center">
              Register
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                submit(values);
              }}
            >
              <Form className="flex flex-col space-y-10 ">
                {/* username */}
                <div className="">
                  <label htmlFor="username">Username </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="border border-black  ml-5"
                  />
                  <ErrorMessage
                    name="username"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>
                {/* email */}
                <div>
                  <label htmlFor="email">Email </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="border border-black  ml-12"
                  />
                  <ErrorMessage
                    name="email"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>
                {/* password */}
                <div>
                  <label htmlFor="password">Password :</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="border border-black  ml-6"
                  />
                  <ErrorMessage
                    name="password"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>
                <button
                  // disabled={isSubmitting}
                  type="submit"
                  className="border border-balck bg-green-400 rounded-md px-1 py-1"
                >
                  Regitser
                </button>
                <Link to="/auth/login">
                  Already account{" "}
                  <span className="underline text-blue-700">click here</span>
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
