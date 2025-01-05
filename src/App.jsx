import { Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './pages/Dashboard';
import AddProduct from './components/AddProduct/AddProduct';
import AddAlbum from './components/AddAlbum/AddAlbum';
import ShowAlbum from './components/ShowAlbum/ShowAlbum';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import EditAlbum from './components/EditAlbum/EditAlbum';
import ShowProducts from './components/ShowProduct/ShowProducts';
import EditProduct from './components/EditProduct/EditProduct';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} ></Route>
        <Route path='/addProduct' element={<AddProduct />} ></Route>
        <Route path='/editProduct/:id' element={<EditProduct />} ></Route>
        <Route path='/addAlbum' element={<AddAlbum />} ></Route>
        <Route path='/editAlbum/:id' element={<EditAlbum />} ></Route>
        <Route path='/allAlbums' element={<ShowAlbum />} ></Route>
        <Route path='/allProducts' element={<ShowProducts />} ></Route>
        <Route path='/signIn' element={<SignIn />} ></Route>
        <Route path='/signUp' element={<SignUp />} ></Route>
      </Routes>
    </>
  )
}

export default App;