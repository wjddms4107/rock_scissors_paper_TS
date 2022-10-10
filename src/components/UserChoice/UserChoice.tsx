import React from "react";
import { Paper, Rock, Scissors, Question } from "../../assets/images/index";
import UserChoiceButton from "./UserChoiceButton";
import * as Styled from "./UserChoice.style";

type Props = {
  youChoice: string;
  setYouChoice: React.Dispatch<React.SetStateAction<string>>;
  comScore: number;
};

function UserChoice({ youChoice, setYouChoice, comScore }: Props) {
  const choiceYouBattleImg = () => {
    switch (youChoice) {
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
      <Styled.UserName>user</Styled.UserName>
      <Styled.RestLife>{3 - comScore}</Styled.RestLife>
      <Styled.BattleChoiceImg src={choiceYouBattleImg()} alt="무엇을 냈나요?" />
      <UserChoiceButton setYouChoice={setYouChoice} />
    </Styled.Container>
  );
}
export default UserChoice;
