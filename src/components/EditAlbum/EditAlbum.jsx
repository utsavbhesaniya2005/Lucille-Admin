import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router";
import "./EditAlbum.css"; 
import { useDispatch, useSelector } from "react-redux";
import { findAlbumsAsync, updateAlbumAsync } from "../../services/actions/AlbumAction";

const EditAlbum = () => {

    const { album } = useSelector(state => state.AlbumReducers)
    
    const [editAlbum, setEditAlbum] = useState({
        aname : '',
        artistName : '',
        ardate : '',
        albumDura : '',
        coverImage : '',
        genre : '',
        songs : '',
        desc : ''
    });

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleInput = (e) => {

        const { name, value, files } = e.target;
    
        if(name === "coverImage" && files.length > 0){

            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () =>{
                
                setEditAlbum((prevData) => ({
                    ...prevData,
                    [name] : reader.result,
                }));
            };
            reader.readAsDataURL(file);

        }else{

            setEditAlbum((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateAlbumAsync(editAlbum));

        setEditAlbum({
            aname : '',
            artistName : '',
            ardate : '',
            albumDura : '',
            coverImage : '',
            genre : '',
            songs : '',
            desc : ''
        });

        navigate('/allAlbums');
    }

    useEffect(() => {
        dispatch(findAlbumsAsync(id));
    }, []);

    useEffect(() => {
        if(album){
            setEditAlbum(album)
        }
    }, [album])

  return (
    <>
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Sidebar collapsed={collapsed} />
        <div className={`dashbaord-wrapper ${collapsed ? "sidebar-collapsed" : ""} bg-[#E7EAEE]`} >
            <div className={`dashboard`}>
                <div className="container">
                    <div className="row gap-y-8 items-center mb-[25px]">
                        <div className="col-12 p-0">
                            <div className="heading-area flex items-center bg-white">
                                <div className="col-5">
                                    <div className="heading">
                                        <h4>Edit Album Page</h4>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="breacrumb-area flex justify-content-end pe-1 pt-1 w-full">
                                        <Breadcrumb>
                                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <Link to="/editAlbum">Edit Album Page</Link>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-auto my-[25px]">
                        <div className="col-12">
                            <div className="flex justify-center items-center w-full h-full min-h-screen">
                                <form className="w-full bg-white p-[25px] shadow-md rounded" onSubmit={handleSubmit} >
                                    <h6 className="text-xl mb-[45px] text-left bg-white text-uppercase">
                                        Edit Album Page
                                    </h6>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aname" >Album Name</label>
                                        <input id="aname" type="text" value={editAlbum.aname} onChange={handleInput} name="aname" placeholder="Enter Album Name" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artistName" >Album Artist</label>
                                        <input id="artistName" type="text" value={editAlbum.artistName} onChange={handleInput} name="artistName" placeholder="Enter Artist Name" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ardate" >Album Release Date</label>
                                        <input id="ardate" type="date" value={editAlbum.ardate} onChange={handleInput} name="ardate" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="albumDura" >Album Duration</label>
                                        <input id="albumDura" type="number" value={editAlbum.albumDura} onChange={handleInput} name="albumDura" placeholder="Total Time Of The Album Ex:- 25:31" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">Album Cover</label>
                                        <input id="coverImage" type="file" name="coverImage" onChange={handleInput} className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre" >Album genre</label>
                                        <input id="genre" type="text" value={editAlbum.genre} onChange={handleInput} name="genre" placeholder="Enter Album Genre" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songs" >Album Songs</label>
                                        <input id="songs" type="text" value={editAlbum.songs} onChange={handleInput} name="songs" placeholder="Enter Album Songs" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">Description</label>
                                        <textarea id="desc" name="desc" value={editAlbum.desc} onChange={handleInput} placeholder="Enter description" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" ></textarea>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none" >Submit</button>
                                        <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded focus:outline-none">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-auto">
                        <div className="col-12">
                            <div className="flex justify-center items-center w-full mb-[25px]">
                                <form className="w-full h-full bg-white p-[25px] shadow-md rounded">
                                    <h6 className="text-xl mb-[45px] text-left bg-white">
                                        Social Information
                                    </h6>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="furl" >Facebook URL</label>
                                        <input id="furl" type="text" name="facebook" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="turl" >Twitter URL</label>
                                        <input id="turl" type="text" name="twitter" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gcurl" >Google Plus URL</label>
                                        <input id="gcurl" type="text" name="googlePlus" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none" >Submit</button>
                                        <button type="button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded focus:outline-none">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default EditAlbum;