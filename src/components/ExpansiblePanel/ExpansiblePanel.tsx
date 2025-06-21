import React, { useState } from 'react';
import styles from './ExpansiblePanel.module.css';
import careerProfileIcon from '../../assets/icons/careerprofile.png';

interface ExpansiblePanelProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}


const ExpansiblePanel: React.FC<ExpansiblePanelProps> = ({
  title,
  icon = careerProfileIcon,
  children,
  defaultExpanded = true
}) => {

  //Panel State
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.expansiblePanel}>

      {/* Panel Header */}
      <div className={`${styles.headerContent}`} onClick={toggleExpanded}>
        <div className={styles.iconContainer}>
          <img src={icon} alt="" className={styles.icon} />
        </div>
            
        <div className={styles.titleText}>
          {title}
        </div>

        <div className={`${styles.caretContainer} ${isExpanded ? styles.caretUp : styles.caretDown}`}>
          <svg 
            width="8.814" 
            height="5" 
            viewBox="0 0 9 5" 
            fill="none"
            className={styles.caretIcon}
          >
            <path 
              d="M4.407 4.5L0 0H8.814L4.407 4.5Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      </div>      
      
      {/* Panel Content */}                  
      <div className={`${styles.panelContent} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>

    </div>
  );
};

export default ExpansiblePanel;
