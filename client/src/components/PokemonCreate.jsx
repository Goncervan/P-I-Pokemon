import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getType } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import s from "./Styles/PokemonCreate.module.css";



export default function PokemonCreate() {
    const dispatch = useDispatch();
    let history = useHistory()
    useEffect(() => {
        dispatch(getType())
    }, [dispatch])
    const types = useSelector((state) => state.type)
    const [error, setError] = useState({});

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        img: "",
        type: []
    })
    
    function validate(input) {
        let err = {};
        if (!input.name) {
            err.name = 'Nombre es un campo obligatorio'
        }
        if(input.type.length === 3){
            err.type = 'Solo podes elegir 3 tipos'
        }
        return err;
    } 
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }  
    function handleSelect(e) {
        setInput({
            ...input,
            type: [...input.type, e.target.value]
        })
    }
    function handleDelete(el) {
        setInput({
            ...input,
            type: input.type.filter(t => t !== el)
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postPokemon(input))
        alert("Pokemon Creado!")
        setInput({
            name: "",
            height: "",
            weight: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            img: "",
            type: []
        })
        return setTimeout(()=>history.push('/home'),2000)
    }
    
    useEffect(() => {
        dispatch(getType())
    }, [])
    let key = 0;
    return (
        <div className={s.main} key={key++}>
            <div className={s.container} key={key++}>
                <h1 className={s.title}>Crea tu Pokemon</h1>
                <form key={key++} className={s.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={s.stat} key={key++}>
                        <label className={s.label}>Nombre:  </label>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {error.name && (
                        alert("Nombre es un campo obligatorio!!")
                    )}
                    <div className={s.stat} key={key++}>
                        <label>Peso:  </label>
                        <input
                            type="text"
                            value={input.weight}
                            name="weight"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={s.stat} key={key++}>
                        <label>Altura:  </label>
                        <input
                            type="text"
                            value={input.height}
                            name="height"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={s.stat} key={key++}>
                        <label>Vida:  </label>
                        <input
                            type="text"
                            value={input.hp}
                            name="hp"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={s.stat} key={key++}>
                        <label>Nivel de ataque:  </label>
                        <input
                            type="text"
                            value={input.attack}
                            name="attack"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={s.stat} key={key++}>
                        <label>Nivel de defensa:  </label>
                        <input
                            type="text"
                            value={input.defense}
                            name="defense"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={s.stat} key={key++}>
                        <label>Nivel de velocidad:  </label>
                        <input
                            type="text"
                            value={input.speed}
                            name="speed"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className={s.stat} key={key++}>
                        <label>Img:  </label>
                        <input
                            type="text"
                            value={input.img}
                            name="img"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <select className={s.stat} onChange={(e) => handleSelect(e)}>
                        {types.map((t) => (
                            <option key={key++}value={t.name}>{t.name}</option>
                        ))}
                    </select>
                    <div className={s.types}>
                        {input.type.map(el =>
                            <div className={s.el} key={key++}>
                                <button className={s.cerrar} onClick={() => handleDelete(el)}>{el}</button>
                            </div>
                        )}
                    </div>
                    <button className={s.btnCrear} type="submit">
                        Crear
                    </button>
                </form>
            </div>
            <Link to='/home'><button className={s.volver}>Volver</button></Link>
        </div>
    )
}