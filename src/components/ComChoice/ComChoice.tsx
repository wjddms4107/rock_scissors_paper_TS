import React from "react";
import { Paper, Rock, Scissors, Question } from "../../assets/images/index";
import * as Styled from "./ComChoice.style";

type Props = {
  comChoice: string;
};

function ComChoice({ comChoice }: Props) {
  const choiceComBattleImg = () => {
    switch (comChoice) {
      case "✌🏻가위✌🏻":
        return Scissors;
      case "✊🏻주먹✊🏻":
        return Rock;
      case "🖐🏻보🖐🏻":
        return Paper;
      default:
        return Question;
    }
  };
  return (
    <Styled.Container>
      <Styled.ComName>COMPUTER</Styled.ComName>
      <Styled.BattleChoiceImg src={choiceComBattleImg()} alt="무엇을 냈나요?" />
      <Styled.RestLife>목숨 3개 남았습니다.</Styled.RestLife>
      <Styled.ComChoice>{comChoice}</Styled.ComChoice>
    </Styled.Container>
  );
}

export default ComChoice;
