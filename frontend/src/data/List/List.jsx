import CreateList from "../createList/CreateList";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "./Pagination";
import Update from "../Update/Update";

const List = () => {
  // usestates
  const [isSHow, setShow] = useState(false);
  const [isSHow2, setShow2] = useState(true);
  const [isSHow3, setShow3] = useState(false);
  const [currenpost, setcurrenpost] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [poastperpage, , setpoastperpage] = useState(5);
  const [data, setdata] = useState([]);

  const isClickShow = () => {
    setShow(true);
    setShow2(false);
  };
  // edit
  const [value, setvalue] = useState({});
  const isClickShow1 = (item) => {
    const cnf = confirm("Are you confirm edit");
    if (cnf) {
      setShow2(false);
      setShow3(true);
      setvalue(item);
    }

    console.log("selected", item);
  };

  useEffect(() => {
    // data fetch and show details
    axios
      .get(`http://localhost:8000/getAllDeatils`)
      .then((res) => {
        console.log(res.data.message[0].image);
        setdata(res.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentpage, isSHow, isSHow2, isSHow3,data]);

  // delete
  const onDelete = (id) => {
    console.log(id);
    const boo = confirm("Are you sure delete");
    if (boo) {
      axios
        .delete(`http://localhost:8000/deletedetail/${id}`)
        .then(() => {
          toast("Deleted");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const lastindex = currentpage * poastperpage;
  const firstpost = lastindex - poastperpage;

  useEffect(() => {
    const d = data.slice(firstpost, lastindex);
    setcurrenpost(d);
  }, [data]);
  // search
  const onChanges = (event) => {
    if (event.target.value) {
      const value = data.filter(
        (value) =>
          value.Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          value.Email.toLowerCase().includes(
            event.target.value.toLowerCase()
          ) ||
          value.createdAt === event.target.value ||
          value.MobileNo.includes(event.target.value)
      );
      setcurrenpost(value);
    } else {
      setcurrenpost(data.slice(firstpost, lastindex));
    }
  };

  return (
    <>
      {isSHow2 && (
        <section>
          <div className="container mx-auto ">
            <h1>Employee List</h1>
            <div>
              <div className="flex justify-end items-center space-x-3">
                <span> Total Count:{data.length}</span>{" "}
                <span
                  onClick={() => isClickShow()}
                  className="bg-green-400 rounded px-2 py-1 cursor-pointer"
                >
                  Create Employee
                </span>
              </div>
              <div className="flex justify-end mt-2 mb-2 space-x-2 items-center">
                <span>search</span>
                <input
                  type="text"
                  onChange={() => onChanges(event)}
                  className="border px-2 rounded outline-none border-balck py-1"
                  placeholder="search"
                />
              </div>
            </div>
            <div>
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-200 px-4 py-2">
                      Unique Id
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Image</th>
                    <th className="border border-gray-200 px-4 py-2">Name</th>
                    <th className="border border-gray-200 px-4 py-2">Email</th>
                    <th className="border border-gray-200 px-4 py-2">
                      Mobile No
                    </th>
                    <th className="border border-gray-200 px-4 py-2">
                      Designation
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Gender</th>
                    <th className="border border-gray-200 px-4 py-2">Course</th>
                    <th className="border border-gray-200 px-4 py-2">
                      Create date
                    </th>
                    <th className="border border-gray-200 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currenpost.map((item, i) => (
                    <tr key={i} className="bg-white hover:bg-slate-300">
                      <td className="border border-gray-200 px-4 py-2">
                        {item.userId}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 flex justify-center">
                        <img className="w-12 h-12 rounded-full"
                          src={
                            item.image.data
                              ? URL.createObjectURL(
                                  new Blob(
                                    [new Uint8Array(item.image.data.data)],
                                    {
                                      type: item.image.contentType,
                                    }
                                  )
                                )
                              : ""
                          }
                          alt="User"
                        />
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.Name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.Email}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.MobileNo}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.Designation}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.Gender}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.Course}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item.createdAt}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <span
                          className="cursor-pointer"
                          onClick={() => isClickShow1(item)}
                        >
                          Edit
                        </span>{" "}
                        -{" "}
                        <span
                          onClick={() => onDelete(item.userId)}
                          className="cursor-pointer"
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className=" flex justify-center">
            <Pagination
              totalpost={data.length}
              postperpage={poastperpage}
              setcurrentpage={setcurrentpage}
            />
          </div>
        </section>
      )}
      <div className="z-50  left-[40%] top-2 ">
        {isSHow3 && <Update value={value} />}
      </div>
      <ToastContainer />
      <div className="z-50  left-[40%] top-2 ">{isSHow && <CreateList />}</div>
    </>
  );
};

export default List;
