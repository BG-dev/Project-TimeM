import React from 'react';

import './HomePage.scss';

function HomePage() {
    return (
        <div className="home">
            <header className="header">
                <h1 className="header__title">Welcome to TimeM</h1>;
                <span className="header__description">
                    TimeM is a project for managment your time
                </span>
            </header>
        </div>
    );
}

export default HomePage;
