import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CounterProvider } from './hooks/CounterContext.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CounterProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CounterProvider>
  </StrictMode>
);

/**
 * StrictMode
 * "개발환경에서"
 * 컴포넌트에서 일반적인 버그를 빠르게 찾을 수 있도록 합니다.
 * 
 * 어떤 버그를 찾냐?
 * 1. 컴포넌트가 순수하지 않은 렌더링으로 인한 버그
 * 2. Effect 클린업이 누락되어 발생한 버그
 * 3. Ref 클린업이 누락되어 발생한 버그
 * 4. 더 이상 사용되지 않는 API를 사용
 * 
 * 어떻게 찾냐?
 * 컴포넌트 렌더링을 2번 실행해서 두 개의 결과가 다르면 순수성이 깨진 것.
 * (리액트의 모든 컴포넌트는 순수함수라는 가정 하에 동작한다.
 * 순수함수는 같은 input에 대해 항상 일관된 결과를 반환해야한다. (외부로 인한 부수 효과가 없는 것이 순수함수이다.)
 * 두 가지의 동작이 다르다면 이는 순수성이 깨진 것!)
 * 또, 언마운트에도 제거되지 않는 연결이 있다면 클린업 누락
 * 
*/