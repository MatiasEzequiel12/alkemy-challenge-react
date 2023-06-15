import { Link } from "react-router-dom";
import Buscador from './Buscador';

function Header (){
    return(
        <header>
            <nav className="navbar navbar-dark bg-primary p-4">
                <ul className="nav nav-pills">  
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/listado">Listado</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/favoritos">Favoritos</Link>
                    </li>  
                </ul>
                <Buscador/>
            </nav>
        </header>
    )
}

export default Header;