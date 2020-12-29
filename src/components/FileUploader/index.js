import { useState, useContext } from 'react';
// i18n
import { useTranslation } from 'react-i18next';
// Providers
import { ToolsContext } from 'App';
// Custom Hooks
import useProgressiveImg from 'hooks/useProgressiveImg';
// Icons
import { ReactComponent as Logo } from 'assets/Logo.svg';
import { ReactComponent as Upload } from 'assets/Upload.svg';
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [src, { blur }] = useProgressiveImg(
    '',
    uploadedImageUrl
  );
  const [uploadedImageName, setUploadedImageName] = useState('image');
  // CSS Filters
  const { activeTool } = useContext(ToolsContext);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedFilter = options[activeTool];

  // Get the file's data and send to clodinary
  const onFileChange = async e => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('upload_preset', 'Edite_App');
    setIsUploading(true);

    let data = await api.post('/image/upload', formData);

    let file = data.data;

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
    <Box>
      {/* If the image was not uploaded yet... */}
      {!uploadedImageUrl ? (
        <>
          {!isUploading && (
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
      ) :
        <ImageBox>
          <img
            src={uploadedImageUrl}
            alt={uploadedImageName}
            style={{
              filter: blur
                ? 'blur(1.25rem)' // Blur effect if image still loading
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
      }
      {/* If the image still loading... */}
      {isUploading ? (
        <UploadState>
          <Upload />
          <strong>{t('DND.Uploading')}</strong>
          <span>{t('DND.UploadingTwo')}</span>
        </UploadState>
      ) : null}
      {/* If the upload finished... */}
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
