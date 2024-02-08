import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ContainerDiv = styled.div`
  padding: 0 20px;
`;

const ContainerTitle = styled.h2`
  text-align: center;
  margin: 20px;
`;
const Span = styled.span`
  font-size: 16px;
`;

function Home() {
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
      {userInfo ? (
        <ContainerDiv>
          <ContainerTitle>
            Hello,{" "}
            <Span>
              {capitalizeName(userInfo.firstName)}{" "}
              {capitalizeName(userInfo.lastName)}
            </Span>
          </ContainerTitle>
          <p>
            Click on Administrator portal tab to access, add, modify or delete
            your student data
          </p>
        </ContainerDiv>
      ) : (
        <h1>Home</h1>
      )}
    </div>
  );
}

export default Home;
