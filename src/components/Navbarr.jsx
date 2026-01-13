
import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { FaPlusCircle } from "react-icons/fa";
import EditOrderModal from "../components/EditOrderModal";

const Navbarr = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const [showAdd, setShowAdd] = useState(false);

  const logout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <Navbar expand='lg' className="bg-primary-subtle nav-bar p-4 shadow-lg justify-content-between">
        <Navbar.Toggle/>
        <Navbar.Collapse>
        <Nav className="gap-4 px-3 align-items-center">
          {currentUser && (
            <>
              <div className="d-flex align-items-center gap-4">
              <FaPlusCircle
                size={28}
                className="text-primary cursor-pointer"
                style={{ cursor: "pointer" }}
                title="Add Order"
                onClick={() => setShowAdd(true)}
              />
              <NavLink
                to="/logout"
                className="text-decoration-none border border-2 p-1 border-primary text-dark rounded-1"
                onClick={logout}
              >
                Logout
              </NavLink>
              </div>

            </>
          )}
        </Nav>
      </Navbar.Collapse>

      </Navbar>

      {showAdd && (
        <EditOrderModal close={() => setShowAdd(false)} />
      )}
    </>
  );
};

export default Navbarr;
