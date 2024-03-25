import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";

const Navbar = () => {
   const { userDetail, setUserDetail } = useContext(NoteContext);

   let location = useLocation();

   async function getData(url) {
      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      });
      return response.json(); // parses JSON response into native JavaScript objects
   }

   const userData = async () => {
      setUserDetail(await getData("http://localhost:5000/api/auth/getuser"));
   };

   useEffect(() => {
      userData();
      // eslint-disable-next-line
   }, []);

   const handleLogout = () => {
      localStorage.removeItem("token");
      window.location.href = "/";
   };

   return (
      <>
         <nav className="navbar navbar-expand-lg border-bottom border-bottom-dark" data-bs-theme="dark" style={{ background: "#6f2bf2" }}>
            <div className="container-fluid">
               <Link className="navbar-brand" to={localStorage.getItem("token") ? "/home" : "/"}>
                  iNote
               </Link>
               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                           About
                        </Link>
                     </li>
                  </ul>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                     {!localStorage.getItem("token") && (
                        <div>
                           <Link className="btn btn-primary me-md-2" type="button" to="/login">
                              Login
                           </Link>
                           <Link className="btn btn-primary" type="button" to="/signup">
                              Sign up
                           </Link>
                        </div>
                     )}
                     {localStorage.getItem("token") && (
                        <div>
                           <Link className="text-white link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-75-hover navbar-brand" style={{ marginRight: 25 }} to="/user">
                              {userDetail?.name}
                           </Link>
                           <button className="btn btn-primary" type="button" onClick={handleLogout}>
                              Log out
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </nav>
      </>
   );
};

export default Navbar;
