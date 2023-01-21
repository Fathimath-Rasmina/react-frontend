import React,{useState,useEffect} from 'react'
import {Link,useParams,useNavigate} from 'react-router-dom'
import { Form,Button } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listcategoryDetails,updateCategory } from '../actions/productActions'
import { CATEGORY_UPDATE_RESET } from '../constants/productConstants'



function CategoryEditScreen() {

    const {id} = useParams()
 
    const [category_name, setCategory_Name] = useState('')
    const [description, setDescription] = useState('')


    const dispatch = useDispatch()

    const navigate = useNavigate()

    const categoryDetails = useSelector(state => state.categoryDetails)
    const {error,loading,category} = categoryDetails

    
    const categoryUpdate = useSelector(state => state.categoryUpdate)
    const {error:errorUpdate,loading:loadingUpdate,success:successUpdate} = categoryUpdate

    useEffect(() =>{

        if(successUpdate){
            dispatch({type:CATEGORY_UPDATE_RESET})
            navigate('/admin/categorylist')
        }else{

            if(!category.category_name || category.id !== Number(id) ){
                dispatch(listcategoryDetails(id))
               }else{
                setCategory_Name(category.category_name)
                setDescription(category.description)

               
             }
        }
            
       
    },[category, id, navigate, dispatch,successUpdate])

    const submitHandler =(e) =>{
        e.preventDefault()
        dispatch(updateCategory({
            id:id,
            category_name,
            description
        }))
    }

  return (
    <div>
        <Link to='/admin/categorylist'>
            Go Back
        </Link>

        <FormContainer>
        <h1 className='text-center'>Edit Category</h1>
        
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> 
        : (

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                <Form.Label className='my-3'>Name</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={category_name}
                    onChange={(e)=>setCategory_Name(e.target.value)}
                >
                </Form.Control>
                </Form.Group>


                <Form.Group controlId='description'>
                <Form.Label className='my-3'>Description</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter Description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                >
                </Form.Control>
                </Form.Group>
                


                <center><Button type='submit' variant='primary' className='my-5'>
                    Update
                </Button></center>
            </Form>

        )}
        

        </FormContainer>
    </div>

  )
}

export default CategoryEditScreen