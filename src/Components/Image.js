// Imports
import styles from "../Styles/Image.module.css";

// Creating component for the image here.
function Image(props){

    // Returning JSX
    return (
        // Image container which includes image title and photo
        <div className={styles.imageContainer} onClick={() => props.handleShowCarousel(props.id)}>
            {/* Image and setting url from props*/}
            <img src={props.url} alt={props.title} className={styles.image}/>
            {/* Delete and edit buttons container shown on hover on image container */}
            <div className={styles.iconContainer}>
                <img src="https://cdn-icons-png.flaticon.com/128/9790/9790368.png" 
                    alt="Delete" className={styles.deleteIcon} 
                    onClick={(event) => props.handleDeleteIcon(event, props.id)} 
                    />
                <img src="https://cdn-icons-png.flaticon.com/128/5996/5996831.png" 
                    alt="Edit" 
                    className={styles.editIcon} 
                    onClick={(event) => props.handleEditIcon(event, props.id, {title: props.title, imageUrl: props.url})}
                    />
            </div>
            {/* Image title setting from props */}
            <p className={styles.imageTitle}>{props.title}</p>
        </div>
    )
}

// Exporting component.
export default Image;