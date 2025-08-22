import { useNavigate } from "react-router-dom";
import './SetNickName.css';
import { useState } from 'react';
import { submitNicknameApi } from "../../api/useUserSubmit.js";
import ErrorMSG from "../../Components/errorMSG/index.jsx";
import http from "../../api/https.js";

export default function SetNickName() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [errorMSG, setErrorMSG] = useState("");
    const handleSubmit = async () => {
        // ✅ 1. 새로운 변수에 공백 제거한 값을 할당, 유효성 검사를 위한 정규식 정의
        const trimmedNickname = nickname.trim();
        if (trimmedNickname.length === 0) {
            setErrorMSG('닉네임을 입력해주세요.');
            return;
        }
        const specificNicknameRegex = /[^a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]/;
        
        // ✅ 2. 정규식의 test 메소드를 사용하여 유효성 검사
        if (specificNicknameRegex.test(trimmedNickname)) {
            setErrorMSG('닉네임에는 한글, 영문, 숫자만 사용할 수 있습니다.');
            return;
        }
        if (1 > trimmedNickname.length || trimmedNickname.length > 5) {
            setErrorMSG('닉네임은 1자 이상 5자 이하로 입력해주세요.');
            return;
        }


        try {
            // ✅ 3. API에 공백 제거한 값을 객체 형태로 전송
            setErrorMSG("")
            await http.post('/start', { nickname: trimmedNickname });
            navigate('/start/quiz');
        } catch (error) {
            console.error(error);
            navigate('/start/quiz'); 
        }
    };

    return (
        <div className="nickname-card">
            <button className="nickname-back-button" onClick={() => navigate(-1)}>
                ←
            </button>
            <h1 className="nickname-title">닉네임 설정</h1>
            <input
                type="text"
                value={nickname}
                // ✅ 4. 입력 시 에러 메시지 초기화로 UX 개선
                onChange={(e) => {
                    setNickname(e.target.value);
                    setErrorMSG("");
                }}
                placeholder="닉네임을 입력하세요(1~5자)"
            />
            {/*errorMSG가 참 상태일 때만 ErrorMSG 컴포넌트 렌더링 */}
            {errorMSG && <ErrorMSG errorMSG = {errorMSG}/>}
            <button
                type="submit"
                className="nickname-button"
                onClick={handleSubmit}
            >
                시작
            </button>
        </div>
    );
}