import React from 'react';
import styles from './Accordian.module.css';


const Accordian = ({ label, children = null, isOpen = false, id, onChange }) => {
  return (
    <section className={styles.wrapper}>
      <button
        className={`${styles.toggler} ${isOpen ? styles.active : ''}`}
        onClick={onChange}
        aria-expanded={isOpen}
        aria-controls="Accordian Header"
        id={id}>
        <h3>{label}</h3>
      </button>
      <article className={`${styles.panel} ${isOpen ? styles.active : ''}`}>
        <div
          role="region"
          aria-labelledby={id}
          className={`${styles.contentWrapper}`}>
          {children}
        </div>
      </article>
    </section>
  );
};

export default Accordian;
