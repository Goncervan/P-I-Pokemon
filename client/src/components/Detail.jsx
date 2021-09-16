import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from "../actions";
import { useEffect } from "react";
import s from './Styles/Detail.module.css';

export default function Detail(props) {
    console.log(props);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const poke = useSelector((state) => state.detail)
    let contador=0;
    if (poke.created) {
        return (
            <div>
                <div className={s.principal}>
                </div>
                <div className={s.pokedex}>
                    <h1 className={s.title}>{poke.name}</h1>
                    <div className={s.info}>
                        <div className={s.imgContainer}>
                            <img src={poke.img} />
                        </div>
                        <div className={s.stats}>
                            {poke.Types.map(p => p.name).map(el => <span key={contador++} className={s.type}>{el}</span>)}
                            <h3 className={s.content}>Altura: {poke.height}</h3>
                            <h3 className={s.content}>Peso: {poke.weight}</h3>
                            <h3 className={s.content}>Hp: {poke.hp}</h3>
                            <h3 className={s.content}>Poder de ataque: {poke.attack}</h3>
                            <h3 className={s.content}>Poder de defensa: {poke.defense}</h3>
                            <h3 className={s.content}>Velocidad: {poke.speed}</h3>
                        </div>
                    </div>
                    <Link to="/home">
                        <button className={s.btn}>Volver</button>
                    </Link>
                </div>
                <div className={s.image}></div>
                <div className={s.foot}></div>
            </div >)
    } else {
        return (
            <div>
                <div className={s.principal}>
                </div>
                <div className={s.pokedex}>
                    <h1 className={s.title}>{poke.name}</h1>
                    <div className={s.info}>
                        <div className={s.imgContainer}>
                            <img src={poke.img} />
                        </div>
                        <div className={s.stats}>
                            {poke.type && poke.type.map(tipo => <span key={contador++} className={s.type}>{tipo} </span>)}
                            <h3 className={s.content}>Altura: {poke.height}</h3>
                            <h3 className={s.content}>Peso: {poke.weight}</h3>
                            <h3 className={s.content}>Hp: {poke.hp}</h3>
                            <h3 className={s.content}>Poder de ataque: {poke.attack}</h3>
                            <h3 className={s.content}>Poder de defensa: {poke.defense}</h3>
                            <h3 className={s.content}>Velocidad: {poke.speed}</h3>
                        </div>
                    </div>
                    <Link to="/home">
                        <button className={s.btn}>Volver</button>
                    </Link>
                </div>
                <div className={s.image}></div>
                <div className={s.foot}></div>
            </div >
        )
    }
}
