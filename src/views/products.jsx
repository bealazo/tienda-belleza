import { ProductList } from "../components/ProductList"
import { useSearchParams } from "react-router-dom";
import { useEffect,useState } from "react";
import Axios from "axios";

export const Products = () => {

    //Obtengo los parametros enviado en el navigate
    const [searchParams] = useSearchParams();   

    
    //Defino el estado inicial del listado de productos
     const [products, setProducts] = useState([]);
   
     //Obtengo los productos con axios y seteo el estado teniando en cuenta la categoria recibida en los params desde home
     useEffect(() => {     
        Axios.get("http://localhost:3000/products")
        .then(response=>{
            setProducts(response.data.filter(product=>product.category==searchParams.get("id")));
        })   
       
     
      }, [searchParams]);//IMPORTANTE, pues si hay algún cambio en los parametros se rerenderiza el componente

    return (
        <div className="d-flex row justify-content-center" style={{width:"100vw", margin:"auto"}}>
             <h1 className="display-3 text-center mt-3">{searchParams.get("title")}</h1>
           {products.length>0?<ProductList products={products} />:null}
        </div>
    )
}