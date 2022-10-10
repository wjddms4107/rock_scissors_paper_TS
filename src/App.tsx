import React, { useState } from "react";
import * as Styled from "./App.style";
import { UserChoice, ComChoice, BattleResult } from "./components";
import useInterval from "./hooks/useInterval";
import useTimeout from "./hooks/useTimeout";

function App() {
  // const [youScore, setYouScore] = useState<number>(getScore("youScore"));
  // const [comScore, setComScore] = useState<number>(getScore("comScore"));
  const [count, setCount] = useState<number | string>("VS");
  const [intervalStop, setIntervalStop] = useState<boolean | number>(false);
  const [youChoice, setYouChoice] = useState<string>("");
  const [comChoice, setComChoice] = useState<string>("생각중...");
  const [battleState, setBattleState] = useState<string>("게임시작");
  // const [result, setResult] = useState<ChoiceType[]>([]);

  useInterval(
    () => {
      if (typeof count === "number") {
        setCount(count - 1); // 3 -> 2 -> 1 -> 0
        setIntervalStop(count - 1); // 1-1 = false
      }
    },
    intervalStop ? 1000 : null // intervalStop이 true면 실행 시작
  );

  useTimeout(
    () => {
      const chioces = ["✌🏻가위✌🏻", "✊🏻주먹✊🏻", "🖐🏻보🖐🏻"];
      setComChoice(chioces[Math.floor(Math.random() * 3)]);
    },
    battleState === "한판 더!" ? 4000 : null // "재대결하기"면 실행 시작
  );

  const clickBattleButton = () => {
    setIntervalStop(true); // useInterval실행
    setCount(3);
    setBattleState("한판 더!");
  };

  return (
    <Styled.Container>
      <Styled.BattleRountTimes>
        {"< "}1 라운드 🧚‍♀️{" >"}
      </Styled.BattleRountTimes>

      <Styled.BattleInfo>
        <UserChoice youChoice={youChoice} setYouChoice={setYouChoice} />

        <Styled.Count>{count}</Styled.Count>

        <ComChoice comChoice={comChoice} />
      </Styled.BattleInfo>

      <Styled.GameButton onClick={clickBattleButton}>
        {battleState}
      </Styled.GameButton>

      <BattleResult />
    </Styled.Container>
  );
}

export default App;
