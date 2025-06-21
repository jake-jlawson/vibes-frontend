import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardHeader}>
          <h1>Dashboard</h1>
        </div>
        <div className={styles.dashboardContent}>
          <p>A more comprehensive view that allows the user to navigate away from the chat and view their stats, info, and career options in more detail.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 