// Imports
import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Image-form.module.css";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import db from "../firebaseConfig";
import { toast } from "react-toastify";

// Component for image form to add a new image in a album.
function ImageForm(props){
    // States
    let [title, setTitle] = useState("");
    let [imageUrl, setImageUrl] = useState("");
    const imageTitleRef = useRef(null);
    const imageUrlRef = useRef(null);
    const [updateImg, setUpdateImg] = useState(false);

    // Side effects for edit images.
    useEffect(() => {
        // Checking in props if edit icon is clicked by checing props values
    if (props.updateImg) {
        // Setting update image form title and url values of image to be edit
        setTitle(props.updateImgData.title || "");
        setImageUrl(props.updateImgData.imageUrl || "");
        setUpdateImg(true);
    }
    }, [props.updateImg, props.updateImgData]);

    // Function to add imageTitleRef value to title.
    const handleTitleInputChange = () => {
        setTitle(imageTitleRef.current.value);
    }

    // Function to add imageUrlRef value to imageUrl.
    const handleUrlInputChange = () => {
        setImageUrl(imageUrlRef.current.value);
    }

    // Function to handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Checking if image title already exists
        const snapShot = await getDocs(collection(db, "images"));
        const existingImage = snapShot.docs.find((doc) => doc.data().title === title);

        // Checking if image should be update
        if(updateImg)
        {
            // Updating the image
            try {
                const updateImageRef = doc(db, "images", props.updateImgData.id);
                // Updating using updateDoc() in firebase database
                await updateDoc(updateImageRef, {
                    title: title,
                    imageUrl: imageUrl,
                    createdOn: new Date()
                });
                // Showing notification after updating
                toast.success("Image updated successfully");
            } catch (error) {
                console.log(`Error In Updating Image: `, error);
                toast("Error in updating image");
            }
        }
        // If image exist then showing notification here
        else if(existingImage)
        {
            toast.error("Image already exists by this title!");
        }
        // Image should be added here
        else
        {
            try {
                // Adding new image in the firebase database
                const imagesRef = doc(collection(db, "images"));
                await setDoc(imagesRef, {
                    albumId: props.albumId,
                    albumName: props.albumName,
                    title: title,
                    imageUrl: imageUrl,
                    createdOn: new Date()
                });
                // Resetting the form field after submission
                setTitle(""); 
                setImageUrl("");
                // Showing notification
                toast.success("Image added successfully!");
            } catch (error) {
                console.log(error);
                toast.error("Failed to add the image. Please try again later.");
            }
        }
    };

    // Handling clear button in image form to clear input fields value
    const handleClearBtn = () => {
        setTitle(""); 
        setImageUrl("");
    }

    // Returning JSX
    return (
        // Image form container
        <div className={styles.imageFormContainer}>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.imageForm}>
            <h1> {updateImg ? `Update Image ${props.updateImgData.title}` : `Add Image to ${props.albumName}`}</h1>
            {/* Form inputs */}
            <input type="text" placeholder="Title" ref={imageTitleRef} onChange={handleTitleInputChange} value={title} required/>
            <input type="url" placeholder="Image Url" ref={imageUrlRef} onChange={handleUrlInputChange} value={imageUrl} required/>
            {/* Form buttons */}
            <div className={styles.btnContainer}>
            <button type="reset" className={styles.clearBtn} onClick={handleClearBtn}>Clear</button>
            <button type="submit" className={styles.addBtn}>{updateImg ? "Update" : "Add"}</button>
            </div>
            </form>
        </div>
    )
}

// Exporting component.
export default ImageForm;