import React from "react";
import * as Styled from "./UserChoiceButton.style";

type Props = {
  setYouChoice: React.Dispatch<React.SetStateAction<string>>;
};

function UserChoiceButton({ setYouChoice }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setYouChoice((e.target as HTMLButtonElement).value);
  };

  return (
    <Styled.Container>
      <Styled.UserChoiceButton
        type="button"
        value="가위"
        onClick={(e) => handleClick(e)}
      >
        ✌🏻
      </Styled.UserChoiceButton>
      <Styled.UserChoiceButton
        type="button"
        value="바위"
        onClick={(e) => handleClick(e)}
      >
        ✊🏻
      </Styled.UserChoiceButton>
      <Styled.UserChoiceButton
        type="button"
        value="보"
        onClick={(e) => handleClick(e)}
      >
        🖐🏻
      </Styled.UserChoiceButton>
    </Styled.Container>
  );
}

export default UserChoiceButton;
