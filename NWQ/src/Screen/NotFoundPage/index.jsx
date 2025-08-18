import './NotFoundPage.css'
import { Routes, Route, Link} from 'react-router-dom';
import NotFound from "/svg/404NotFound.svg"
export default function NotFoundPage(){
    return(
        <div className='NotFoundPage-screen' >
            <Link to={'/'}>
                <img src={NotFound} alt="" className='NotFoundSVG' />
            </Link>

        </div>
    )
}