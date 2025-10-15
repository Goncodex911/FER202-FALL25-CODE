import 'bootstrap/dist/css/bootstrap.min.css'; 
import FooterPage from './pages/FooterPage'; 
import HomePage from './pages/HomePage'; 
import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar/NavBar';

function App() { 
  return (
    <div> 
     <NavBar /> {/* Thêm NavBar ở trên cùng */}
      <main>
          <HomePage /> 
      </main>
      <Container>
          <FooterPage />
      </Container>
    </div>
  );
}

export default App; 