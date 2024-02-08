import React, { useEffect, useState } from "react";
import exitIcon from "../Icons/exit-icon.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  FormContainer,
  FormField,
  ErrorText,
  FormScreen,
  ExitIcon,
  Input,
  Button,
  Text,
  TogglePassowdButton,
  InputWrapper,
  SwitchFormText,
  EmailExist,
  ErrorMessageDiv
} from "./RegisterForm.styles";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../store/userApiSlice";
import { setCredentials } from "../../store/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ closeForm, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line

    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const checkUserExists = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/user-exist",
        { email }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      return false;
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const userExist = await checkUserExists(values.email);
      if (userExist) {
        setError("Email already exists in the system, Please use another email");
        return;
      }
      const res = await register(values).unwrap();
      dispatch(setCredentials({ ...res }));
      closeForm();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    } finally {
      setSubmitting(false); // Set form submitting state to false
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormScreen>
            <ExitIcon onClick={closeForm}>
              <img src={exitIcon} alt="" height={25} />
            </ExitIcon>
            <h2>Register</h2>
            <FormField>
              <label htmlFor="firstName">First Name</label>
              <Input type="text" name="firstName" />

              <ErrorMessageDiv name="firstName" component={ErrorText} />
            </FormField>
            <FormField>
              <label htmlFor="lastName">Last Name</label>
              <Input type="text" name="lastName" />
              <ErrorMessageDiv name="lastName" component={ErrorText} />
            </FormField>
            <FormField>
              <label htmlFor="email">Email</label>
              <Input type="email" name="email" />
              <ErrorMessageDiv name="email" component={ErrorText} />
            </FormField>
            <FormField>
              <label htmlFor="password">Password</label>
              <InputWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  style={{ backgroundColor: "transparent" }}
                />
                <TogglePassowdButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </TogglePassowdButton>
              </InputWrapper>

              <ErrorMessageDiv name="password" component={ErrorText} />
            </FormField>
            <FormField>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Register"}
              </Button>
            </FormField>{" "}
            <SwitchFormText onClick={onSwitchToLogin}>
              Already have an account? <span>Go back to login</span>
            </SwitchFormText>
            <Text>
              By proceeding, you agree to CyptoBook’s<span>Terms</span>
            </Text>
            <EmailExist>{error}</EmailExist>
          </FormScreen>
        )}
      </Formik>
  
    </FormContainer>
  );
};

export default RegisterForm;
