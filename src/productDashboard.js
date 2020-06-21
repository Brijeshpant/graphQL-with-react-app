import React, { useState, useEffect, useContext } from "react";
import { getProducts } from "./apoloClient";
import style from './styles/app.module.css'
import { ProductCreationContext } from './ProductCreationContext'
import { Error } from "./error";

export const ProductDashboard = () => {
    const productCreationContext = useContext(ProductCreationContext)
    const [errorMessage, setErrorMessage] = useState({})
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (!productCreationContext.showCreateProduct) {
            const fetchProducts = async () => {
                try {
                    const response = await getProducts();
                    console.log('response', response)
                    setProducts(response.data.products)
                    setErrorMessage({})
                } catch (error) {
                    console.log(JSON.stringify(error))
                    setErrorMessage(error.networkError.result.errors[0])
                    setProducts([])

                }
            }

            fetchProducts()

        }

    }, [productCreationContext])

    return (<div className={style.dashboard}>
        {errorMessage && errorMessage.message ? <Error error={errorMessage}/> : null}
        {!productCreationContext.showCreateProduct && products != null && products.length > 0 ?
            (<div>
                <h1 className={style.heading} > Products </h1>
                <table className={style.contantTable}>
                    <tbody>
                        {
                            products.map(item => (
                                <tr key={item.id}>
                                    {
                                        Object.values(item).map(pr => <td key={pr}>{pr}</td>)
                                    }
                                </tr>))}
                    </tbody>
                </table>
                <button type="button" onClick={() => productCreationContext.toggleShowCreateProduct()} className={style.createProd}>Create product</button>
            </div>) : null}
    </div>)
}
