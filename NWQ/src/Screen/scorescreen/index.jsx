import { useState, useEffect } from 'react';
import './scorescreen.css'; 
import { Link } from 'react-router-dom';
import ScoreImage from './scoreimage';
import axios from 'axios';

//import TestDTO from "./testDTO"; //테스트용 더미 데이터 호출용


function Scorescreen() {
   const [score, setScore] = useState(0); //
   const [playerName, setPlayerName] = useState("플레이어"); //

   /* fetch에서 axios로 변경 */
   useEffect(() => {
      const userId = 1;

      axios.get(`http://localhost:8080/users/${userId}/score/recent`)
         .then(Response => {
            const data = Response.data;

            const mappedData = {
               status: data.id,
               message: data.message,
               nickname: data.nickname,
               score: data.score
            };

            console.log("서버로부터 받은 매핑된 데이터:", mappedData);

            setScore(mappedData.score);
            setPlayerName(mappedData.nickname || "플레이어");
         })
         .catch(error => {
            console.error('데이터 가져오기 오류: ',error);
            setScore(0);
            setPlayerName("플레이어");
         });
   }, []);


/* 더미 데이터 호출 용*/
/*
function Scorescreen() {
   const [score, setScore] = useState(0); //
   const [playerName, setPlayerName] = useState("플레이어"); //

   useEffect(() => {
      // 테스트용 DTO 객체 생성
      const testData = new TestDTO();

      // DTO에서 값 추출
      setScore(testData.getScore());
      setPlayerName(testData.getUsername());
   }, []); //실제 호출하는 fetch로 변경
*/

   const handleRetryClick = () => { 
      console.log('다시하기 버튼 클릭'); };
   const handleHomeClick = () =>  { 
      console.log('홈 버튼 클릭'); };
   const handleSettingClick = () =>  {
      console.log('설정 버튼 클릭'); };

   return ( 
      <>
         {/* 유저 이름 */}
         <div id="name-id">{playerName}님!</div>

         {/* 현재 점수 */}
         <ScoreImage score={score} />

         {/* 점수 */}
         <div id="now-score">{score}</div>
         <div id="basic-score">/100</div>

         {/* 다시하기 */}
         <Link to="/quiz" className="retry-button" onClick={handleRetryClick}>
         <span>다시하기</span></Link>

         {/* 홈으로 이동 */}
         <Link to="/home" className="home-button" onClick={handleHomeClick}><span>홈</span></Link>

         {/* 설정으로 이동 */}
         <Link to="/settings" className="setting-button" onClick={handleSettingClick}><span>설정</span></Link>
         <div className='back-rectangle'></div>
      </>
   );
}

export default Scorescreen;