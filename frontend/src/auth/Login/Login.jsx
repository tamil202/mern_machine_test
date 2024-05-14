// Register
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // validation error message and validation
import axios from "axios"; // api access
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//  initialValues
const initialValues = {
  email: "",
  password: "",
};

// validation  schema
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  // handleSubmit
  const submit = async (values) => {
    try {
      await axios
        .post("http://localhost:8000/loginuser", values)
        .then((res) => {
          console.log(res);
          const { password, ...result } = res.data.user._doc;
          const { userId, username } = result;
          toast("Login Successfully");
          localStorage.setItem("userId--", userId);
          localStorage.setItem("username--", username);
          navigate("/data/dashboard");
        })
        .catch((e) => {
          console.log(e);
          toast("Invalid user");
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen ">
          <div className="shadow-sm shadow-slate-500 p-10 rounded-md">
            <h1 className="font-bold text-2xl mb-5  ml-12  flex justify-center">
              Login
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
                {/* email */}
                <div>
                  <label htmlFor="email">Email </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="border border-black  ml-14"
                  />
                  <ErrorMessage
                    name="email"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>
                {/* password */}
                <div>
                  <label htmlFor="password">Password </label>
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
                  Login
                </button>
                <Link to="/auth/register">
                  Not have account{" "}
                  <span className="underline text-blue-700">click here</span>
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
