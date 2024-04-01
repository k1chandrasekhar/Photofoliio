// Imports
import { useEffect, useState } from "react";
import styles from "../Styles/Album-list.module.css";
import AlbumForm from "./AlbumForm";
import db from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import Album from "./Album";
import Spinner from 'react-spinner-material';
import ImagesList from "./ImagesList";

// Component for album list to show form and all albums.
function AlbumList(){
    // States
    const[imagesVisible, setImagesVisible] = useState(false);
    const [albumName, setAlbumName] = useState("");
    const [albumId, setAlbumId] = useState("");
    const[albumFormVisible, setAlbumFormVisible] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    // Using effect on mounting to vet all albums from database.
    useEffect(() => {
        // fetchData() fetch all albums data from firebase and set to albums state.
        async function fetchData(){
            const unSubscribe = onSnapshot(collection(db, "albums"), (snapShot) => {
                    const albums = snapShot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    // Setting albums to albums state.
                    setAlbums(albums);
                    // setting loading false after successfully fetched data
                    if(albums)
                    {
                        setLoading(false);
                    }
            });
            return () => unSubscribe(); //Unsubscribing
        }
        fetchData(); //Calling fetchData()
    }, []);

    // onClick Add Album showing form to add new album.
    const handleAddAlbumBtn = () => {
        setAlbumFormVisible(true);
    }

    // onClick cancel hiding form after add album button .
    const handleCancelAddAlbumBtn = () => {
        setAlbumFormVisible(false);
    }

    // When we click on album then to open images handling album click function here.
    const handleOpenImages = async (id, name) => {
        setImagesVisible(true);
        // Finding images of the album.
        try {
            setAlbumName(name);
            setAlbumId(id);
        } catch (error) {
            console.log(error);
        }
    }
    
    // Handle back to album button from images page.
    const handleBackToAlbumBtn = () => {
        setImagesVisible(false);
    }

    // Returning JSX
    return (
        // Conditionally rendering the Image list component or Album List here.
        imagesVisible ? <ImagesList albumId={albumId} albumName={albumName} handleBackToAlbumBtn={handleBackToAlbumBtn}/> :
            <div className={styles.albumsContainer}>
            {albumFormVisible ? <AlbumForm/> : null}

            {/* Header shows Heading and form buttons to add album or cancel. */}
            <header>
                <h1>Your albums</h1>
                {albumFormVisible ? 
                <button className={styles.cancelBtn} onClick={handleCancelAddAlbumBtn}>Cancel</button> :  
                <button className={styles.addAlbumBtn} onClick={handleAddAlbumBtn}>Add album</button>
                }
            </header>

            {/* Showing loading before data is fetched conditionally */}
            {loading ?       
                <div className={styles.loaderContainer}>
                    <Spinner radius={120} color={"#333"} stroke={2} visible={true}/>
                </div> :

                // Main is showing all albums here.
            <main>
                {/* Here passing data to Album component */}
                {albums.length > 0 ? albums.map((album, index) => (
                    <Album key={album.id} name={album.name} albumId={album.id} handleOpenImages={handleOpenImages}/>
                )) : <h1>No Albums Let's Create One</h1>}
            </main>
            }
        </div>
    )
}

// Exporting component.
export default AlbumList;