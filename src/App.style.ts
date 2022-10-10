import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BattleRountTimes = styled.h1`
  margin: 200px 0 100px;
  font-size: 30px;
  font-weight: bold;
`;

export const BattleInfo = styled.section`
  display: flex;
  gap: 10px;
`;

export const Count = styled.span`
  padding-top: 100px;
  font-size: 32px;
`;

export const GameButton = styled.button`
  width: 200px;
  height: 50px;
  margin: 80px 0 20px;
  border-radius: 6px;
  background-color: #f15587;
  font-size: 22px;
  font-weight: bold;
  color: white;
  box-shadow: 0 8px 0 rgb(210, 077, 117), 0 15px 20px rgba(0, 0, 0, 0.35);
  transition: 0.4s all ease-in;
  :active {
    padding-top: 10px;
    transform: translate(0, 4px);
    box-shadow: 0 4px 0 rgb(210, 077, 117), 0 8px 6px rgba(0, 0, 0, 0.45);
  }
`;

// <{ background: string }>`
// background-color: ${(props) =>
//   props.background === "다시 시작하기" ? Colors.red : Colors.blue50};
