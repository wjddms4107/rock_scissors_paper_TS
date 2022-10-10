import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const UserChoiceButton = styled.button`
  width: 50px;
  height: 50px;
  margin: 10px;
  font-size: 25px;
  border-radius: 50%;
  background-color: #ff99cc;
  box-shadow: 0 8px 0 rgb(216, 133, 175), 0 15px 20px rgba(0, 0, 0, 0.35);
  :active {
    padding-top: 10px;
    transform: translate(0, 4px);
    box-shadow: 0 8px 0 rgb(216, 133, 175), 0 8px 6px rgba(0, 0, 0, 0.45);
  }
`;
