import { Redirect, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react'

function Listado (props){

    let token = sessionStorage.getItem('token');

    const [ moviesList, setMoviesList] = useState([]);

    useEffect (() => {
        const endPoint = 'https://api.themoviedb.org/3/discover/movie?api_key=8f2a16d4f0d2593718febacdf7b1d495&language=es-ES&pague=1';
        axios.get(endPoint)
            .then(response => {
                const apiData = response.data;
                setMoviesList(apiData.results);
            })
            .catch(error =>{
                swAlert(<h2>Ha ocurrido un error, intenta más tarde</h2>);
            })
    }, [setMoviesList]);


    return (
        <>
        { !token && <Redirect to="/" /> } 
        <div className='container'>
        <div className='row'>
            {
                moviesList.map((oneMovie, index) => {
                    return (
                    <div className='col-sm-4'>     
                    <div className='card-group mt-3' key={index}>
                    <div className="card text-center border-info">
                        <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..."/>
                        <button
                                className="favorite-btn"
                                onClick={props.addOrRemoveFromFavs}
                                data-movie-id={oneMovie.id}
                        >👍</button>
                        <div className="card-body">
                        <h5 className="card-title">{oneMovie.title}</h5>
                        <p className="card-text">{oneMovie.overview.substring(0,100)}...</p>
                        <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-primary">Ver detalle</Link>
                        </div>
                    </div> 
                    </div>
                    </div>
                )}    
            )}
        </div>
        </div>
        </>
    )
}

export default Listado