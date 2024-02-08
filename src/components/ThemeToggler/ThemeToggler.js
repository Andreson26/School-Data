import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { IoIosMoon } from "react-icons/io";
import { ToggleButton, ToggleContainer } from "./ThemeToggler.styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";

export default function ThemeToggler() {
  const dispatch = useDispatch();
  const { isDarkTheme } = useSelector((state) => state.theme);

  return (
    <ToggleContainer>
      <ToggleButton onClick={() => dispatch(toggleTheme())}>
        {isDarkTheme ? <BsFillSunFill size={25} /> : <IoIosMoon size={25} />}
      </ToggleButton>
    </ToggleContainer>
  );
}
