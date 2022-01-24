import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import s from './Styles/Home.module.css'
import { filterPokeType } from "../actions/index";
import { filterCreated } from "../actions/index";
import { orderByName } from "../actions/index";
import { orderByAttack } from "../actions/index";

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.allPokemons);

    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(9)
    const [order, setOrder] = useState("")
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFPokemon = indexOfLastPokemon - pokemonsPerPage;
    const current = allPokemons.slice(indexOfFPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getPokemons());
    }, [])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleFiltertype(e) {
        dispatch(filterPokeType(e.target.value))
    }

    function handleOrderAttack(e) {
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    let contador = 0;

    return (
        <div>
            <SearchBar />
            <div className={s.principal} key={contador++}>
                <div className={s.title} key={contador++}>
                    <span>
                        Wiki-Mon
                    </span>
                </div>
                <Link to='/pokemonCreate' key={contador++}><span className={s.crear}>Crear Pokemon</span></Link>
                <button className={s.cargar} onClick={e => { handleClick(e) }}>
                    Volver a cargar los Pokemones
                </button>
                <div className={s.containerSelect} key={contador++}>
                    <select key={contador++} onChange={e => handleOrderAttack(e)} className={s.select}>
                        <option className={s.option} value='ascF'> Más fuertes</option>
                        <option className={s.option} value='descF'> Más debiles</option>
                    </select>
                    <select key={contador++} onChange={e => handleFilterName(e)} className={s.select}>
                        <option className={s.option} value='ascA'> A - Z</option>
                        <option className={s.option} value='descA'> Z - A</option>
                    </select>
                    <select key={contador++} onChange={e => handleFilterCreated(e)} className={s.select}>
                        <option className={s.option} value='All'> Todos</option>
                        <option className={s.option} value='created'> Creados</option>
                        <option className={s.option} value='api'> Existente</option>
                    </select>
                    <select key={contador++} onChange={e => handleFiltertype(e)} className={s.select}>
                        <option className={s.option} value="All">All</option>
                        <option className={s.option} value="normal">Normal</option>
                        <option className={s.option} value="fighting">Fighting</option>
                        <option className={s.option} value="flying">Flying</option>
                        <option className={s.option} value="poison">Poison</option>
                        <option className={s.option} value="ground">Ground</option>
                        <option className={s.option} value="rock">Rock</option>
                        <option className={s.option} value="bug">Bug</option>
                        <option className={s.option} value="ghost">Ghost</option>
                        <option className={s.option} value="steel">Steel</option>
                        <option className={s.option} value="fire">Fire</option>
                        <option className={s.option} value="water">Water</option>
                        <option className={s.option} value="grass">Grass</option>
                        <option className={s.option} value="electric">Electric</option>
                        <option className={s.option} value="psychic">Psychic</option>
                        <option className={s.option} value="ice">Ice</option>
                        <option className={s.option} value="dragon">Dragon</option>
                        <option className={s.option} value="dark">Dark</option>
                        <option className={s.option} value="fairy">Fairy</option>
                        <option className={s.option} value="unknown">Unknown</option>
                        <option className={s.option} value="shadow">Shadow</option>
                    </select>
                </div>

            </div>
            <div key={contador++} className={s.pokeContainer}>
                <div className={s.pokemones}>
                    {
                        current.length > 0 ? current.map(el => {
                            return (
                                <div key={contador++}>
                                    <Link to={"/detail/" + el.id}>
                                        <Card name={el.name} img={el.img} type={el.type} />
                                    </Link>
                                </div>
                            );
                        }) :
                            <div>
                                <p>No hay pokemones cargados</p>
                            </div>
                    }
                </div>
            </div>
            <div className={s.paginado}>
                <Paged pokemonsPerPage={pokemonsPerPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado}
                />
            </div>
        </div>
    )
}