/* eslint-disable linebreak-style */
import * as React from 'react';
import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// eslint-disable-next-line require-jsdoc
export default function InputFileUpload(props) {
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
    props.setSelectedFile(event.target.files[0]);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    props.setSelectedFile(null);
  };

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{
          'backgroundColor': '#dda15e',
          '&:hover': {
            backgroundColor: '#D09F5C',
          },
        }}
      >
        Cargar imagen
        <VisuallyHiddenInput type="file" onChange={handleImageChange} />
      </Button>
      {selectedFile && <CloudDoneIcon color="success" />}
      {selectedFile && (
        <IconButton onClick={handleRemoveImage} variant="outlined">
          <DeleteIcon />
        </IconButton>
      )}
    </>
  );
}
