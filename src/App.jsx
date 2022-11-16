//Importo los enrutadores para enrutar cada vista de mi app
import {Routes, Route,Link} from "react-router-dom"

import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"

//Views
import {Index} from "./views/index"
import {Home} from "./views/home"
import {Cart} from "./views/cart"
import {Products} from "./views/products"

function App() { 

   //Obtengo la constante para la navegación por las vistas
   const navigate= useNavigate();

   //Obtengo el estado del total de productos del carrito
  const totalProductsCart=useSelector(state=>state.cart.totalCount)
 
  return (
    <div className="d-flex row" style={{width:"100vw", margin:"auto"}}>
    
      <div className="nav bg-dark justify-content-end">
        <Link to="/index" className="nav-link text-white">ENTRAR</Link>
        <Link to="/home" className="nav-link text-white">INICIO</Link>
        <button type="button" className="btn position-relative" onClick={()=>navigate("/cart")}>
          <i className="bi bi-cart-fill text-white h5"></i>
          <span className="position-absolute start-50  badge badge-light text-danger">{totalProductsCart}</span>        
       </button>
      </div>
     
      <Routes>
        <Route path="/index" element={<Index/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/products" element={<Products/>}/>
      </Routes>
     </div>
  )
}

export default App
