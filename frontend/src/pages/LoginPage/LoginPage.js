import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import "./style.css";

const LoginPage = () => {

    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    document.title = `${global.config.appName} - Login`

    useEffect(() => {
        localStorage.removeItem('token')
    }, [])

    const navigate = useNavigate();
    const Login = () => {
        if (user === 'admin' && password === 'admin') {
            localStorage.setItem('token', 'temporario')
            navigate('/home')
        }
    }

    return (
        <>
            <section className="vh-100 login-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">

                            <div className="px-5 ms-xl-4 mt-3">
                                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                                <span className="h1 fw-bold mb-0 text-white">Daily</span>
                            </div>

                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <Card className='p-3'>
                                    <Card.Header><h3 >Log in</h3></Card.Header>
                                    <Card.Body>
                                        <div className="form-outline mb-2">
                                            <input type="text" id="form2Example18" onChange={e => setUser(e.target.value)} className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form2Example18">Nome de Usuário</label>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input type="password" id="form2Example28" onChange={e => setPassword(e.target.value)} className="form-control form-control-lg" />
                                            <label className="form-label" htmlFor="form2Example28">Senha</label>
                                        </div>

                                        <div className="mb-2 w-full">
                                            <button className="btn btn-info w-full" type="button" onClick={Login}>Login</button>
                                        </div>
                                    </Card.Body>
                                </Card>

                            </div>

                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp" className="w-100 vh-100" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default LoginPage
