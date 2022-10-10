import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BattleRoundInfo = styled.div`
  margin: 100px 0 60px;
  font-size: 30px;
`;

export const BattleInfo = styled.section`
  display: flex;
  gap: 10px;
`;

export const ScoreLine = styled.span`
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
`;

export const Count = styled.span`
  padding-top: 220px;
  font-size: 30px;
`;

export const GameButton = styled.button<{ background: string }>`
  width: 200px;
  height: 50px;
  margin: 40px 0 20px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.background === "초기화" ? "red" : "#f15587"};
  font-size: 22px;
  font-weight: bold;
  color: white;
  box-shadow: ${(props) =>
    props.background === "초기화"
      ? "0 8px 0 rgb(230, 0, 0), 0 15px 20px rgba(0, 0, 0, 0.35)"
      : "0 8px 0 rgb(210, 077, 117), 0 15px 20px rgba(0, 0, 0, 0.35)"};
  transition: 0.4s all ease-in;
  :active {
    padding-top: 10px;
    transform: translate(0, 4px);
    box-shadow: 0 4px 0 rgb(210, 077, 117), 0 8px 6px rgba(0, 0, 0, 0.45);
  }
`;

export const GameResult = styled.div`
  font-size: 27px;
  padding-top: 30px;
  padding-bottom: 15px;
`;
