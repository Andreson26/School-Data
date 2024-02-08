import styled from "styled-components";

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToggleButton = styled.button`
  background-color: transparent;
  filter: ${(props) => props.theme.iconColor1};
  border: none;
  cursor: pointer;
  outline: none;
`
  