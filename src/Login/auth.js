import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AxiosBaseURL, Error_handling, Success_handling, CallAlert, GetBaseURL } from '../utils/httpCommon';

function Auth() {
    const [cookies, setCookie] = useCookies(["token"]);
    // const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    let data = { password: "", username: "" }
    const [authInput, setAuthInput] = useState(data);
    const { register, handleSubmit, formState: { errors }, } = useForm({ mode: "onBlur" });
    const navigate = useNavigate();
    // localStorage.clear();
    const storeInputData = (e) => {
        e.preventDefault();
        setAuthInput({
            ...authInput,
            [e.target.name]: e.target.value
        })
    }

    // useCookies
    const doLogin = (inputs) => {
        try {
            let data = { username: inputs.username, password: inputs.password };
            AxiosBaseURL({ url: '/login', method: 'POST', data: data })
                .then((response) => {
                    CallAlert('success', Success_handling(response), 5000);
                    localStorage.setItem('n_user_id', response.data.data.n_user_id);
                    localStorage.setItem('s_email', response.data.data.s_email);
                    localStorage.setItem('s_profile_path', response.data.data.s_profile_path);
                    localStorage.setItem('s_role', response.data.data.s_role);
                    localStorage.setItem('s_user_id', response.data.data.s_user_id);
                    localStorage.setItem('s_user_name', response.data.data.s_user_name);
                    setCookie("token", response.data.tokken, { path: GetBaseURL });
                    setTimeout(() => {
                        navigate("/main");
                    }, 2000);
                })
                .catch(function (error) {
                    CallAlert('error', Error_handling(error), 5000);
                })
                .finally(function () {
                    console.log('Completed');
                });
        } catch (error) {
            CallAlert('error', error);
        }

    }

    return (
        <>
            <span className="hold-transition login-page">
                <div className="login-box">

                    <div className="card">
                        <div className="card-body login-card-body">
                            <div className="login-logo">
                                <img src="https://www.suzlon.com/images/suzlon-logo.png" alt="Suzlon Energy Ltd Logo" className="img-responsive" title="Suzlon Energy Ltd" />
                            </div>
                            {/* <p className="login-box-msg">Sign in to start your Session</p> */}
                            <form>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Username" name='username' onChange={storeInputData}
                                        {...register("username", { required: true })} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='error'>{errors.username && <span>Username is required</span>}</div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Password" name='password' onChange={storeInputData} {...register("password", { required: true, maxLength: 40 })} />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='error'>{errors.password && <span className='error'>Password is required</span>}</div>

                                <div className="row">
                                    <div className="d-inline-flex p-2">
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit(doLogin)}>Log In</button>
                                </div>
                        </div>

                    </form>

                </div>

            </div>
        </div>
            </span >
        </>
    );
}

export default Auth