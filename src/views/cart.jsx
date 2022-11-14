import {useDispatch,useSelector} from "react-redux";

//Obteniendo los slices(actions+reducers) necesarios
import { removeProductFromCart} from "../features/cart/cartSlice";

export const Cart = () => {

    //Obteniendo estado del store
   const cart = useSelector(state=>state.cart);

   //Obteniendo el dispatch para enviar actualizaciones de estado
   const dispatch = useDispatch();

   const handleRemoveProduct=(product)=>{
        
    if(cart.productsList.find(pdt=>pdt.id===product.id)){
        //Eliminar el producto del carrito
        dispatch(removeProductFromCart(product.id));
    
    }
   
}

    return (
        <div className="d-flex row justify-content-center">
            <h1 className="display-5 text-center mt-3">Productos en el carrito</h1>
            <div className="col-md-8">
                <table className="table table-striped table-light mt-5" >
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col"></th>
                        
                    </tr>
                </thead>
                <tbody>
                
                {
                        cart.productsList.map((cartItem, index) => {
                            return (                           
                                <tr className="" key={index}>
                                    <td>{cartItem.name}</td>
                                    <td>{cartItem.price}</td>
                                    <td>  
                                        <span onClick={()=>{handleRemoveProduct(cartItem)}} style={{cursor:"pointer"}}>
                                            <i className="bi bi-trash-fill text-danger h5"></i>                                            
                                        </span>
                                    </td>
                                    
                                </tr>
                            )
                        })
                        
                    }
                    </tbody>        
                </table>  
            </div>      
        </div>
    )
}