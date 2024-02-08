import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    color: white;
  }
`;

export const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1200px) {
    order: 1;
    flex-direction: column;
    width: 100%;
  }
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => (props.border ? props.theme.blue : "white")};
  padding: 6px 12px;
  outline: none;
  border: ${(props) =>
    props.border ? `1px solid ${props.theme.blue}` : "none"};
  border-radius: 10px;
  background-color: ${(props) =>
    props.background ? props.theme.blue : "none"};
  margin-right: ${(props) => (props.border ? "10px" : "none")};
  cursor: pointer;
  color: ${(props) => (props.border ? props.theme.text : "white")};
`;
