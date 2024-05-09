import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "../List/List";
import Home from "../Home/Home";

const DashBoard = () => {
  const navigate = useNavigate();

  // show
  const [isSHow, setShow] = useState(false);
  const isClickShow = () => {
    setShow(true);
    setShow1(false);
  };
  // show
  const [isSHow1, setShow1] = useState(true);
  const isClickShow1 = () => {
    setShow1(true);
    setShow(false);
  };
  const [isShowoff, setshowoff] = useState(true);
  useEffect(() => {
    setTimeout(() => {
    setshowoff(false)
  },1000)
})

  // logout
  const logout = () => {
    localStorage.removeItem("username--");
    localStorage.removeItem("userId--");
    navigate("/");
  };
  const [username, setusername] = useState("");
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    setusername(localStorage.getItem("username--"));
    setUserId(localStorage.getItem("userId--"));
  }, []);
  return (
    <>
      <section>
        <div className="container mx-auto ">
          <nav className="mt-5 bg-gray-300 text-black rounded py-1">
            <ul className="flex justify-around">
              <li className="cursor-pointer" onClick={() => isClickShow1()}>
                Home
              </li>
              <li onClick={() => isClickShow()} className="cursor-pointer">
                Employee List
              </li>
              <li className="capitalize">{username}</li>
              <li className="underline cursor-pointer" onClick={() => logout()}>
                Logout
              </li>
            </ul>
          </nav>
          <div>{isSHow1 && <Home />}</div>
          <div>{isSHow && <List />}</div>
          <div className="flex justify-center min-h-screen items-center">
            {isShowoff && <h1 className="">Welcome Admin Panel</h1>}
          </div>
        </div>
      </section>
    </>
  );
};

export default DashBoard;
