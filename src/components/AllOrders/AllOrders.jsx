import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { Breadcrumb, Table } from "react-bootstrap";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersAsync } from "../../services/actions/ProductAction";
import './AllOrders.css'

const AllOrders = () => {

    const { orders } = useSelector(state => state.ProductReducers);

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrdersAsync());
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
                                            <h4>All Orders Page</h4>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="breacrumb-area flex justify-content-end pe-1 pt-1 w-full">
                                            <Breadcrumb>
                                                <Breadcrumb.Item>
                                                    <Link to='/'>Home</Link>
                                                </Breadcrumb.Item>
                                                <Breadcrumb.Item>
                                                    <Link to='/orders'>All Orders Page</Link>
                                                </Breadcrumb.Item>
                                            </Breadcrumb>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-12">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr className="text-center">
                                                <th>#</th>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>   
                                            {
                                                orders.length === 0 
                                                ?  <h1 className="mt-3 text-center w-full">No Orders Found.</h1>
                                                : 
                                                orders.map((order, index) => {
                                                    return(
                                                        <tr key={order.id} className="text-center">
                                                            <td>{index + 1}</td>
                                                            <td className="flex justify-center">
                                                                <img src={order.pimage || 'https://via.placeholder.com/50'} alt={order.pname} className="product-image " />
                                                            </td>
                                                            <td>{order.pname}</td>
                                                            <td>{order.price}</td>
                                                            <td>{order.quan}</td>
                                                            <td>{order.tprice}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default AllOrders;