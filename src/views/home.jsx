import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useNavigate,createSearchParams } from "react-router-dom";
import Axios from "axios";

//slices(actions+reducers)
import { unsetUser } from "../features/user/userSlice";


//recursos
import bannerinicio from "../assets/bannerinicio.png";
import categorycremas from "../assets/cremas.jpg";
import categorylabiales from "../assets/labiales.jpg";

export const Home=()=>{

   //Obteniendo estado del store
   const user = useSelector(state=>state.user);
     

   //Obteniendo el dispatch para enviar actualizaciones de estado
   const dispatch = useDispatch();

   //Obtengo la constante para la navegación por las vistas
   const navigate= useNavigate();

    //Defino el estado inicial del listado de categorias
    const [categories, setCategories] = useState([]);


   //Obtengo la lista de productos desde la api
   useEffect(()=>{
   
    Axios.get("http://localhost:3000/categories")
    .then(response=>{
        setCategories(response.data);
       
    })
    
    },[]);


   //Funcion para cerrar sesión
   const handleLogOut=()=>{
       //hago un dispatch para resetear el user
       dispatch(unsetUser());
       //navego al index
       navigate("/index")
   }

   //Función para navegar a Products para mostrar el listado de productos de acuerdo a la categoria
   const gotoProducts=(idcategory,namecategory)=>{
           
            const params = { title: namecategory,id:idcategory};           
            navigate({
                pathname: '/products',
                search: `?${createSearchParams(params)}`
              });
    }
 
    return(
       
        <div className="d-flex row justify-content-center" style={{width:"100vw", margin:"auto"}}>
            {
                user.email?
                    <div className="row justify-content-center">
                        <h3 className="display-6 text-center mt-3">Hola {user.fullName}, aquí tienes tus productos favoritos</h3>
                        <div className="d-flex flex-column align-items-center">
                            <a href="" className="nav-link text-danger col-md-1"
                                onClick={handleLogOut}>
                                Cerrar Sesión 
                            </a>
                        </div>                       
                        <hr/>
                    </div>:
                null
            }
           <div className="row justify-content-center align-items-center mt-3">
                <div className="col-md-5">
                    <img src={bannerinicio} className="img-fluid" alt=""/>                  
                </div>
                <div className="col-md-5">
                     <h1 className="display-1 text-center">Descubre nuestra gama de productos</h1>
                </div>
           </div>   
             
                <div className="row justify-content-center align-items-center mt-5 gap-5">
                     {categories.map((category, index) =>{
                        return(
                        <div className="card col-md-5" key={index}>
                            <img src={category.id==3?categorycremas:categorylabiales} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{category.name}</h5>
                                <p className="card-text">{category.description}</p>
                                <button onClick={()=>gotoProducts(category.id,category.name)} className="btn btn-dark">Ver más</button>
                            </div>
                        </div> 
                        )}
                     )}            
                </div>             
             
        </div>
    )
}