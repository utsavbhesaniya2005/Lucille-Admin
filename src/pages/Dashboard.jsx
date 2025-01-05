import './Dashboard.css';
import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import { Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlbumAsync, getAlbumAsync } from '../services/actions/AlbumAction';
import { getAdminId } from '../services/actions/AuthAction';
import { deleteProductAsync, getProductAsync } from '../services/actions/ProductAction';

const Dashboard = () => {
    
    const { admin } = useSelector(state => state.AuthReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { albums } = useSelector(state => state.AlbumReducers);
    const { products } = useSelector(state => state.ProductReducers);

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const handleEditAlbum = (id) => {
        navigate(`/editAlbum/${id}`)
    }

    const handleDeleteAlbum = (id) => {
        dispatch(deleteAlbumAsync(id));
    }

    const handleEditProduct = (id) => {
        navigate(`/editProduct/${id}`)
    }

    const handleDeleteProduct = (id) => {
        dispatch(deleteProductAsync(id));
    }

    useEffect(() => {
        dispatch(getAlbumAsync()) 
    }, []);

    useEffect(() => {
        dispatch(getProductAsync()) 
    }, []);

    useEffect(() => {
        if(!admin){
            navigate('/signIn');
        }
    }, [admin]);

    useEffect(() => {
        dispatch(getAdminId())
    }, [])


    return (
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
                                            <h4>Dashboard Page</h4>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="breacrumb-area flex justify-content-end pe-1 pt-1 w-full">
                                            <Breadcrumb>
                                                <Breadcrumb.Item>
                                                    <Link to='/'>Home</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <Link to='/'>Dashboard Page</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row py-3 px-2">
                            <h3 className='mb-3 mt-2'>All Albums</h3>
                            {
                                albums.length === 0 ? <h3 className='flex items-center w-full justify-center my-3'>No Albums Found...</h3>
                                :
                                albums.map((data) => {
                                    return (
                                        <div className="col-2" key={data.id}>
                                            <div className="album-card p-[5px]">
                                                <div className="album-image">
                                                    <img src={ data.coverImage || '../src/assets/images/default-img/default-img.png'} alt={data.aname} />
                                                    <div className="album-duration">{data.albumDura} Mins</div>
                                                    <button className="play-button">▶</button>
                                                    <div className="black-shade"></div>
                                                </div>
                                                <div className="album-details">
                                                    <h4>{data.aname}</h4>
                                                    <h6>{data.artistName}</h6>
                                                    <p>{data.genre}</p>
                                                </div>
                                                <div className="btn-container">
                                                    <button className='btn btn-warning' onClick={() => handleEditAlbum(data.id)}>Edit</button>
                                                    <button className='btn btn-danger' onClick={() => handleDeleteAlbum(data.id)}>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="row p-[25px]">
                            <h3 className='mb-3 ms-[-15px]'>All Products</h3>
                            {
                                products.length === 0 ? <h3 className='flex items-center w-full justify-center my-3'>No Products Found...</h3>
                                :
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
                                                        <button className="product-card__btn edit" onClick={() => handleEditProduct(data.id)}>Edit</button>
                                                        <button className="product-card__btn delete" onClick={() => handleDeleteProduct(data.id)}>Delete</button>
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
    );
};

export default Dashboard;