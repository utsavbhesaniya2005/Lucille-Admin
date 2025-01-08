import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './ShowAlbum.css'
import Sidebar from '../Sidebar/Sidebar';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlbumAsync, getAlbumAsync } from '../../services/actions/AlbumAction';

const ShowAlbum = () => {

    const [collapsed, setCollapsed] = useState(false);

    const { albums } = useSelector(state => state.AlbumReducers);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const handleEdit = (id) => {
        navigate(`/editAlbum/${id}`)
    }

    const handleDelete = (id) => {
        dispatch(deleteAlbumAsync(id))
    }

    useEffect(() => {
        dispatch(getAlbumAsync());
    }, [albums, dispatch])

    return(
        <>
            <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <Sidebar collapsed={collapsed} />
            <div className={`dashboard-wrapper ${collapsed ? 'sidebar-collapsed' : ''} bg-[#E7EAEE]`}>
                <div className={`dashboard`}>
                    <div className="container">
                        <div className="row gap-y-8 items-center">
                            <div className="col-12 p-0">
                                <div className="heading-area flex items-center bg-white">
                                    <div className="col-5">
                                        <div className="heading">
                                            <h4>All Albums Page</h4>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="breacrumb-area flex justify-content-end pe-1 pt-1 w-full">
                                            <Breadcrumb>
                                                <Breadcrumb.Item>
                                                    <Link to='/'>Home</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <Link to='/allAlbums'>All Albums Page</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row py-5 px-2">
                            {
                                albums.map((data) => {
                                    return (
                                        <div className="col-3" key={data.id}>
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
                                                    <button className='btn btn-warning' onClick={() => handleEdit(data.id)}>Edit</button>
                                                    <button className='btn btn-danger' onClick={() => handleDelete(data.id)}>Delete</button>
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
export default ShowAlbum;