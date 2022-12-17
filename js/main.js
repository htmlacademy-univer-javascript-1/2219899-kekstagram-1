import {renderUploadForm} from './form.js';
import {createSlider} from './image-effects.js';
import {getData} from './api.js';
import {showPictures} from './image-filter.js';
import {showGetMethodError} from './util.js';


getData(showPictures, showGetMethodError);
renderUploadForm();
createSlider();
