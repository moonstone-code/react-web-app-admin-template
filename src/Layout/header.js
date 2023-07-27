import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CallAlert } from '../utils/httpCommon';
import { useCookies } from "react-cookie";

 

function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    // alert(cookies.token)
    const navigate = useNavigate();
    const logout = () => {
        try { 
            setTimeout(() => {
                localStorage.clear();
                removeCookie("token");
                navigate("/login");
            }, 1000);
        } catch (error) {
            CallAlert('error', error);
        }
    }

    return (
        <>
            <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
                <div className="container">
                    <Link to="/main" className="navbar-brand">
                        <span className="brand-text font-weight-light">Company Name</span>
                        {/* <span className="brand-text font-weight-light">Suzlon One Earth</span> */}
                    </Link>
                    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                        {/* <Link to="/main"> */}
                            {/* <img src="../../public/dist/img/AdminLTELogo.png" alt="Company ALT" className="img-responsive" title="Company ALT" /> </Link> */}
                         {/* <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href="#" className="nav-link">Home</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Contact</a>
                            </li>
                        </ul> */}

                    </div>
                    <ul className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        <li className="nav-item dropdown">
                            <a id="dropdownSubMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">{localStorage.getItem('s_user_name')}</a>
                            <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow">
                                <li><Link to="/user/profile" className="dropdown-item">Profile</Link></li>
                                <li><a href="#" className="dropdown-item" onClick={logout}>Logout</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                                <i className="fas fa-th-large"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header