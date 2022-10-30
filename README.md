# 토이프로젝트 "가위바위보"
> react,typescript,styled-component로 만든 가위바위보 게임 </br>
https://rock-scissors-paper-ts.netlify.app/

https://user-images.githubusercontent.com/78889402/198872322-5ef68c8a-bbcb-4678-b91d-da696263fb19.mov




## 1. 제작 기간
-  2022년 10월 9일(일) ~ 2022년 10월 10일(월) : 총 2일


## 2. 사용 기술
- React
- TypeScript
- Styled-component

## 3. 가위바위보 게임 설명

#### `게임규칙`
- user와 computer 중 먼저 3점을 획득하면 이기는 게임입니다.
- 게임결과는 로컬스토리지에 저장되어 브라우저를 껐다가 켜도 유지됩니다.
- 3점을 획득하여 게임이 종료되면 '초기화' 버튼을 누를 수 있습니다.
- '초기화' 버튼을 누르면 모든 것이 초기화되고 처음으로 돌아갑니다.

#### `user의 가위바위보`
- 가위, 바위, 보 버튼을 클릭합니다.

#### `computer의 가위바위보`
- user의 선택 후, '게임시작' 버튼을 누르면
- 4초 후 컴퓨터가 랜덤으로 결과를 도출해냅니다.

</br>

## 4. 핵심 문제 해결
### 4-1. 리액트 프로그래밍 모델과 setInterver, setTimeout의 부조화

- user의 가위바위보 선택 후, '게임시작' 버튼을 누르면 4초 후에(3->2->1->0) computer의 선택과 게임의 결과가 나옵니다. </br>
- 이를 위해 처음에는 setInterver로 1초마다 count를 -1해주고 setTimeout으로 4초 뒤에 게임 결과가 나오게 했습니다. </br>
- 하지만 리액트 프로그래밍 모델과 setInterver, setTimeout의 부조화로 내가 예상한 대로 작동하지 않는 문제점이 발견되었습니다. </br>
- 리액트는 지난 렌더링 상태에 대한 모든 것을 지워버리고 다시 렌더링하기 때문입니다. </br>
- "[리액트에서 setInterval 사용 시 문제점](https://velog.io/@jakeseo_me/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85%EC%8A%A4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EC%8B%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90)" 이 게시글을 읽고 Hook을 사용해야함을 확실히 깨달았습니다. </br>
- 또한 버튼을 눌렀을 때 setInterver이 실행되고 count가 0이 되었을 때 setInterver이 종료되며  </br> 
- 그 다음에 바로 setTimeout이 실행되도록 해야했는데 이는 첫 마운팅에도 렌더링해주는 useEffect로 구현할 수 없었습니다. </br>
- 그래서 useInterval Hook 과 useTimeout Hook으로 버튼을 눌렀을 때 구현되도록 구현할 수 있었습니다. </br>

<details>
<summary><b>useInterval 구현코드</b></summary>
<div markdown="1">
  
~~~javascript
//useInterval hook
import { useEffect, useRef } from "react";

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;

//useInterval hook 사용
useInterval(
   () => {
     if (typeof count === "number") {
       setCount(count - 1); // 3 -> 2 -> 1 -> 0
       setIntervalStop(count - 1); // 1-1 = 0 = 즉, false가 되어 useInterval이 종료됩니다.
     }
   },
   intervalStop ? 1000 : null // '게임시작'버튼을 눌면 intervalStop이 true가 되어 실행됩니다.
);
~~~
  
</div>
</details>

<details>
<summary><b>useTimeout 구현코드</b></summary>
<div markdown="1">
  
~~~javascript
//useTimeout hook
import { useRef, useEffect } from "react";

export default function useTimeout(callback: () => void, delay: number | null) {
  const stableCallback = useRef(callback);

  useEffect(() => {
    stableCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => stableCallback.current();

    if (typeof delay !== "number") return;

    const t = setTimeout(tick, delay);

    return () => clearTimeout(t);
  }, [delay]);
}


//useTimeout hook 사용
useTimeout(
   () => {
     const chioces = ["가위", "바위", "보"];
     setComChoice(chioces[Math.floor(Math.random() * 3)]);
   },
  battleState === "한판 더!" ? 4000 : null // '게임시작' 버튼을 누르면 버튼의 state가 '한판 더!'로 바뀌고 useTimeout이 실행됩니다.
);
~~~
  
</div>
</details>

### 4-2. useCallback으로 랜더링 최적화 그리고 함수형 업데이트
- 최상위 부모컴포넌트인 App.tsx를 보면 많은 state들로 인해 렌더링이 일어나고 있습니다. 
- 하지만 getBattleResult함수는 youChoice, comChoice state만을 필요로 합니다.
- 이에 렌더링을 최적화하고 올바른 state값이 들어오도록 useCallback에 종속성어레이로 감싸주었습니다.
- 또한 함수형 업데이트로 이전 상태를 직접 업데이트해주었고 렌더되는 과정에서 더 확실히 전의 값을 가져오도록 했습니다.

<details>
<summary><b>useCallback</b></summary>
<div markdown="1">
  
~~~javascript
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
~~~
  
</div>
</details>


### 4-3. 로컬스토리지에 게임결과 저장

- 게임의 Score를 나타내는 youScore, comScore와 게임의 승패를 보여주는 youChoice, comChoice를 로컬스토리지에 저장해주었습니다.
- 이에 브라우저를 껐다가 켜도 게임의 상황이 유지됩니다.
- 3점을 획득하여 최종 승패가 판결났을 때 '초기화' 버튼을 눌러 `localStorage.clear();`로 로컬스토리지가 비워지도록 했습니다.
- 또한 게임의 결과가 계속 쌓여야 하는데 이는 spread 연산자로 구현할 수 있었습니다.


<details>
<summary><b>youChoice, comChoice 로컬스토리지 저장</b></summary>
<div markdown="1">

~~~javascript
  useEffect(() => {
    getBattleResult();
    comChoice !== "" &&
      localStorage.setItem(
        "choices",
        JSON.stringify([...result, { youChoice, comChoice }])
      );
  }, [comChoice]);
~~~

</div>
</details>

<details>
<summary><b>youScore, comScore 로컬스토리지 저장</b></summary>
<div markdown="1">

~~~javascript
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
  }, [youScore, youScore, count]);
~~~

</div>
</details>

<details>
<summary><b>로컬스토리지에서 값 가져오기</b></summary>
<div markdown="1">

~~~javascript
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
~~~

</div>
</details>

</br>

## 5. 그 외 문제 해결

<details>
<summary>컴퓨터의 가위바위보 랜덤 선택 구현</summary>
<div markdown="1">

- '게임시작' 버튼을 누른 후, 정확히 4초 뒤에 컴퓨터는 '가위','바위','보' 중 하나를 고릅니다.
- `Math.floor(Math.random() * 3)`로 구현할 수 있었습니다.

~~~javascript
  useTimeout(
    () => {
      const chioces = ["가위", "바위", "보"];
      setComChoice(chioces[Math.floor(Math.random() * 3)]);
    },
    battleState === "한판 더!" ? 4000 : null // "한판 더!"면 실행 시작
  );
~~~

</div>
</details>

<details>
<summary>state의 타입이 여러개 일 때는 Type Narrowing</summary>
<div markdown="1">

- count는 number 3,2,1,0도 되고 string "VS", Win"이 되어 게임 상황도 나타내줍니다.
- 그래서 `const [count, setCount] = useState<number | string>("");`로 타입을 지정해주었는데
- 이 부분에서 "The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type." 오류가 발생했고

~~~javascript
  useInterval(
    () => {
        setCount(count - 1); // 3 -> 2 -> 1 -> 0
        setIntervalStop(count - 1); // 1-1 = false
      }
    intervalStop ? 1000 : null // intervalStop이 true면 실행 시작
  );
~~~

- Narrowing으로 해결할 수 있었습니다.

~~~javascript
  useInterval(
    () => {
      if (typeof count === "number") {
        setCount(count - 1); // 3 -> 2 -> 1 -> 0
        setIntervalStop(count - 1); // 1-1 = false
      }
    },
    intervalStop ? 1000 : null // intervalStop이 true면 실행 시작
  );
~~~

</div>
</details>

<details>
<summary>게임결과는 첫 게임이 끝난 후에 보여지도록 하기</summary>
<div markdown="1">

- 게임결과는 '게임시작' 버튼을 누른 후 4초에 나타나야합니다.
- 이는 `result.length > 0 &&` 이렇게 조건부 렌더링으로 구현할 수 있었습니다.
- [코드 보러가기](https://github.com/wjddms4107/rock_scissors_paper/blob/main/src/App.tsx#L180)

</div>
</details>

<details>
<summary>Styled-Componet의 타입지정과 props전달</summary>
<div markdown="1">

- 버튼이 '초기화'로 바뀌면 버튼은 빨간색이 됩니다.
- 이는 버튼에 `background={battleState}` props를 전달해주고 Styled-Component에 타입을 지정하여 구현할 수 있었습니다. 
-[코드 보러가기](https://github.com/wjddms4107/rock_scissors_paper/blob/main/src/App.style.ts#L33)

</div>
</details>

<details>
<summary>useEffect의 종속성어레이</summary>
<div markdown="1">

- [코드 보러가기](https://github.com/wjddms4107/rock_scissors_paper/blob/main/src/App.tsx#L110)
- [코드 보러가기](https://github.com/wjddms4107/rock_scissors_paper/blob/main/src/App.tsx#L119)

</div>
</details>    

<details>
<summary>인자만 다른 함수, 불필요한 else 문</summary>
<div markdown="1">

<details>
<summary>리팩토링 전</summary>
<div markdown="1">

~~~javascript
  const getYouScoreStore = () => {
const localYouScore = localStorage.getItem('youScore');
  if(localYouScore) {
    return JSON.parse(localYouScore)
  } else {
    return 3
  }
}

const getComScoreStore = () => {
  const localComScore = localStorage.getItem('comScore');
  if(localComScore) {
    return JSON.parse(localComScore)
  } else {
    return 3
  }
}
~~~

</div>
</details>

<details>
<summary>리팩토링 후</summary>
<div markdown="1">

~~~javascript
const getScore = (itemKey: "youScore" | "comScore") => {
  const localScore = localStorage.getItem(itemKey);

  if(localScore) {
    return JSON.parse(localScore)
  }

  return 3;
}
~~~

</div>
</details>


</div>
</details>    

### Reference

- 이 프로젝트는 빅픽쳐팀을 참조하여 학습목적으로 만들었습니다.
- 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
