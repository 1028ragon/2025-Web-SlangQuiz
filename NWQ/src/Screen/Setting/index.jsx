import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SettingsContext } from '../../contexts/SettingsContext.jsx'
import './SettingsPage.css'
import { useSound } from '../../hooks/UseSound.js'
import PlingSound from '/audio/Pling-Sound.mp3';

const SettingsPage = () => {
  // SettingsContext에서 bgmVolume, effectVolume과 해당 값을 변경하는 함수들을 가져옵니다.
  const { bgmVolume, setBgmVolume, effectVolume, setEffectVolume } = useContext(SettingsContext)

  // 뒤로가기 네비게이션을 위해 useNavigate 훅을 사용합니다.
  const navigate = useNavigate()
  
   // Pling Sound.mp3 을 재생할 play 함수
    const playPling = useSound(PlingSound)
  
  return (
    <div className="settings-page-view">
      {/* 모바일 프레임을 감싸는 최상위 뷰 */}
      <div className="phone-frame">
        <div className="settings-card">
          {/* 카드 상단 헤더: 뒤로가기 버튼과 제목 */}
          <header className="card-header">
            <button
              className="back-btn"
              onClick={() => navigate(-1)}  // 이전 화면으로 돌아가기
            >
              ←
            </button>
            <h1 className="card-title">설정</h1>
          </header>

          {/* 카드 본문: BGM 및 효과음 볼륨 조절 슬라이더 */}
          <main className="card-content">
            <section className="setting-group">
              {/* 배경음악 레이블 */}
              <label htmlFor="bgm" className="setting-label">
                배경음악
              </label>
              <input
                id="bgm"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={bgmVolume}                       // Context로부터 가져온 현재 BGM 볼륨 값
                onChange={e => setBgmVolume(+e.target.value)} // 슬라이더 변경 시 Context 상태 업데이트
                className="setting-range bgm"
                style={{ '--value': `${bgmVolume * 100}%` }} // CSS 커스텀 프로퍼티로 그라데이션 적용
              />
            </section>

            <section className="setting-group">
              {/* 효과음 레이블 */}
              <label htmlFor="effect" className="setting-label">
                효과음
              </label>
             <input
         id="effect"
         type="range"
          min="0"
          max="1"
          step="0.01"
          value={effectVolume}
          onChange={e => {
           const v = +e.target.value;
            setEffectVolume(v);
           playPling();      // ← Pling Sound.mp3 재생
         }}
           className="setting-range effect"
           style={{ '--value': `${effectVolume * 100}%` }}
         /> 
            </section>
          </main>

          {/* 카드 하단: 문의사항 페이지로 이동하는 버튼 */}
          <footer className="card-footer">
            <Link to="/requests" className="inquiry-btn">
              문의사항
            </Link>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
