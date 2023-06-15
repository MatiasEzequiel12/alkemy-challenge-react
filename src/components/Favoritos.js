import { Link, Redirect } from "react-router-dom";

function Favoritos (props){
    let  token = sessionStorage.getItem('token');

    return(
        <>
            { !token && <Redirect to="/" /> }
            <h2>Sección de favoritos</h2>
            <div className='container'>
                <div className='row aling-item-start'>
                    { !props.favorites.length && <div className="col-12 text-danger">No tienes peliculas agregas a favoritos</div> }
                    {
                        props.favorites.map((oneMovie, index) => {
                            return (
                            <div className='col-sm-3' key={index}>     
                            <div className='card-group mt-3'>
                            <div className="card text-center border-info">
                                <img src={oneMovie.imgURL} className="card-img-top" alt="..."/>
                                <button
                                    className="favorite-btn"
                                    onClick={props.addOrRemoveFromFavs}
                                    data-movie-id={oneMovie.id}
                                >👎</button>
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

export default Favoritos;