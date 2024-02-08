import React from "react";
import { useSelector } from "react-redux";
import StudentDataForm from "../../components/StudentDataForm/StudentDataForm";
import StudentList from "../../components/StudentList/StudentList";
import styled from "styled-components";

const StudentFormContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
`;

const ContainerTitle = styled.h2`
  text-align: center;
  margin: 20px;
`;
const Span = styled.span`
  font-size: 16px;
`;

function AdministratorPortal() {
  const { userInfo } = useSelector((state) => state.auth);

  function capitalizeName(name) {
    const words = name.split(" ");

    const capitalizedWords = words.map((word) => {
      // Ensure the word is not empty
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return "";
      }
    });
    return capitalizedWords.join(" ");
  }

  return (
    <div>
      <ContainerTitle>
        Hello,{" "}
        <Span>
          {capitalizeName(userInfo.firstName)}{" "}
          {capitalizeName(userInfo.lastName)}
        </Span>
      </ContainerTitle>
      <StudentFormContainer>
        <StudentDataForm />
        <StudentList />
      </StudentFormContainer>
    </div>
  );
}

export default AdministratorPortal;
