// Imports
import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Images-list.module.css";
import ImageForm from "./ImageForm";
import Image from "./Image";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import db from "../firebaseConfig";
import Spinner from "react-spinner-material";
import { toast } from "react-toastify";
import Carousel from "./Carousel";

// Creating component for the ImagesList here.
function ImagesList(props){
    // States
    const [imagesFormVisible, setImagesFormVisible] = useState(false);
    let [images, setImages] = useState([]);
    let [loading, setLoading] = useState(true);
    let [search, setSearch] = useState(false);
    let [searchQuery, setSearchQuery] = useState("");
    let [updateImage, setUpdateImage] = useState(false);
    let [updateImageData, setUpdateImageData] = useState({});
    let [showCarousel, setShowCarousel] = useState(false);
    let [carouselImageIndex, setCarouselImageIndex] = useState("");
    const searchInputRef = useRef(null);

    // Using side effect to render all images on album load and render searched images.
    useEffect(() => {
        // fetchData() function fetches all images of the album
        const fetchData = async () => {
            const unsubscribe = onSnapshot(collection(db, "images"), async (snapShot) => {
                const images = snapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Checking if searched images is needed
                if (!searchQuery) {
                    const albumImages = images.filter((image) => image.albumId === props.albumId);
                    setImages(albumImages);
                    setLoading(false);
                } else {
                    // Finding all images of the album and setting to images state
                    try {
                        const querySnapshot = await getDocs(collection(db, 'images'));
                        const searchQueryLower = searchQuery.toLowerCase();
                        
                        // filtering images of particular album whoose opened from all images
                        const filteredImages = querySnapshot.docs
                            .filter((doc) => {
                                const title = doc.data().title.toLowerCase();
                                const albumId = doc.data().albumId;
                                return title.includes(searchQueryLower) && albumId === props.albumId;
                            })
                            .map((doc) => ({
                                id: doc.id,
                                ...doc.data(),
                            }));
                        // Setting images state here and stoping loading after images fetched by setting loading state.
                        setImages(filteredImages);
                        setLoading(false);
                    } catch (error) {
                        console.error("Error fetching documents: ", error);
                    }
                }
            });

            // Unsubscribing
            return () => unsubscribe();
        };
        fetchData(); //Calling fetchData()
    }, [props.albumId, searchQuery]);

    // onClick Add Image button to add new image in the album
    const handleAddImageBtn = () => {
        setImagesFormVisible(true);
    }

    // onClick cancel after adding Image button or updating image
    const handleCancelAddImageBtn = () => {
        setImagesFormVisible(false);
        setUpdateImage(false);
    }

    // Handling search button by setting search state
    const handleSearchBtnClick = () => {
        setSearch(true);
        setTimeout(() => {
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        }, 100); 
    }

    // Handling close search to closing search form
    const handleCloseSearchBtn = () => {
        setSearch(false);
    }

    // Function to set searchQuery value on change of the search input field value.
    const handleSearchQuery = (event) => {
        const query = event.target.value;
        setSearchQuery(query); // Updating searchQuery with input value
    }

    // Editing Image
    const handleEditIcon = (event, id, data) => {
        event.stopPropagation();
        // Getting the data that needs to update of a image and setting state
        const updatedData = {...data, id};
        // Showing update image form after clicking edit icon by setting state
        setUpdateImage(true);
        setImagesFormVisible(true);
        setUpdateImageData(updatedData);
    }

    // Deleting image from firebase database function on click of delete icon
    const handleDeleteIcon = async (event, id) => {
        event.stopPropagation();
        const docRef = doc(db, "images", id);
        try {
            await deleteDoc(docRef);
            toast.success("Image removed successfully");
        } catch (error) {
            console.error("Error deleting image: ", error);
            // Optionally, show an error notification if the deletion fails
            toast.error("Failed to remove image");
        }
    };

    // Setting state to show image carousel.
    const handleShowCarousel = (id) => {
        setShowCarousel(true);
        // Finding image Index on which clicked here
        const imageIndex = images.findIndex((image) => image.id === id);
        setCarouselImageIndex(imageIndex)
    }

    // Closing carousel
    const handleCloseCarousel = () => {
        setShowCarousel(false);
    }
    
    // Returning JSX
    return (
        // Images list container
    <div className={styles.imagesListContainer}>
        {/* Header shows album name and search icon and all conditionally and back button */}
        <header>
            {/* Showing back to album button */}
        <div className={styles.backImageContainer}>
            <img src="https://mellow-seahorse-fc9268.netlify.app/assets/back.png" 
                alt="back" 
                onClick={props.handleBackToAlbumBtn} 
                className={styles.backIcon}
                /> 
        </div>

        {/* Showing album name*/}
        <h1>{images.length > 0 ? 
                    `Images in ${props.albumName}` : images.length === 0 && search ? 
                    "No images found on your search" : `No images found in the album.`
                    }
        </h1>

        {/* Showing search icon */}
        {images.length || search > 0 ?
        (
            search ? (
            <div className={styles.searchContainer}>
            <input type="search" className={styles.searchInput} 
                placeholder="Search"
                ref={searchInputRef} 
                onChange={(event) => handleSearchQuery(event)}
                value={searchQuery}
                />
            <img src="https://cdn-icons-png.flaticon.com/128/13692/13692659.png"
             alt="close search" 
             onClick={handleCloseSearchBtn}
             className={styles.closeSearch}
             />
            </div>)
             :
            <img src="https://cdn-icons-png.flaticon.com/128/954/954591.png" 
                alt="search" 
                className={styles.searchIcon} 
                onClick={handleSearchBtnClick}
                />
        )
         : null}

         {/* Showing add image and cancel button */}
        {imagesFormVisible ? 
        <button className={styles.cancelBtn} onClick={handleCancelAddImageBtn}>Cancel</button> :  
        <button className={styles.addImageBtn} onClick={handleAddImageBtn}>Add Image</button>
        }
        </header>

        {/* Displaying form conditionally if add of update image button click */}
        {imagesFormVisible ? 
            <ImageForm albumId={props.albumId} 
            albumName={props.albumName} 
            updateImg={updateImage} 
            updateImgData={updateImageData} 
            /> : null}
        {/*  */}

        {/* Conditionally showing loading while data is fetching */}
        {loading ? (
        <div className={styles.loaderContainer}>
            <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </div>
        ) : (

        // Showing all images in the main of the album here
           <main className={styles.imagesMain}>
            {/* Passing to image component each image and props for render */}
            {images.map((image) => (
                <Image key={image.id} 
                    id={image.id} 
                    title={image.title} 
                    url={image.imageUrl} 
                    handleDeleteIcon={handleDeleteIcon} 
                    handleEditIcon={handleEditIcon}
                    handleShowCarousel={handleShowCarousel}
                    />
            ))}

            {/* Conditonally render the image carousel to show images */}
            {showCarousel && (
                <Carousel images={images} handleCloseCarousel={handleCloseCarousel} imageIndex={carouselImageIndex}/>
            )}
        </main>
    )}
    </div>
    )
}

// Exporting component.
export default ImagesList;