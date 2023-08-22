import React from "react";
import './Main.css';
import Promo from '../Main/Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';

function Main() {



    return (
        <main className="Main__content">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe/>
        </main>
    )
}

export default Main;