import React from "react";
import styles from './Styles/Card.module.css'
export default function Card({ name, img, type }) {
    let contador = 0;
    return (
        <div key={contador++} className={styles.main}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.containerImagen}>
                        <img className={styles.imagen} src={img} alt="Not Found" />
                    </div>
                    <div className={styles.content}>
                        <h3 className={styles.name}>{name}</h3>
                        <div className={styles.containerSpan}>
                            {type && type.map(tipo => <span key={contador++} className={styles.type}>{tipo} </span>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}