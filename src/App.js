// Imports
import Navbar from "./Components/Navbar";
import AlbumList from "./Components/AlbumsList";
import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// App is rendring Navbar component, ToastContainer component for notifications and AlbumList component which renders all albums.
function App() {
  
  // Returning JSX
  return (
    <>
    <Navbar/>
    <ToastContainer />
    <AlbumList />
    </>
  )
}

// Exporting App
export default App;
