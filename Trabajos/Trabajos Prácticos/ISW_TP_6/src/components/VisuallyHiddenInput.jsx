/* eslint-disable linebreak-style */
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import PropTypes from 'prop-types'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

InputFileUpload.propTypes = {
  setSelectedFile2: PropTypes.func
}

export default function InputFileUpload ({ setSelectedFile2 }) {
  const [selectedFiles, setSelectedFiles] = React.useState([])

  const handleImageChange = (event) => {
    const files = event.target.files
    const acceptedTypes = ['image/jpeg', 'image/png']
    const newFiles = Array.from(files).filter((file) =>
      acceptedTypes.includes(file.type)
    )
    setSelectedFiles([...selectedFiles, ...newFiles])
    setSelectedFile2([...selectedFiles, ...newFiles])
  }

  const handleRemoveImage = (fileToRemove) => {
    setSelectedFiles(selectedFiles.filter(file => file !== fileToRemove))
    setSelectedFile2(selectedFiles.filter(file => file !== fileToRemove))
  }

  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: '#dda15e',
          '&:hover': {
            backgroundColor: '#D09F5C'
          }
        }}
        style={
          {
            fontFamily: 'Rubik, sans-serif',
            fontWeight: '500',
            fontSize: '0.95em'
          }
        }
        fullWidth
      >
        Cargar imagen
        <VisuallyHiddenInput type="file" onChange={handleImageChange} />
      </Button>
      {selectedFiles.length > 0 && selectedFiles.map((file, index) => (
        <div key={index}>
          <CloudDoneIcon color="success" />
          <span>{file.name}</span>
          <IconButton onClick={() => handleRemoveImage(file)} variant="outlined">
            <DeleteIcon />
          </IconButton>
        </div>
      ))}
    </>
  )
}
