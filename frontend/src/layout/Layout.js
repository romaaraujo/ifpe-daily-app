import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import "./style.css";

class Layout extends Component {

    render() {
        return (
            <>
                <NavbarComponent />
                <Outlet />
            </>
        )
    }
}

export default Layout;