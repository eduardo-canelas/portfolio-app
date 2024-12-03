import React, { useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container');
    
    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        scrollContainer.scrollBy({
          left: e.deltaY > 0 ? window.innerWidth : -window.innerWidth,
          behavior: 'smooth',
        });
        e.preventDefault();
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel);

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="scroll-container">
      <section className="section" style={{ backgroundColor: '#ff6347' }}>
        <h1>Eduardo Canelas</h1>
        <p>Scroll to explore</p>
      </section>
      <section className="section" style={{ backgroundColor: '#4682b4' }}>
        <h2>About Me</h2>
        <p>Ya wilker Digamos</p>
      </section>
      <section className="section" style={{ backgroundColor: '#32cd32' }}>
        <h2>Projects</h2>
              <p>L Digamos.</p>
              <p>G Digamos</p>
              <p>W Digamos</p>
      </section>
      <section className="section" style={{ backgroundColor: '#ff1493' }}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </section>
    </div>
  );
}

export default App;
