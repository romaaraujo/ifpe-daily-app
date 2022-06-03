import { React, Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NoMatchPage from "./pages/NoMatchPage";
import TestePage from "./pages/TestPage";

class AppRoutes extends Component {

    constructor() {
        super()
        this.routes = [
            { path: '/home', element: <HomePage />, active: true, index: true }
        ]
    }

    render() {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/sair" element={<Navigate to="/login" replace />}></Route>

                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage />} />
                    {this.routes.map((v, i) => {
                        return v.active ?
                            <Route path={v.path} key={i} element={v.element} /> :
                            false
                    })}
                    <Route path="*" element={<NoMatchPage />} />
                </Route>
            </Routes>
        )
    }
}

export default AppRoutes;