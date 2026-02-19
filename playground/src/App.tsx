import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IndexPage, ButtonPage, PromptPage, BubbleMessagePage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/button" element={<ButtonPage />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/bubble-message" element={<BubbleMessagePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
