import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Main.tsx loaded - creating React root');

const rootElement = document.getElementById("root");
console.log('Root element found:', !!rootElement);

if (rootElement) {
  console.log('Creating React root...');
  const root = createRoot(rootElement);
  console.log('React root created, rendering App...');
  
  // Add error boundary for the root render
  try {
    root.render(<App />);
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Error rendering App:', error);
    rootElement.innerHTML = '<div style="padding: 20px; color: red;">Error loading app: ' + error.message + '</div>';
  }
} else {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Root element not found!</div>';
}
