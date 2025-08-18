import React, { useContext, useEffect, useRef } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';

const BgmPlayer = ({ src = '/audio/kerning-city.mp3', loop = true }) => {
  const { bgmVolume } = useContext(SettingsContext);
  const audioRef = useRef(null);

  // 1) 오디오 엘리먼트 생성
  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = bgmVolume;
    audioRef.current = audio;
    // 첫 유저 인터렉션에 재생 시도
    const onFirst = () => {
      audio.play().catch(() => {});
      window.removeEventListener('pointerdown', onFirst);
    };
    window.addEventListener('pointerdown', onFirst);
    return () => window.removeEventListener('pointerdown', onFirst);
  }, [src, loop]);

  // 2) 볼륨 변경 반영
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = bgmVolume;
  }, [bgmVolume]);

  return null;
};

export default BgmPlayer;