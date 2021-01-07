import { useState, useRef, useContext, useEffect } from 'react';
// i18n
import { useTranslation } from 'react-i18next';
// Providers
import { ToolsContext } from 'App';
// Custom Hooks
import useProgressiveImg from 'hooks/useProgressiveImg';
// Icons
import { ReactComponent as Logo } from 'assets/Logo.svg';
import { ReactComponent as Upload } from 'assets/Upload.svg';
import { ReactComponent as Drag } from 'assets/Drag.svg';
import { ReactComponent as Delete } from 'assets/Delete.svg';
// Components (children)
import Slider from '../Slider';
// CSS filters
import DEFAULT_OPTIONS from '../Toolbar/Right/options.json';
// Components (styles)
import { Box, ImageBox, UploadState } from './fileUploader.styles';
// Api
import api from 'services/api';

function FileUploader() {
  // i18n
  const { t } = useTranslation();
  // Image uploading states
  const dndRef = useRef(); // Access DnD element reference and its current state
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [, { blur }] = useProgressiveImg(
    '',
    uploadedImageUrl
  );
  const [uploadedImageName, setUploadedImageName] = useState('image');
  // CSS Filters
  const { activeTool } = useContext(ToolsContext);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedFilter = options[activeTool];

  // DnD (Drag 'n' drop) file upload
  const handleDragIn = e => {
    // Prevent default events and file be opened
    e.preventDefault();
    e.stopPropagation();
    // If a file at least one file was found
    if (e.dataTransfer.items) setIsDragging(true);
  }
  const handleDragOut = e => {
    // Prevent default events and file be opened
    e.preventDefault();
    e.stopPropagation();
    // If the user cancels/stops dragging¹
    setIsDragging(false);
  }
  const handleDrag = e => {
    // Prevent default events and file be opened
    e.preventDefault();
    e.stopPropagation();
  }
  const handleDrop = async e => {
    // Prevent default events and file be opened
    e.preventDefault();
    e.stopPropagation();
    // If the user drops the file
    if (e.dataTransfer.files) {
      let formData = new FormData();
      formData.append('file', e.dataTransfer.files[0]);
      formData.append('upload_preset', 'Edite_App');
      setIsUploading(true);

      let data = await api.post('/image/upload', formData);

      let file = data.data;

      setIsDragging(false);
      setIsUploading(false);
      setUploadedImageUrl(file.secure_url);
      setUploadedImageName(file.original_filename);
    }
  }

  useEffect(() => {
    // Get the mounted DnD instance as its `current`
    let dragzoneEl = dndRef.current;

    // "Watch" all the events
    dragzoneEl.addEventListener('dragenter', handleDragIn);
    dragzoneEl.addEventListener('dragleave', handleDragOut);
    dragzoneEl.addEventListener('dragover', handleDrag);
    dragzoneEl.addEventListener('drop', handleDrop);
    // Clean up all the events
    return () => {
      dragzoneEl.removeEventListener('dragenter', handleDragIn);
      dragzoneEl.removeEventListener('dragleave', handleDragOut);
      dragzoneEl.removeEventListener('dragover', handleDrag);
      dragzoneEl.removeEventListener('drop', handleDrop);
    }
  }, [])

  // Get the file's data and send to clodinary
  const onFileChange = async e => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'Edite_App');
    setIsUploading(true);

    let data = await api.post('/image/upload', formData);

    let file = data.data;

    setIsDragging(false);
    setIsUploading(false);
    setUploadedImageUrl(file.secure_url);
    setUploadedImageName(file.original_filename);
  }

  // Get slider value according to the tools
  const handleSliderChange = ({ target }) => {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== activeTool) return option
        return { ...option, value: target.value }
      })
    })
  }

  // Get CSS filters and return as a object
  const handleImageStyling = () => {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return filters.join(' ')
  }

  return (
    <Box
      className={isDragging ? 'box__dragging' : ''}
      ref={dndRef}
    >
      {/* If the image was not uploaded yet... */}
      {!uploadedImageUrl ? (
        <>
          {(!isUploading && !isDragging) && (
            <div className="input__box">
              <Logo />
              <input
               type="file"
                name="image[]"
                id="image"
                accept="image/png, image/jpeg"
                onChange={onFileChange}
              />
              <div className="box__upload_text">
                <span>
                  {t('DND.Main')}
                  <span>
                    {t('DND.Or')}
                  </span>
                </span>
                <label htmlFor="image" tabIndex="0">
                  {t('DND.Label')}
                </label>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* If the user drops an image if there's already one uploaded */}
          {!isDragging && (
            <ImageBox>
              <img
                draggable="false" // Prevent default drag
                src={uploadedImageUrl}
                alt={uploadedImageName}
                style={{
                  filter: blur
                    ? 'blur(1.25rem)' // Progressive image loading
                    : handleImageStyling(),
                  transition: blur
                    ? 'none'
                    : 'filter .3s ease-out'
                }}
              />
              <button onClick={() => setUploadedImageUrl('')}>
                <Delete />
              </button>
            </ImageBox>
          )}
        </>
      )}
      {/* If the image still being dragged and not loading... */}
      {(isDragging && !isUploading) && (
        <UploadState>
          <Drag />
          <span>{t('DND.Main')}</span>
        </UploadState>
      )}
      {/* If the image still loading and not being dragged... */}
      {(isUploading && !isDragging) && (
        <UploadState>
          <Upload />
          <strong>{t('DND.Uploading')}</strong>
          <span>{t('DND.UploadingTwo')}</span>
        </UploadState>
      )}
      {/* If the upload finished and the filters tool is open... */}
      {uploadedImageUrl && (
        <Slider
          min={selectedFilter?.range.min}
          max={selectedFilter?.range.max}
          value={selectedFilter?.value}
          handleChange={handleSliderChange}
        />
      )}
    </Box>
  )
}

export default FileUploader;
