import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  NavbarContainer,
  NavbarLink,
  ButtonsWrapper,
  Button,
} from "./Navbar.styled";
import { logout } from "../../store/authSlice";
import ThemeToggler from "../ThemeToggler/ThemeToggler";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { useLogoutMutation } from "../../store/userApiSlice";

function Navbar() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const handleToggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setShowRegisterForm(false);
  };

  const handleToggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
    setShowLoginForm(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NavbarContainer>
      <div>
        <h1>SchoolLogo</h1>
      </div>
      <div>
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/about">About</NavbarLink>
      </div>

      {userInfo ? (
        <div>
          <NavbarLink to="/administrator-portal">
            Administrator Portal
          </NavbarLink>
          <NavbarLink to="/login" onClick={handleLogout}>
            Logout
          </NavbarLink>
        </div>
      ) : (
        <ButtonsWrapper>
          <Button border onClick={handleToggleLoginForm}>
            Log In
          </Button>
          <Button background onClick={handleToggleRegisterForm}>
            Sing Up
          </Button>
          <ThemeToggler />
        </ButtonsWrapper>
      )}
      {showLoginForm && (
        <LoginForm
          closeForm={handleToggleLoginForm}
          onSwitchToRegister={handleToggleRegisterForm}
        />
      )}
      {showRegisterForm && (
        <RegisterForm
          closeForm={handleToggleRegisterForm}
          onSwitchToLogin={handleToggleLoginForm}
        />
      )}
     
    </NavbarContainer>
  );
}

export default Navbar;
