import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import CodeEditor from './component/CodeEditor';

const Hello = () => {
  return <div style={{width:"100vw",height:"100vh"}}>
    
    <CodeEditor/>

  </div>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
