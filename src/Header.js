import 'bootstrap/dist/css/bootstrap.css';
import './Header.css';
import logo from './logo.jpg';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import AuthenticationService from './AuthenticationService';

function Header() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
    return(
        <header class="header-css">
            <div class="shadow-lg p-3 bg-white rounded">
                <nav class="navbar navbar-expand-lg navbar-custom">
                        <a class="navbar-brand" href="#">
                        <img src={logo} alt="..." height="50" />
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto custom-ul">   
                            {!isUserLoggedIn && <li class="nav-item nav-link active"><Link class="nav-link active text-dark" to="/">Home</Link> </li>}
                            {isUserLoggedIn && <li class="nav-item nav-link active"><Link class="nav-link active text-dark" to="/welcome">Home</Link> </li>}
                            {isUserLoggedIn && <li class="nav-item nav-link active"><Link class="nav-link active text-dark" to="/about">About</Link></li>}
                            {isUserLoggedIn && <li class="nav-item nav-link active"><Link class="nav-link active text-dark" to="/profile">Profile</Link></li>}
                            </ul>
                        </div>
                        {!isUserLoggedIn && <li class="custom-li">
                            <a class="nav-link text-dark">
                                <span class="border border-dark rounded h-25 d-inline-block w-70 p-2">
                                <Link class="nav-link active text-dark" to="/register">Sign Up</Link></span>
                            </a>
                        </li>}
                        {isUserLoggedIn && <li class="custom-li"><a class="nav-link text-dark">
                        <span class="border border-dark rounded h-25 d-inline-block w-70 p-2">
                        <Link class="nav-link active text-dark" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>
                        </span>
                        </a>
                        </li>}
                        
                </nav>
            </div>
        </header>
    )
}

export default Header;