import React, { Component } from "react";
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

const NoMatchPage = () => {

    document.title = `${global.config.appName} - Not Found`
    
    return(
        <>
            NOT FOUND
        </>
    )
}

export default NoMatchPage;