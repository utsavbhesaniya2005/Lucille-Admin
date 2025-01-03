import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import "./AddProduct.css"; 
import { useDispatch } from "react-redux";
import { addAlbumAsync } from "../../services/actions/AlbumAction";

const AddProduct = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addArtist, setAddArtist] = useState({
        aname : '',
        dob : '',
        gender : 'Male',
        aimage : '',
        genre : ["Edm"],
        desc : ''
    });

    const handleInput = (e) => {

        const { name, value, files, type, checked } = e.target;
    
        if(name === "aimage" && files.length > 0){

            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () =>{
                
                setAddArtist((prevData) => ({
                    ...prevData,
                    [name] : reader.result,
                }));
            };
            reader.readAsDataURL(file);

        } else if (type === "checkbox") {
            
            setAddArtist((prevData) => {
                const genres = prevData.genre;
                if(checked){
                
                    return {
                        ...prevData,
                        genre: [...genres, value],
                    };
                } else {
    
                    return {
                        ...prevData,
                        genre: genres.filter((g) => g !== value),
                    };
                }
            });
        }else if(type === "radio") {
            setAddArtist((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }else{
            setAddArtist((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(addArtist);
        dispatch(addAlbumAsync(addArtist));

        setAddArtist({
            aname : '',
            dob : '',
            gender : 'Male',
            aimage : '',
            genre : ["Edm"],
            desc : ''
        });

        navigate('/');
    }

  return (
    <>
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Sidebar collapsed={collapsed} />
        <div className={`dashbaord-wrapper ${collapsed ? "sidebar-collapsed" : ""} bg-[#E7EAEE]`} >
            <div className={`dashboard`}>
                <div className="container">
                    <div className="row gap-y-8 items-center">
                        <div className="col-12 p-0">
                            <div className="heading-area flex items-center bg-white">
                                <div className="col-5">
                                    <div className="heading">
                                        <h4>Add Artist Page</h4>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="breacrumb-area flex justify-content-end pe-1 pt-1 w-full">
                                        <Breadcrumb>
                                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <Link to="/addArtist">Add Artist Page</Link>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-auto">
                        <div className="col-12">
                            <div className="flex justify-center items-center w-full h-full min-h-screen">
                                <form className="w-full bg-white p-[25px] shadow-md rounded" onSubmit={handleSubmit} >
                                    <h6 className="text-xl mb-[45px] text-left bg-white">
                                        Add Artist
                                    </h6>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name" >Name</label>
                                        <input id="name" type="text" value={addArtist.name} onChange={handleInput} name="aname" placeholder="Enter Artist Name" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob" >Date of Birth</label>
                                        <input id="dob" type="date" value={addArtist.dob} onChange={handleInput} name="dob" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender" >Gender</label>
                                        <div className="gender flex items-center column-gap-2">
                                            <input type="radio" name="gender" value='Male' onChange={handleInput} checked={addArtist.gender === 'Male'} />Male
                                            <input type="radio" name="gender" value='Female' onChange={handleInput} checked={addArtist.gender === 'Female'} />Female
                                            <input type="radio" name="gender" value='Other' onChange={handleInput} checked={addArtist.gender === 'Other'} />Other
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">Profile Image</label>
                                        <input id="profileImage" type="file" name="aimage" onChange={handleInput} className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">Genre</label>
                                        <div className="flex flex-wrap gap-4">
                                            {
                                                ["Edm", "Classical", "Indie-Pop", "Hip-Hop", "Rock"].map((genre) => (
                                                    <label key={genre} className="inline-flex items-center" >
                                                        <input type="checkbox" value={genre} className="form-checkbox h-4 w-4 text-blue-600" checked={addArtist.genre.includes(genre)} name="genre" onChange={handleInput} />
                                                        <span className="ml-2 text-gray-700">{genre}</span>
                                                    </label>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">Description</label>
                                        <textarea id="desc" name="desc" value={addArtist.desc} onChange={handleInput} placeholder="Enter description" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" ></textarea>
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
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scurl" >Sound Cloud URL</label>
                                        <input id="scurl" type="text" name="soundcloud" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surl" >Spotify URL</label>
                                        <input id="surl" type="text" name="spotify" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="yurl" >YouTube URL</label>
                                        <input id="yurl" type="text" name="youtube" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
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

export default AddProduct;