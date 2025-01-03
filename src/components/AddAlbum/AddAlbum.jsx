import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import "./AddAlbum.css"; 
import { useDispatch } from "react-redux";
import { addAlbumAsync } from "../../services/actions/AlbumAction";

const AddAlbum = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addAlbum, setAddAlbum] = useState({
        aname : '',
        artistName : '',
        ardate : '',
        albumDura : '',
        coverImage : '',
        genre : '',
        songs : '',
        desc : ''
    });

    const handleInput = (e) => {

        const { name, value, files } = e.target;
    
        if(name === "coverImage" && files.length > 0){

            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () =>{
                
                setAddAlbum((prevData) => ({
                    ...prevData,
                    [name] : reader.result,
                }));
            };
            reader.readAsDataURL(file);

        }else{
            setAddAlbum((prevData) => ({
                
                ...prevData,
                [name]: value,
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(addAlbum);
        dispatch(addAlbumAsync(addAlbum));

        setAddAlbum({
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
                                        <h4>Add Album Page</h4>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="breacrumb-area flex justify-content-end pe-1 pt-1 w-full">
                                        <Breadcrumb>
                                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <Link to="/addAlbum">Add Album Page</Link>
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
                                        Album Details
                                    </h6>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="aname" >Album Name</label>
                                        <input id="aname" type="text" value={addAlbum.aname} onChange={handleInput} name="aname" placeholder="Enter Album Name" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="artistName" >Album Artist</label>
                                        <input id="artistName" type="text" value={addAlbum.artistName} onChange={handleInput} name="artistName" placeholder="Enter Artist Name" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ardate" >Album Release Date</label>
                                        <input id="ardate" type="date" value={addAlbum.ardate} onChange={handleInput} name="ardate" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="albumDura" >Album Duration</label>
                                        <input id="albumDura" type="number" value={addAlbum.albumDura} onChange={handleInput} name="albumDura" placeholder="Total Time Of The Album Ex:- 25:31" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">Album Cover</label>
                                        <input id="coverImage" type="file" name="coverImage" onChange={handleInput} className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre" >Album genre</label>
                                        <input id="genre" type="text" value={addAlbum.genre} onChange={handleInput} name="genre" placeholder="Enter Album Genre" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="songs" >Album Songs</label>
                                        <input id="songs" type="text" value={addAlbum.songs} onChange={handleInput} name="songs" placeholder="Enter Album Songs" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">Description</label>
                                        <textarea id="desc" name="desc" value={addAlbum.desc} onChange={handleInput} placeholder="Enter description" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" ></textarea>
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

export default AddAlbum;