// Register
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup"; // validation error message and validation
import axios from "axios"; // api access
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// validation  schema
const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Name is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  MobileNo: Yup.number()
    .min(10, "maxium 10 number")
    .required("mobile number  is required"),
  Designation: Yup.string().required("Designation is required"),
  Gender: Yup.string().required("gender is required"),
  //   Course: Yup.string().required("course is required"),
  //   image: Yup.string().required("image is required"),
});
// values of Designation
const Designation = ["select", "HR", "Manager", "sales"];

const Update = (prop) => {
  const [images, setimage] = useState();
  //  initialValues
  let initialValues = {
    userId: prop.value.userId,
    Name: prop.value.Name,
    Email: prop.value.Email,
    MobileNo: prop.value.MobileNo,
    Designation: prop.value.Designation,
    Gender: prop.value.Gender,
    Course: prop.value.Course,
    image: "",
  };
  // image change
  const changemade = async () => {
    const formdata = new FormData();
    formdata.append("file", images);
    try {
      await axios
        .post("http://localhost:8000/image", formdata)
        .then((res) => {
          console.log(res);
          toast("uploaded");
        })
        .catch(() => {
          console.log("error");
        });
    } catch (e) {
      console.log(e);
    }
  };
  // handleSubmit
  const submit = async (values) => {
    changemade();
    try {
      await axios
        .put("http://localhost:8000/update", values)
        .then(() => {
          toast("Updated");
        })
        .catch(() => {
          toast("some thing went wrong");
        });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h1>Employee Edit </h1>
      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center min-h-screen ">
          <div className="shadow-sm bg-gray-200 shadow-slate-500 p-10 rounded-md">
            <h1 className="font-bold text-2xl mb-10  ml-12  flex justify-center uppercase">
              Update
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
                {/* Name */}
                <div className="">
                  <label htmlFor="username">Name </label>
                  <Field
                    type="text"
                    name="Name"
                    id="Name"
                    className="border border-black  ml-10"
                  />
                  <ErrorMessage
                    name="Name"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>
                {/* Email */}
                <div>
                  <label htmlFor="Email">Email </label>
                  <Field
                    type="email"
                    name="Email"
                    id="Email"
                    className="border border-black  ml-12"
                  />
                  <ErrorMessage
                    name="Email"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>
                {/* MobileNo */}
                <div>
                  <label htmlFor="password">MobileNo </label>
                  <Field
                    type="number"
                    name="MobileNo"
                    id="MobileNo"
                    className="border border-black  ml-6"
                  />
                  <ErrorMessage
                    name="MobileNo"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>
                {/* Designation */}
                <div>
                  <label htmlFor="Designation">Designation </label>
                  <Field
                    as="select"
                    name="Designation"
                    id="Designation"
                    className="border border-black ml-6 px-2 py-1"
                  >
                    {Designation.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="Designation"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>
                {/* Gender */}
                <div className="flex">
                  <label>Gender </label>

                  <div className="ml-5">
                    <label htmlFor="Male">
                      <Field
                        type="radio"
                        name="Gender"
                        id="Male"
                        value="Male"
                        className="border border-black ml-6"
                      />
                      Male
                    </label>
                    <label htmlFor="Female">
                      <Field
                        type="radio"
                        name="Gender"
                        id="Female"
                        value="Female"
                        className="border border-black ml-6"
                      />
                      Female
                    </label>
                    <label htmlFor="Other">
                      <Field
                        type="radio"
                        name="Gender"
                        id="Other"
                        value="Other"
                        className="border border-black ml-6"
                      />
                      Other
                    </label>
                  </div>
                </div>

                {/* Course */}
                <div className="flex">
                  <label>Course</label>
                  <label htmlFor="MCA">
                    <Field
                      type="checkbox"
                      name="Course"
                      id="MCA"
                      value="MCA"
                      className="border border-black ml-6"
                    />
                    MCA
                  </label>

                  <label htmlFor="BCA">
                    <Field
                      type="checkbox"
                      name="Course"
                      id="BCA"
                      value="BCA"
                      className="border border-black ml-6"
                    />
                    BCA
                  </label>

                  <label htmlFor="BSC">
                    <Field
                      type="checkbox"
                      name="Course"
                      id="BSC"
                      value="BSC"
                      className="border border-black ml-6"
                    />
                    BSC
                  </label>
                </div>

                {/* image */}
                <div>
                  <label htmlFor="image">Img Upload</label>
                  <input
                    required
                    type="file"
                    name="image"
                    onChange={(event) => setimage(event.target.files[0])}
                    className="border border-black ml-6"
                  />
                  <ErrorMessage
                    name="image"
                    className="text-red-600 flex ml-24"
                    component="span"
                  />
                </div>

                <button
                  // disabled={isSubmitting}
                  type="submit"
                  className="border border-balck bg-green-400 rounded-md px-1 py-1"
                >
                  Update
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Update;
