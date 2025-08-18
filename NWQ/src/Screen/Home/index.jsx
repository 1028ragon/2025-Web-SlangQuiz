import { Routes, Route, Link} from 'react-router-dom';
import "./Home.css";
import MainTitle from "../../Components/MainTitle"
import {ContactBtn, StartBtn, SettingBtn} from '../../Components/Button' 
function Home(){
return (
    <div className="home-screen">
        <div className="content-wrapper"> {/* 전체 콘텐츠를 감싸는 래퍼 */}
        {/* 타이틀 SVG 이미지 */}
        <MainTitle/>

        {/* 시작하기 버튼 */}
        <div className="start-button-group" >
            <Link to={'/start'}>
                <StartBtn/>
            </Link>
        </div>

        {/* 설정 및 문의하기 버튼 그룹 */}
        <div className="sub-button-group">
            <Link to={'/settings'}>
                <SettingBtn/>
            </Link>
            <Link to={'/requests'}>
                <ContactBtn/>            
            </Link>
        </div>
        </div>
    </div>
    );
}

export default Home;