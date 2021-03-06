import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from '../actions/productActions'

const HomeScreen = (props) => {
    // const [products, setProduts] = useState([])
    const productList = useSelector(state => state.productList)
    const {products, loading, error } = productList
    const dispatch = useDispatch()

    
    useEffect(() => {
        return dispatch(listProducts())
    }, [dispatch])
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const { data } = await axios.get("/api/products")
    //         setProduts(data)
    //     }
    //     fetchData()
    //     return () => {
    //         //cleanup
    //     }
    // }, [])
    return (
        loading ? <div>Loading...</div> :
        error ? <div>{ error }</div> :
        <div>
            <ul className="products">
                  {products.map(product => {
                    return <li key={product._id}>
                        <div className="product">
                            <Link to={'/products/' + product._id}>
                                <img className="product-image" src={product.image} alt={product.name} />
                            </Link>
                            <div className="product-name">
                                <Link to={'/products/' + product._id}>{product.name}</Link>
                            </div>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">{product.rating} Stars ({product.numReviews} reviews)</div>                            
                        </div>
                    </li>
                    } )}
                </ul>
        </div>
    
    )
}

export default HomeScreen
