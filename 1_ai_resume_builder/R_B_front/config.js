const REACT_APP_API_URL = 'https://ai-resume-builder-back-bewo.onrender.com'; // Backend Render URL
//no need to write NODE_ENV as it is set by render as production

export const API_URL =
  process.env.NODE_ENV === 'production'
    ? REACT_APP_API_URL
    : 'http://localhost:3000';
