import {useSelector} from "react-redux"
import { selectProducts } from "./productsSlice"
export const useProducts = ()=>{
    const products = useSelector(selectProducts)
    const productsSize = products.length
    const getItemsByInvoiceId = (invoiceID)=>{
        return products.filter(product=>product.invoices.includes(parseInt(invoiceID)))
    }
    return {products,productsSize,getItemsByInvoiceId}
}