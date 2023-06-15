import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function Resultados (props){
    let  token = sessionStorage.getItem('token');
    let query = new URLSearchParams(window.location.search);
    let keyword = query.get('keyword'); //capturar el ID de una película

    const [moviesResults, setMoviesResults] = useState ([]);

    useEffect (() => {
        const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=8f2a16d4f0d2593718febacdf7b1d495&language=es-ES&query=${keyword}`;
        
        axios.get(endPoint).then(response=> {
            const moviesArray = response.data.results;
            setMoviesResults(moviesArray);
        })
        .catch(error => console.log(error))
    
    });

    return (
        <>
        { !token && <Redirect to="/" /> }
        <h2>Resultados sobre : <em>{keyword}</em></h2>
        <div className='container'>
        <div className='row'>
            {
                moviesResults.map((oneMovie, index) => {
                    return (
                    <div className='col-sm-3'>     
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

export default Resultados;