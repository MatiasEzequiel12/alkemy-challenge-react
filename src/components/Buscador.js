import { useHistory} from 'react-router-dom';
import swAlert from '@sweetalert/with-react';


function Buscador () { 
    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();
        console.log(keyword);

        if(keyword.length === 0 ){
            swAlert(<h2>Debe ingresar un nombre de pelicula</h2>)
        } else if (keyword.length < 3){
            swAlert(<h2>Ingrese mas de 3 caracteres ...</h2>)
        } else {
            e.currentTarget.keyword.value = '';
            history.push(`/resultados?keyword=${keyword}`);
        }
    }
    
    return (
        <form className="d-flex añign-items-center" onSubmit={submitHandler}>           
            <label className="form-label mb-0 mx-2">
                <input className="form-control" type="text" name="keyword" placeholder="Buscar ..."/>
            </label>
            <button type="submit" className="btn btn-success">🔍</button>                   
        </form>
    )
}

export default Buscador;