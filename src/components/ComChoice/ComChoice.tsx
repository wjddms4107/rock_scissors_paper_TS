import React from "react";
import { Paper, Rock, Scissors, Question } from "../../assets/images/index";
import * as Styled from "./ComChoice.style";

type Props = {
  comChoice: string;
  comScore: number;
  youScore: number;
};

function ComChoice({ comChoice, comScore, youScore }: Props) {
  const choiceComBattleImg = () => {
    switch (comChoice) {
      case "가위":
        return Scissors;
      case "바위":
        return Rock;
      case "보":
        return Paper;
      default:
        return Question;
    }
  };
  return (
    <Styled.Container>
      <Styled.ComName>computer</Styled.ComName>
      <Styled.RestLife>{3 - youScore}</Styled.RestLife>
      <Styled.BattleChoiceImg src={choiceComBattleImg()} alt="무엇을 냈나요?" />
      <Styled.ComChoice>{comChoice}</Styled.ComChoice>
    </Styled.Container>
  );
}

export default ComChoice;
