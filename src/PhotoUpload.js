import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios';
import logo from './images/plant idento.png'

const PhotoUpload = () => {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
            sendImageForIdentification(file);
        };
        reader.readAsDataURL(file);
};
const sendImageForIdentification = (file) => {
        const formData = new FormData();
        formData.append('images', file);

        axios.post('https://api.plant.id/v2/identify', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Api-Key': 'W9wG2QfMQByyAhUnksAzik0c0vG7gvANzK6GiQbHOU9fGY3MAX',
        },
    })
    .then(response => {
        setResult(response.data.suggestions[0].plant_name);
    })
    .catch (error => {
  setError('Failed to identify plant species');
  });
};

  return (
    <div>
        <img style={logoStyles} src={logo} alt="PlantIdento" />
        <h2 style={h2Styles}>Check Out Plant Idento!</h2>
        <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} style={dropzoneStyles}>
                    <input {...getInputProps()} />
                    <p> Add or drop an image here</p>
                </div>
            )}
        </Dropzone>
        {image && (
            <div>
               <img src={image} alt="uploaded" style={imageStyles} />
               {result ? (
                <div>
                    <h3 style={h3Styles}>Identification Result</h3>
                    <p style={pStyles}>Common name: {result}</p>
                </div>
               ) : error ? (
                <p>{error}</p>
               ) : (
                <p>Identifying...</p>
               )}
            </div>
        )}
    </div>
  );
};

const dropzoneStyles = {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    width: '400px',
    fontFamily: 'sans-serif'
  };
  
  const imageStyles = {
    maxWidth: '100%',
    maxHeight: '300px',
    marginTop: '20px',
  };

  const h2Styles = {
    paddingBottom: '15px',
    fontFamily: 'sans-serif',
    fontSize: '18px',
    color: 'black'
  }

  const logoStyles = {
    width: '400px',
    paddingTop: '250px',
    paddingBottom: '150px'
  }

  const h3Styles = {
    fontFamily: 'sans-serif'
  }

  const pStyles = {
    fontFamily: 'sans-serif',
    fontWeight: 'light',
    paddingTop: '20px'
  }
export default PhotoUpload