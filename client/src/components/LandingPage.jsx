import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Styles/Landing.module.css'
export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.principal}>
                <h1 className={styles.title}>Bienvenidos a la Wiki-Mon</h1>
                <h2 className={styles.subtitle}>La mejor página para conocer a todos los pokemones!</h2>
                <Link to='/home'>
                    <button className={styles.btn}>Empezar</button>
                </Link>
                <div className={styles.pokeball}></div>
            </div>
            <div className={styles.image}></div>
            <div className={styles.foot}></div>
        </div>
    )
}