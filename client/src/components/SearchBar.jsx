import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from "../actions";
import s from './Styles/SearchBar.module.css'
export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function handleSumbit(e) {
        e.preventDefault()
        dispatch(getPokemonByName(name))
    }


    return (
        <div className={s.principal}>
            <div className={s.imgContainer}>
                <img className={s.img} src="https://image.flaticon.com/icons/png/512/528/528098.png" alt=" " />
            </div>
            <input
                type="text"
                placeholder="Buscar"
                onChange={(e) => handleInputChange(e)}
                className={s.input}
            />
            <button 
                type="submit"
                className={s.btn}
                onClick={(e) => handleSumbit(e)}>Buscar</button>
                
        </div>
    )
}