import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import tất cả các bài tập
import CounterComponent from './components/CounterComponents';
import LightSwitch from './components/LightSwitch';
import LoginForm from './components/LoginForm';
import LoginForm2 from './components/LoginForm2';
import SearchItem from './components/SearchItem';
import SearchAccount from './components/SearchAccount';
import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <h2 className="text-center mb-4">🎯 React useState Exercises</h2>

       <CounterComponent />
      <LightSwitch /> 
       <LoginForm /> 
      <LoginForm2 /> 
      <SearchItem /> 
      <SearchAccount /> 
       <RegisterForm /> 

      {/* 🧩 Khi muốn kiểm tra component khác, chỉ cần comment dòng hiện tại và mở dòng bạn muốn */}
    </div>
  );
}

export default App;
