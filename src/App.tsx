import React, { useState, useCallback, useEffect } from "react";
import * as Styled from "./App.style";
import { UserChoice, ComChoice, BattleResult } from "./components";
import useInterval from "./hooks/useInterval";
import useTimeout from "./hooks/useTimeout";

export type ChoiceType = {
  youChoice: string;
  comChoice: string;
};

const getResult = () => {
  const localResultStore = localStorage.getItem("choices");

  if (localResultStore) {
    return JSON.parse(localResultStore);
  }

  return [];
};

const getScore = (itemKey: "youScore" | "comScore") => {
  const localScore = localStorage.getItem(itemKey);

  if (localScore) {
    return JSON.parse(localScore);
  }

  return 3;
};

function App() {
  const [youScore, setYouScore] = useState<number>(getScore("youScore"));
  const [comScore, setComScore] = useState<number>(getScore("comScore"));
  const [count, setCount] = useState<number | string>("");
  const [intervalStop, setIntervalStop] = useState<boolean | number>(false);
  const [youChoice, setYouChoice] = useState<string>("");
  const [comChoice, setComChoice] = useState<string>("");
  const [battleState, setBattleState] = useState<string>("게임시작 🕹");
  const [result, setResult] = useState<ChoiceType[]>([]);

  useInterval(
    () => {
      if (typeof count === "number") {
        setCount(count - 1); // 3 -> 2 -> 1 -> 0
        setIntervalStop(count - 1); // 1-1 = false
      }
    },
    intervalStop ? 1000 : null // intervalStop이 true면 실행 시작
  );

  const getBattleResult = useCallback(() => {
    switch (comChoice !== "" && youChoice) {
      case "가위":
        switch (comChoice) {
          case "가위":
            setCount("무승부");
            break;
          case "바위":
            setCount("패배");
            setYouScore((prev) => prev - 1);
            break;
          default:
            setCount("승리");
            setComScore((prev) => prev - 1);
            break;
        }
        break;
      case "바위":
        switch (comChoice) {
          case "가위":
            setCount("승리");
            setComScore((prev) => prev - 1);
            break;
          case "바위":
            setCount("무승부");
            break;
          default:
            setCount("패배");
            setYouScore((prev) => prev - 1);
            break;
        }
        break;
      default:
        switch (comChoice) {
          case "가위":
            setCount("패배");
            setYouScore((prev) => prev - 1);
            break;
          case "바위":
            setCount("승리");
            setComScore((prev) => prev - 1);
            break;
          default:
            setCount("무승부");
            break;
        }
        break;
    }
  }, [comChoice, youChoice]);

  useTimeout(
    () => {
      const chioces = ["가위", "바위", "보"];
      setComChoice(chioces[Math.floor(Math.random() * 3)]);
    },
    battleState === "한판 더!" ? 4000 : null // "재대결하기"면 실행 시작
  );

  useEffect(() => {
    getBattleResult();
    comChoice !== "" &&
      localStorage.setItem(
        "choices",
        JSON.stringify([...result, { youChoice, comChoice }])
      );
  }, [comChoice]);

  useEffect(() => {
    localStorage.setItem("youScore", JSON.stringify(youScore));
    localStorage.setItem("comScore", JSON.stringify(comScore));

    if (comChoice !== "" && getScore("youScore") === 0) {
      window.alert("COMPUTER 승리!");
      setBattleState("초기화");
    } else if (comChoice !== "" && getScore("comScore") === 0) {
      window.alert("USER 승리!");
      setBattleState("초기화");
    }

    (count === "Draw" || "Lose" || "Win") && setResult(getResult());
  }, [youScore, comScore, count]);

  const clickBattleButton = () => {
    if (battleState === "한판 더!") {
      setCount("VS");
      setBattleState("게임시작 🕹");
      setComChoice("");
    } else if (battleState === "초기화") {
      localStorage.clear();
      setBattleState("게임시작 🕹");
      setCount("VS");
      setComChoice("");
      setYouChoice("");
      setYouScore(3);
      setComScore(3);
    } else if (battleState === "게임시작 🕹") {
      if (youChoice === "") {
        return window.alert("'가위/바위/보' 중 하나를 선택해주세요!");
      }
      setIntervalStop(true); // useInterval실행
      setCount(3);
      setBattleState("한판 더!"); // useTimeout실행(4초)
    }
  };

  return (
    <Styled.Container>
      <Styled.BattleRoundInfo>먼저 3점을 획득하면 승리!</Styled.BattleRoundInfo>

      <Styled.BattleInfo>
        <UserChoice
          youChoice={youChoice}
          setYouChoice={setYouChoice}
          comScore={comScore}
        />

        <Styled.ScoreLine>:</Styled.ScoreLine>
        <Styled.Count>
          {battleState === "게임시작 🕹" ? "VS" : count}
        </Styled.Count>

        <ComChoice comChoice={comChoice} youScore={youScore} />
      </Styled.BattleInfo>

      <Styled.GameButton background={battleState} onClick={clickBattleButton}>
        {battleState}
      </Styled.GameButton>

      {result.length > 0 && (
        <Styled.GameResult>
          {"< "}게임결과{" >"}
        </Styled.GameResult>
      )}

      {result.length > 0 &&
        result.map((item: ChoiceType) => (
          <BattleResult
            key={item.youChoice}
            youChoice={item.youChoice}
            comChoice={item.comChoice}
          />
        ))}
    </Styled.Container>
  );
}

export default App;
