import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios'; // For image upload

const AdminFoodForm = ({ onAddFood, onCloseForm }) => {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); // For image selection
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (foodName.trim() === '' || description.trim() === '' || price.trim() === '' || !selectedFile) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    // Upload the image to Freeimage.host
    setIsUploading(true);
    const formData = new FormData();
    formData.append('source', selectedFile);
    formData.append('key', '6d207e02198a847aa98d0a2a901485a5'); // Freeimage.host API key
    formData.append('action', 'upload');
    formData.append('format', 'json');

    try {
      const response = await axios.post('http://cors-server:5000/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = response.data.image.display_url; // Get the uploaded image URL

      // Create the new food object with the image URL
      const newFood = {
        name: foodName,
        description: description,
        price: `$${parseFloat(price).toFixed(2)}`,
        imageUrl: imageUrl, // Include image URL in food object
      };

      onAddFood(newFood); // Send the new food item to be added
      onCloseForm(); // Close the form after submission

    } catch (error) {
      alert('Image upload failed. Please try again.');
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '20px', maxWidth: '400px', margin: '0 auto' }}
    >
      <Typography variant="h6">Add New Food Item</Typography>
      <TextField
        label="Food Name"
        variant="outlined"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Price"
        variant="outlined"
        type="number"
        inputProps={{ step: '0.01' }}
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {isUploading && <Typography variant="body2" color="primary">Uploading image...</Typography>}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
        <Button type="submit" variant="contained" color="primary" disabled={isUploading}>
          {isUploading ? 'Adding...' : 'Add'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCloseForm}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AdminFoodForm;
