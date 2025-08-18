import React, { createContext, useState, useEffect } from 'react';

// SettingsContext 생성: 하위 컴포넌트에서 볼륨 설정에 접근할 수 있도록 컨텍스트 객체를 만든다.
export const SettingsContext = createContext();

// SettingsProvider 컴포넌트: 앱 전체에 BGM·효과음 볼륨 상태를 제공하는 Provider 역할
export const SettingsProvider = ({ children }) => {
  // bgmVolume 상태 선언
  // 초기값: localStorage에 저장된 값이 있으면 불러오고, 없으면 0.5로 기본 설정
  const [bgmVolume, setBgmVolume] = useState(() => {
    const saved = localStorage.getItem('bgmVolume');
    return saved !== null ? Number(saved) : 0.5;
  });

  // effectVolume 상태 선언
  // 초기값: localStorage에 저장된 값이 있으면 불러오고, 없으면 0.5로 기본 설정
  const [effectVolume, setEffectVolume] = useState(() => {
    const saved = localStorage.getItem('effectVolume');
    return saved !== null ? Number(saved) : 0.5;
  });

  // bgmVolume이 변경될 때마다 localStorage에 최신 값을 저장
  useEffect(() => {
    localStorage.setItem('bgmVolume', bgmVolume);
  }, [bgmVolume]);

  // effectVolume이 변경될 때마다 localStorage에 최신 값을 저장
  useEffect(() => {
    localStorage.setItem('effectVolume', effectVolume);
  }, [effectVolume]);

  // Provider로 하위 컴포넌트에 상태와 상태 변경 함수를 전달
  return (
    <SettingsContext.Provider
      value={{
        bgmVolume,        // BGM 볼륨 값 (0.0 ~ 1.0)
        setBgmVolume,     // BGM 볼륨 변경 함수
        effectVolume,     // 효과음 볼륨 값 (0.0 ~ 1.0)
        setEffectVolume,  // 효과음 볼륨 변경 함수
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
