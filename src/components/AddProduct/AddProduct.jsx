import { useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Breadcrumb } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import "./AddProduct.css"; 
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../../services/actions/ProductAction";

const AddProduct = () => {

    const { admin } = useSelector(state => state.AuthReducer);

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [addProduct, setAddProduct] = useState({
        pname : '',
        price : '',
        pdesc : '',
        pimage : ''
    });

    const handleInput = (e) => {

        const { name, value, files } = e.target;
    
        if(name === "pimage" && files.length > 0){

            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () =>{
                
                setAddProduct((prevData) => ({
                    ...prevData,
                    [name] : reader.result,
                }));
            };
            reader.readAsDataURL(file);

        }else{
            setAddProduct((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    }

    const handleSubmit = (e) => {
        
        e.preventDefault();

        const newProduct = addProduct;
        
        newProduct.adminId = admin.uid;

        dispatch(addProductAsync(addProduct));

        setAddProduct({
            pname : '',
            price : '',
            pdesc : '',
            pimage : ''
        });

        navigate('/');
    }

  return (
    <>
        <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
        <Sidebar collapsed={collapsed} />
        <div className={`dashboard-wrapper ${collapsed ? "sidebar-collapsed" : ""} bg-[#E7EAEE]`} >
            <div className={`dashboard`}>
                <div className="container">
                    <div className="row gap-y-8 items-center">
                        <div className="col-12 p-0">
                            <div className="heading-area flex items-center bg-white">
                                <div className="col-5">
                                    <div className="heading">
                                        <h4>Add Product Page</h4>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="breacrumb-area flex justify-content-end pe-1 pt-1 w-full">
                                        <Breadcrumb>
                                            <Breadcrumb.Item>
                                                <Link to='/'>Home</Link>
                                            </Breadcrumb.Item>
                                            <Breadcrumb.Item>
                                                <Link to="/addProduct">Add Product Page</Link>
                                            </Breadcrumb.Item>
                                        </Breadcrumb>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mx-auto">
                        <div className="col-12">
                            <div className="flex justify-center items-center w-full h-full mt-3">
                                <form className="w-full bg-white p-[25px] shadow-md rounded" onSubmit={handleSubmit} >
                                    <h6 className="text-xl mb-[45px] text-left bg-white">
                                        Add Product
                                    </h6>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name" >Name</label>
                                        <input id="name" type="text" value={addProduct.pname} onChange={handleInput} name="pname" placeholder="Enter Product Name" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price" >Price</label>
                                        <input id="price" type="number" value={addProduct.price} onChange={handleInput} name="price" placeholder="Enter Product Price" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proImage">Product Image</label>
                                        <input id="proImage" type="file" name="pimage" onChange={handleInput} className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" />
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desc">Description</label>
                                        <textarea id="desc" name="pdesc" value={addProduct.desc} onChange={handleInput} placeholder="Enter description" className="gradient-border w-full py-2 px-1 border-b border-gray-300 focus:outline-none" ></textarea>
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