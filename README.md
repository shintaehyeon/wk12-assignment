# OSS Week 12 - React Hooks Playground

- 작성자: 22101046 신태현
- Vercel 배포 URL: https://wk12-assignment.vercel.app/

## 실행 방법

```bash
npm install
npm run dev
npm run build
```

## 1. Source Code Exploration

### Project Structure
- `src/App.jsx`: 상단 헤더와 4개 Lab 탭을 관리하며, 선택된 Lab 컴포넌트만 렌더링합니다. 탭을 바꾸면 이전 Lab은 언마운트됩니다.
- `src/components/Lab1_EffectTimer.jsx`: `useEffect`와 `setInterval`로 1초마다 카운트가 증가하고, 언마운트 시 Cleanup으로 타이머를 정리합니다.
- `src/components/Lab2_TimerControl.jsx`: `running` State와 Dependency Array(`[running]`)를 이용해 Start, Stop, Reset을 제어합니다.
- `src/components/Lab3_InputFocus.jsx`: `useRef`로 `<input>` DOM에 접근하여 Focus 및 입력값 초기화(Clear)를 수행합니다.
- `src/components/Lab4_RefTimer.jsx`: `useRef`에 Timer ID를 보관해 타이머를 제어하고, 언마운트 시 Cleanup으로 정리합니다.

### `useEffect`와 `useRef` 동작 원리
- **useEffect**: 렌더링 이후 부수 효과(타이머 등)를 실행합니다. Dependency Array(`[]`, `[running]` 등)로 재실행 조건을 정하고, 반환하는 Cleanup 함수로 언마운트나 재실행 직전에 기존 타이머를 정리합니다.
- **useRef**: `{ current: 초기값 }` 형태로 값을 보관합니다. `useState`와 달리 `.current` 값을 바꿔도 리렌더링이 발생하지 않으며, DOM 참조나 타이머 ID 보관에 사용합니다.

### Code Analysis

**1) `useEffect` 코드 (`src/components/Lab2_TimerControl.jsx`)**

```jsx
useEffect(() => {
  if (!running) return;
  const timerId = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);
  return () => {
    clearInterval(timerId);
  };
}, [running]);
```

`running`이 `true`로 바뀌면 `setInterval`이 시작되고, `setCount((prev) => prev + 1)` 함수형 업데이트로 최신 상태를 기준으로 1씩 증가합니다. `running`이 `false`가 되거나 탭이 전환되면 Cleanup에서 `clearInterval(timerId)`가 실행되어 타이머가 정리됩니다.

**2) `useRef` 코드 (`src/components/Lab4_RefTimer.jsx`)**

```jsx
const timerRef = useRef(null);

const start = () => {
  if (timerRef.current) return;
  setRunning(true);
  timerRef.current = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);
};
```

타이머 ID는 화면에 표시할 필요가 없으므로 `timerRef.current`에 저장해 불필요한 리렌더링을 막습니다. `if (timerRef.current) return;` 조건으로 이미 실행 중인 타이머가 있을 때 중복 시작을 방지합니다.

## 2. Lab 비교 분석

1. **`useEffect`의 Dependency Array가 필요한 이유는?**
   Dependency Array를 생략하면 매 렌더링마다 Effect가 다시 실행되어 타이머가 계속 새로 만들어집니다. `[]`(마운트 시 1회)나 `[running]`(특정 상태 변경 시)처럼 실행 시점을 제어하기 위해 필요합니다.

2. **Cleanup을 사용하지 않으면 어떤 문제가 발생할 수 있는가?**
   컴포넌트가 언마운트되거나 Effect가 재실행되어도 이전 타이머가 백그라운드에서 계속 남아 메모리 누수와 타이머 중복 실행(속도가 빨라지는 현상)이 발생합니다. 특히 개발 환경의 `StrictMode`에서는 마운트-언마운트-재마운트가 한 번 더 실행되므로 Cleanup이 없으면 처음부터 타이머가 2개 동작합니다.

3. **`useState`와 `useRef`의 가장 중요한 차이는?**
   값 변경 시 리렌더링 여부입니다. `useState`는 값이 바뀌면 화면을 다시 그리지만, `useRef`는 `.current` 값을 바꿔도 리렌더링이 일어나지 않습니다.

4. **LAB 2와 LAB 4의 Timer 관리 방식은 어떻게 다른가?**
   - **LAB 2 (`useEffect`)**: `running` 상태 변화에 따라 `useEffect`가 자동으로 타이머를 켜고 Cleanup으로 끄는 선언적 방식입니다.
   - **LAB 4 (`useRef`)**: `start`, `stop` 핸들러에서 직접 `setInterval`과 `clearInterval`을 호출하고, 타이머 ID만 `timerRef.current`에 보관하는 방식입니다. (언마운트 정리용 `useEffect`만 보조로 사용)

## 3. Customizing 내역

- `index.html`: HTML 구조 정리 및 브라우저 탭 제목을 `12주차 과제 22101046 신태현`으로 변경
- `src/App.jsx`: 헤더 제목(`12주차 과제 22101046 신태현`), 학번 표기 및 설명 문구 수정
- `src/App.css`: 배경·활성 탭·버튼·카운트 색상을 인디고 계열로 변경하고, 탭과 버튼에 `:hover` 효과 추가
- `src/components/Lab4_RefTimer.jsx`: (선택 기능) `formatTime` 함수를 추가해 타이머를 `MM:SS` 형식으로 표시
