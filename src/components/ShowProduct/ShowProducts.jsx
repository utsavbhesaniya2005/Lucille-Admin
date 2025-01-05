import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './ShowProducts.css';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductAsync, getProductAsync } from '../../services/actions/ProductAction';

const ShowProducts = () => {

    const { products } = useSelector(state => state.ProductReducers)

    const [collapsed, setCollapsed] = useState(false);
    
    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/editProduct/${id}`);
    }

    const handleDelete = (id) => {
        dispatch(deleteProductAsync(id))
    }

    useEffect(() => {
        dispatch(getProductAsync());
    }, [products, dispatch]);

    return(
        <>
            <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <Sidebar collapsed={collapsed} />
            <div className={`dashboard-wrapper ${collapsed ? 'sidebar-collapsed' : ''} bg-[#f5f5f7]`}>
                <div className={`dashboard show-product`}>
                    <div className="container">
                        <div className="row gap-y-8 items-center">
                            <div className="col-12 p-0">
                                <div className="heading-area flex items-center bg-white">
                                    <div className="col-5">
                                        <div className="heading">
                                            <h4>Show Product Page</h4>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="breacrumb-area flex justify-content-end pe-1 pt-1 w-full">
                                            <Breadcrumb>
                                                <Breadcrumb.Item>
                                                    <Link to='/'>Home</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <Link to='/allProducts'>Show Product Page</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row p-[25px]">
                            {
                                products.map((data) => {

                                    return(

                                        <div className="col-4" key={data.id}>
                                            <div className="product-card">
                                                <div className="product-card__image">
                                                    <img src={data.pimage || '../src/assets/images/default-img/default-img.png'} alt={data.pname} />
                                                </div>
                                                <div className="product-card__info">
                                                    <h2 className="product-card__title">{data.pname}</h2>
                                                    <p className="product-card__description">{data.pdesc}</p>
                                                    <div className="product-card__price-row mb-1">
                                                        <span className="product-card__price">₹{data.price}</span>
                                                    </div>
                                                    <div className="product-btns flex justify-content-around mt-3">
                                                        <button className="product-card__btn edit" onClick={() => handleEdit(data.id)}>Edit</button>
                                                        <button className="product-card__btn delete" onClick={() => handleDelete(data.id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        

                    </div>
                </div>
            </div>
        </>
    )
}
export default ShowProducts;