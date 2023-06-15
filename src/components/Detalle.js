import { Redirect } from 'react-router-dom';
import { useEffect} from 'react';
import axios from 'axios';
import { useState } from 'react';

function Detalle (){
    let token = sessionStorage.getItem('token'); //verificamos token

    let query = new URLSearchParams(window.location.search);
    let movieID = query.get('movieID'); //capturar el ID de una película

    const [movie, setMovie] = useState(null);

    useEffect (() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=8f2a16d4f0d2593718febacdf7b1d495&language=es-ES`;
        axios.get(endPoint).then(
            response =>{
                const movieData = response.data; //setear en el estado movie, la información obtenida con Axios desde la API
                setMovie(movieData);
            }
        )
        .catch(error =>{
            console.log(error);
        })
    
    }, [movieID]);

    return (
        //Si token es null volvemos a home
        <>
        { !token && <Redirect to="/" />}
        { !movie && <p>cargando...</p>}
        { movie &&
                <>
                <h5><li>Titulo: {movie.title}</li></h5>
                <div className='container'>
                <div className='row aling-item-start'>
                    <div className='col-sm-6'>
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="movie poster" />
                    </div>
                    <div className="col border border-light border border-5">
                            <h5>Fecha de estreno: {movie.release_date}</h5>
                            <h5>Reseña:</h5>
                            <p>{movie.overview}</p>
                            <h5>Raking: {movie.vote_average}</h5>
                            <h5>Popularidad: {movie.popularity}</h5>
                            <h5>Generos:</h5>
                            <ul>
                              {movie.genres.map(oneGenres => <li>{oneGenres.name}</li>)}
                            </ul>
                            <ul>
                                <h5>Producción Company</h5>
                                <ul>
                                    {movie.production_companies.map(oneCompany => <li>{oneCompany.name}</li>)}
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        }    
        </>
    )
}

export default Detalle;