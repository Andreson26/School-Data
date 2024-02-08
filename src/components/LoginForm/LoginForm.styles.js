import styled, { keyframes } from "styled-components";
import { Form} from "formik";

const fadeInBackground = keyframes`
  0% {
    opacity: 30%;

  100% {
    opacity: 100%;
  }
`;

export const Container = styled.div`
  background-color: ${(props) => props.theme.transparent};
  animation: ${fadeInBackground} 1s ease-out;
  height: 100vh;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const FormScreen = styled(Form)`
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  width: 400px;
  background-color: gray;
  padding: 30px 50px;
  background-color: ${(props) => props.theme.elementBackground};
  border: ${(props) => props.theme.settings};
`;

export const ExitIcon = styled.div`
  filter: ${(props) => props.theme.iconColor1};
  position: absolute;
  top: 5%;
  right: 6%;
  cursor: pointer;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
  border-radius: 10px;
`;

export const InputWrapper = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.navbar.background};
  border-radius: 10px;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 20px;
  width: 100%;
  border: none;
  color: ${(props) => props.theme.text};
  outline: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.navbar.background};
`;

export const ErrorText = styled.div`
  color: red;
  font-size: 12px;
`;

export const Button = styled.button`
  padding: 15px;
  background-color: ${(props) => props.theme.blue};
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  border-radius: 10px;
  margin-top: 10px;
`;

export const TogglePassowdButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const SwitchFormText = styled.p`
  color: gray;
  font-size: 12px;
  margin-top: 10px;

  span {
    color: ${(props) => props.theme.blue};
  }
`;
