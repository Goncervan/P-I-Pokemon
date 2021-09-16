import React from 'react'
import s from './Styles/Paged.module.css'
export default function Paged ({pokemonsPerPage, allPokemons,paginado}){
    const pageN = [];

    for (let i = 0; i <=Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageN.push(i+1);
    }

    return(
        <div className={s.container}>
            <ul className={s.paged}>
                {pageN &&
                pageN.map(number=>(
                    <li className={s.list} key={number}>
                        <button className={s.btn} onClick={()=>paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}