import { FC } from 'react';
import styles from './DataNotFound.module.css';
import DataNotFoundIcon from '../../assets/icons/data_not_found.svg';

interface DataNotFoundProps {
  size?: 'small' | 'medium' | 'large'; 
}

export const DataNotFound: FC<DataNotFoundProps> = ({ size = 'medium' }) => {
  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <img 
        src={DataNotFoundIcon} 
        alt="No data available" 
        className={styles.icon} 
      />
      <p className={styles.message}>Похоже что тут пусто</p>
    </div>
  );
};

export default DataNotFound;
