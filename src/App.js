import React from 'react';
import './App.css'; // Import your styles

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Portfolio</h1>
        <p>This is a simple portfolio built with React!</p>
      </header>
      <main>
        <section>
          <h2>About Me</h2>
          <p>I'm Eduardo, a passionate web developer.</p>
        </section>
        <section>
          <h2>Projects</h2>
          <ul>
            <li>Project 1</li>
            <li>Project 2</li>
            <li>Project 3</li>
          </ul>
        </section>
        <section>
          <h2>Contact</h2>
          <p>Feel free to reach out via email or social media!</p>
        </section>
      </main>
    </div>
  );
}

export default App;
