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
        value="✌🏻"
        onClick={(e) => handleClick(e)}
      >
        ✌🏻
      </Styled.UserChoiceButton>
      <Styled.UserChoiceButton
        type="button"
        value="✊🏻"
        onClick={(e) => handleClick(e)}
      >
        ✊🏻
      </Styled.UserChoiceButton>
      <Styled.UserChoiceButton
        type="button"
        value="🖐🏻"
        onClick={(e) => handleClick(e)}
      >
        🖐🏻
      </Styled.UserChoiceButton>
    </Styled.Container>
  );
}

export default UserChoiceButton;
