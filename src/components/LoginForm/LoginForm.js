import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../store/userApiSlice";
import { setCredentials } from "../../store/authSlice";
import { toast } from "react-toastify";
import { Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";
import exitIcon from "../Icons/exit-icon.png";
import {
  Container,
  FormField,
  Label,
  Input,
  Button,
  SwitchFormText,
  InputWrapper,
  ErrorText,
  FormScreen,
  ExitIcon,
  TogglePassowdButton,
} from "./LoginForm.styles";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = ({ onSwitchToRegister, closeForm }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [login] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line

    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (values) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));

      navigate("/");

      closeForm();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <FormScreen onSubmit={handleSubmit}>
            <ExitIcon onClick={closeForm}>
              <img src={exitIcon} alt="" height={25} />
            </ExitIcon>
            <h2>Log In</h2>
            <FormField>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
              <ErrorMessage name="email" component={ErrorText} />
            </FormField>
            <FormField>
              <Label htmlFor="password">Password</Label>
              <InputWrapper>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
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

              <ErrorMessage name="password" component={ErrorText} />
            </FormField>
            <FormField>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Login"}
              </Button>
            </FormField>
            <SwitchFormText onClick={onSwitchToRegister}>
              Don't have an account? <span>Register here.</span>
            </SwitchFormText>
          </FormScreen>
        )}
      </Formik>
    </Container>
  );
};

export default LoginForm;
