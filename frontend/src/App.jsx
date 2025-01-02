// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Image from './Image/Image';
// import ShowImage from './Image/ShowImage';
// import Layout from './Image/Layout';
// import Updateimage from './Image/UpdateImage';

// import InsertData from "./Data/InsertData";
// import ReadData from './Data/ReadData';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Layout from './Data/Layout';
// import Update from './Data/Update';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CreatImage from './mulImages/CreatImage';
import Layout from './mulImages/Layout';
import ReadImage from './mulImages/ReadImage';

export  const  App = () => {
  
    return (
    <>
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<ReadData/>} />
          <Route path='/insertdata' element={<InsertData/>} />
          <Route path='/update/:id' element={<Update/>} />
        </Route>
      </Routes>
    </BrowserRouter> */}

    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='/'element={<ShowImage/>} />
        <Route path='/insertimge' element={<Image/>} />
        <Route path='/updateimage/:id' element={<Updateimage/>} />
        </Route>
      </Routes>
    </BrowserRouter>   */}

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route path='/' element={<ReadImage/>} />
          <Route path='/creatimage' element={<CreatImage/>} />
          <Route path='/updateimage/:id' element={<ReadImage/>} />
        </Route>
      </Routes>
      </BrowserRouter>
  </>);
};