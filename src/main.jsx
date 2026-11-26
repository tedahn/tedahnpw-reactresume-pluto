import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import resumeData from './resumeData.json';
import { startTracking } from './lib/analytics';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

if (resumeData.analytics?.enabled) {
    startTracking({ endpoint: resumeData.resumeRequest.endpoint, page: '/' });
}
