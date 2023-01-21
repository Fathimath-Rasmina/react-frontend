import React, {  useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch,useSelector } from 'react-redux';
import { listStoreProducts } from '../actions/productActions';



function StoreScreen() {

    // const{ filter_products } = useFilterContext()
    // console.log('filtered products', filter_products)

    const dispatch = useDispatch()
    const productStore = useSelector(state => state.productStore)
    const {error,loading,products} = productStore 
    // console.log('prod',products)
    // const [searchParams] = useSearchParams()
  
    // const location =useLocation()
    // const keyword = location.search
    
    // console.log('key:',keyword)
  
    useEffect(() => {
    
      dispatch(listStoreProducts())
  
    },[dispatch])
    
    
  
    return (
      <div>
       
        {/* <FilterSection/> */}
          <center><h1>Store</h1></center>
          {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
            : 
             <div>
                <Row>
                </Row>
              <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
              </Row>
             
              </div>
          }    
      </div>
    )
  }
  

export default StoreScreen