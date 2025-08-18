import React from 'react'
import { useNavigate } from 'react-router-dom'
import './InquiryPage.css'

const InquiryPage = () => {
  const navigate = useNavigate()

  return (
    <div className="inquiry-wrapper">
      <div className="inquiry-card">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className="inquiry-title">문의사항</h1>
        <p className="inquiry-text">
          문의사항이나 오류 신고는<br />
          <a href="mailto:seojunlee06@gmail.com" target='blink' className="inquiry-email">seojunlee06@gmail.com</a><br />
          로 문의 주세요
        </p>
      </div>
    </div>
  )
}

export default InquiryPage
