import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';


// Import tất cả các bài tập
import CounterComponent from './components/CounterComponents';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import SearchAccount from './components/SearchAccount';
import RegisterForm from './components/RegisterForm';
import QuestionBank from './components/QuestionBank'; 
import SignUpForm from './components/SignUpForm';


function App() {
  const [active, setActive] = useState('login')
  return (
     <>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand>Lab4</Navbar.Brand>
          <Nav activeKey={active} onSelect={(k)=>setActive(k)}>
            <Nav.Link eventKey="login">Bài 3 - Login</Nav.Link>
            <Nav.Link eventKey="signup">Bài 4 - SignUp</Nav.Link>
            <Nav.Link eventKey="qb">Bài 6 - QuestionBank+</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <div className="App" style={{ padding: '20px' }}>
      <h2 className="text-center mb-4">Lab4 Exercises</h2>

       {/* <CounterComponent />
      <LightSwitch /> 
      <LoginForm2 /> 
      <SearchItem /> 
      <SearchAccount /> 
       <RegisterForm />  */}
     {active === 'login' && <LoginForm />}
        {active === 'signup' && <SignUpForm />}
        {active === 'qb' && <QuestionBank />}

      {/* 🧩 Khi muốn kiểm tra component khác, chỉ cần comment dòng hiện tại và mở dòng bạn muốn */}
    </div>
    </>
  );
}

export default App;
