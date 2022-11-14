 import {useRef} from "react";
 import {useDispatch} from "react-redux";
 import {useNavigate} from "react-router-dom"
 import Axios from "axios";
 //Obteniendo los slices(actions+reducers) necesarios
import {setUser, unsetUser} from "../features/user/userSlice";

//recursos
import background from "../assets/fondo-auth-form.jpg";



export const Index=()=>{

    //Defino las constantes de referencia y las inicializo en null, es similar al useState
    const emailField=useRef(null);
    const passwordField=useRef(null);

    //Obteniendo el dispatch para enviar actualizaciones de estado
    const dispatch = useDispatch();

    //Obtengo la constante para la navegación por las vistas
    const navigate= useNavigate();


    const handleSubmit=e=>{
        e.preventDefault();
        Axios.get(" http://localhost:3000/users")
            .then(response=>{
                const users =response.data;                
                //como me hice mi api para la getsion de usuarios sin complicaciones, lo que hago es
                //preguntar si tengo algún user en mi lista que tenga ese email
                const userToLog=users.find(user=>user.email===emailField.current.value);
              
                //si lo encuentro
                if(userToLog){
                    //si la contraseña coincide con la contraseña entrada
                    if(userToLog.password === passwordField.current.value){
                        //hago un dispatch seteando al user
                       dispatch(setUser({
                            email:userToLog.email,
                            fullName:`${userToLog.first_name} ${userToLog.last_name}`,
                            token:Date.now()
                        }))

                       //si se loguea correctamente navego a home
                        navigate("/home")

                    }
                }


            })
    }

    return(
        <div className="d-flex row justify-content-center align-items-center" style={{height: "100vh", width:"100vw", backgroundImage: `url(${background})` , backgroundRepeat: 'no-repeat', backgroundSize:"cover"}}>
            <div className="col-md-4">
                <div className="d-flex row justify-content-center">
                    <h2 className="col-6 mb-4">Iniciar sesión</h2>
                </div>
              
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo electrónico</label>
                        <input type="email" placeholder="prueba@gmail.com" className="form-control" ref={emailField}/>

                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" placeholder="prueba123" className="form-control" ref={passwordField}/>
                        
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <div className="col-md-2 ">
                            <button type="submit" className="btn btn-dark btn-md">Enviar</button>
                        </div>
                       
                    </div>
                    
                </form>
            </div>
        </div>
    )
}