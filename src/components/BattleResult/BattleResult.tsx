import React from "react";
import * as Styled from "./BattleResult.style";
import { ChoiceType } from "~/App";

function BattleResult({ youChoice, comChoice }: ChoiceType) {
  const getBattleResult = () => {
    switch (youChoice) {
      case "가위":
        switch (comChoice) {
          case "가위":
            return "Draw😶";
          case "바위":
            return "Lose😭";
          default:
            return "Win🥳";
        }

      case "바위":
        switch (comChoice) {
          case "가위":
            return "Win🥳";
          case "바위":
            return "Draw😶";
          default:
            return "Lose😭";
        }
      default:
        switch (comChoice) {
          case "가위":
            return "Lose😭";
          case "바위":
            return "Win🥳";
          default:
            return "Draw😶";
        }
    }
  };

  return (
    <Styled.Container>
      {getBattleResult()} (user {youChoice} | computer {comChoice})
    </Styled.Container>
  );
}

export default BattleResult;
