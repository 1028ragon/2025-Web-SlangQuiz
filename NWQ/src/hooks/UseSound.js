import { useContext, useEffect, useRef } from 'react'
import { SettingsContext } from '../../src/contexts/SettingsContext'

/**
 * src: 효과음 파일 경로 (public/audio/…)
 * 반환값: play() 함수를 호출하면 해당 효과음이 설정된 볼륨으로 재생됩니다.
 */
export function useSound(src) {
  const { effectVolume } = useContext(SettingsContext)
  const audioRef = useRef(null)

  // 1) src 변경 시 오디오 객체 생성
  useEffect(() => {
    const audio = new Audio(src)
    audio.volume = effectVolume
    audioRef.current = audio
  }, [src])

  // 2) effectVolume 변경 시 볼륨만 업데이트
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = effectVolume
    }
  }, [effectVolume])

  // 재생 함수
  const play = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {
      // 모바일 첫 사용자 터치 필요 시
      const onFirst = () => {
        audioRef.current.play().catch(() => {})
        window.removeEventListener('pointerdown', onFirst)
        window.removeEventListener('touchend', onFirst)
        window.removeEventListener('click', onFirst)
      }
      window.addEventListener('pointerdown', onFirst)
      window.addEventListener('touchend', onFirst)
      window.addEventListener('click', onFirst)
    })
  }

  return play
}
