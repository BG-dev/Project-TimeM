import React, { useEffect, useState } from 'react';

import './WelcomeLayer.scss';

type Messages = {
    [key: string]: string;
};

const messages: Messages = {
    en: 'Welcome!',
    fr: 'Bienvenue!',
    es: '¡Bienvenido!',
    de: 'Willkommen!',
    ru: 'Добро пожаловать!',
    it: 'Benvenuto!',
    pt: 'Bem-vindo!',
    nl: 'Welkom!',
};

function WelcomeLayer() {
    const [activeMessage, setActiveMessage] = useState(false);
    const [active, setActive] = useState(true);
    const [langIndex, setLangIndex] = useState(0);

    useEffect(() => {
        setActiveMessage(true);
        const timer = setTimeout(() => {
            setActiveMessage(false);
            setTimeout(() => {
                setLangIndex((prevIndex) => prevIndex + 1);
            }, 500);
        }, 1200);

        if (langIndex >= Object.keys(messages).length) {
            setActive(false);
        }

        return () => clearTimeout(timer);
    }, [langIndex]);

    return (
        <div className={`welcome-message ${active ? 'active' : ''}`}>
            <span className={`message ${activeMessage ? 'active' : ''}`}>
                {messages[Object.keys(messages)[langIndex]]}
            </span>
        </div>
    );
}

export default WelcomeLayer;
