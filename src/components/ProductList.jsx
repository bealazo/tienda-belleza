import {useDispatch,useSelector} from "react-redux";

 //Obteniendo los slices(actions+reducers) necesarios
import {addProductToCart, removeProductFromCart} from "../features/cart/cartSlice";



export const ProductList=({products})=>{

     //Obteniendo el dispatch para enviar actualizaciones de estado
     const dispatch = useDispatch();

     //Obteniendo estado del store
    const pdtsInCart = useSelector(state=>state.cart.productsList);


    const handleAddOrRemoveProduct=(product)=>{
        
        pdtsInCart.find(pdt=>pdt.id===product.id)?
        //Eliminar el producto del carrito
        dispatch(removeProductFromCart(product.id)):
        //Añadir el producto al carrito
        dispatch(addProductToCart(product));
    }
    
    return(
      
            <div className="d-flex row justify-content-start mt-5">
                {products.map(product=>{
                    return(
                        <div key={product.id} className="col-md-4 mt-4 align-items-center">
                                <h4>{product.name}</h4>
                                <p><b>Precio:</b>{product.price}</p>
                                <p><b>Categoría:</b>{product.category}</p>
                                <button
                                //Si el producto está en el carrito botón color rojo, de lo contrario color verde
                                className={`btn ${pdtsInCart.find(pdt=>pdt.id===product.id)? 'btn-danger' : 'btn-success'}`}
                                onClick={()=>{handleAddOrRemoveProduct(product)}}
                                >
                                    {/*Si el producto está en el carrito el botón permite Eliminarlo, de lo contrario permite Añadirlo */}
                                   {pdtsInCart.find(pdt=>pdt.id===product.id)?"Eliminar del" : "Añadir al"} Carrito
                                  
                                </button>

                        </div>
                    )
                })}
            </div>


    )
}