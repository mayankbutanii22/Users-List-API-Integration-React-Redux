import React from 'react';
import UsersList from './Components/UsersList';
import styles from './Components/Header.module.css';

function App() {
  return (
    <div>
      <header className={styles.header}>
        <h1>Users List - API Integration </h1>
        <p className={styles.subtitle}>
          React + Redux Toolkit + JSON Placeholder + Module CSS (Horizons / SaaS style)
        </p>
      </header>

      <main style={{ padding: '24px' }}>
        <UsersList />
      </main>
    </div>
  );
}
export default App;
