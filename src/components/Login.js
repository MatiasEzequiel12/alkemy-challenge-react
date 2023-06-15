import axios from "axios";
import swAlert from '@sweetalert/with-react';
import { Redirect, useHistory } from 'react-router-dom';

function Login(){

    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault(); //No disparar actualizacion de pantalla
        const email = e.target.email.value; //obtener fomularion de ingreso
        const password = e.target.password.value;

        const regexEmail =   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (email ==='' || password===''){
            swAlert(
                <h2>Los campos no pueden estar vacios.</h2>
            );
            return;
        }

        if (email !=='' && !regexEmail.test(email)){
            swAlert(
                <h2>Debes escribir una dirección de correo electrónico válida</h2>

            );            
            return;
        }

        if (email !== 'challenge@alkemy.org' || password!=='react'){
            swAlert(
                <h2>Credenciales inválidas</h2>
            );    
            return;
        }

        console.log('Ok estamos listo para enviar información');
        axios
        .post('http://challenge-react.alkemy.org',{ email,password}) //peticiones post
        .then (res => {
            swAlert(
                <h2>Su ingreso fue aprobado</h2>
            )
            const tokenRecibido = res.data.token;
            sessionStorage.setItem('token', tokenRecibido);
            history.push('/listado'); //reedirección todo OK
        })
    }

    let token = sessionStorage.getItem('token');

    return(
        <>
        { token && <Redirect to="/Listado" /> }
       
        <div className="row text-center" >
            <div className="col-6 offset-3 text-bg-secondary">
              <h2>Iniciar sesión</h2>  
                <form onSubmit={submitHandler}>  
                    <div className="mb-3">        
                        <label className="form-label">Correo electrónico:
                            <input type="text" className="form-control" name="email"/>
                        </label>
                    </div>
                    <div className="mb-3"> 
                        <label className="form-label"> Contraseña:
                            <input type="password" className="form-control" name="password"/>                           
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>                   
                </form>
            </div>    
        </div>
        </>            
    )
}

export default Login;