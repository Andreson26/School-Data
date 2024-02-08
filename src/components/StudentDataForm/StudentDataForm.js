import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createStudent } from "../../store/studentSlice";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const FormTitle = styled.h3`
  margin: 20px;
  text-align: center;
`;

const ErrorMessageDiv = styled(ErrorMessage)`
  color: red;
`;

const Button = styled.button`
  margin-top: 50px;
  padding: 10px;
  background-color: #262649;
  border-radius: 10px;
  color: whitesmoke;
  font-weight: 700;
  border: none;
`;

function StudentDataForm() {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: "",
    lastName: "",
    age: "",
    major: "",
    currentYear: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth must be in the past"),
    major: Yup.string().required("Major is required"),
    currentYear: Yup.string().required(
      "Current Year Classification is required"
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(createStudent(values));
      console.log("Student Created Successfully");
      resetForm();
    } catch (error) {
      console.error("Error creating student:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, handleChange, values }) => (
        <Form onSubmit={handleSubmit}>
          <FormTitle>Please Enter student Info</FormTitle>
          <label style={{ paddingBottom: "5px" }} htmlFor="firstName">
            First Name:
          </label>
          <Field
            onChange={handleChange}
            type="text"
            id="firstName"
            name="firstName"
            style={{ padding: "10px" }}
          />
          <ErrorMessageDiv name="firstName" component="div" />

          <label
            style={{ paddingBottom: "5px", paddingTop: "10px" }}
            htmlFor="lastName"
          >
            Last Name:
          </label>
          <Field
            onChange={handleChange}
            type="text"
            id="lastName"
            name="lastName"
            style={{ padding: "10px" }}
          />
          <ErrorMessageDiv name="lastName" component="div" />

          <label
            style={{ paddingBottom: "5px", paddingTop: "10px" }}
            htmlFor="age"
          >
            Birthdate:
          </label>
          <Field
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            style={{ padding: "10px" }}
          />

          <ErrorMessageDiv name="age" component="div" />

          <label
            style={{ paddingBottom: "5px", paddingTop: "10px" }}
            htmlFor="major"
          >
            Major:
          </label>
          <Field
            onChange={handleChange}
            type="text"
            id="major"
            name="major"
            style={{ padding: "10px" }}
          />
          <ErrorMessageDiv name="major" component="div" />

          <label
            style={{ paddingBottom: "5px", paddingTop: "10px" }}
            htmlFor="currentYear"
          >
            Current Year Classification:
          </label>
          <Field
            onChange={handleChange}
            as="select"
            id="currentYear"
            name="currentYear"
            style={{ padding: "10px" }}
          >
            <option value="">Select Year</option>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </Field>
          <ErrorMessageDiv name="currentYear" component="div" />

          <Button type="submit" disabled={isSubmitting}>
            Create Student
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default StudentDataForm;
