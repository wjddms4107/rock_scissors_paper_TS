import React from "react";
import { Paper, Rock, Scissors, Question } from "../../assets/images/index";
import UserChoiceButton from "./UserChoiceButton";
import * as Styled from "./UserChoice.style";

type Props = {
  youChoice: string;
  setYouChoice: React.Dispatch<React.SetStateAction<string>>;
};

function UserChoice({ youChoice, setYouChoice }: Props) {
  const choiceYouBattleImg = () => {
    switch (youChoice) {
      case "✌🏻":
        return Scissors;
      case "✊🏻":
        return Rock;
      case "🖐🏻":
        return Paper;
      default:
        return Question;
    }
  };

  return (
    <Styled.Container>
      <Styled.UserName>USER</Styled.UserName>
      <Styled.BattleChoiceImg src={choiceYouBattleImg()} alt="무엇을 냈나요?" />
      <Styled.RestLife>목숨 3개 남았습니다.</Styled.RestLife>
      <UserChoiceButton setYouChoice={setYouChoice} />
    </Styled.Container>
  );
}
export default UserChoice;
