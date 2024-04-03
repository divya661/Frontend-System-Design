import React from "react";
import { PropTypes } from "prop-types";
import cx from "classnames";
import styles from "./Pagination.module.css";

const Pagination = ({
  totalItems,
  perPage,
  current,
  onChange,
  start = 0,
  end = perPage,
}) => {
  const getTotalPages = () => {
    return Math.ceil(totalItems / perPage);
  };

  let links = [];
  for (let i = start; i <= end; i++) {
    links.push(
      <li
        key={i}
        onClick={() => direct(i)}
        className={cx({ [styles.active]: current === i })}
      >
        {i}
      </li>
    );
  }

  const next = () => {
    const total = getTotalPages();
    if (current < total) {
      const start = current * perPage;
      const end = (current + 1) * perPage;
      onChange && onChange({ start, end, current: current + 1 });
    }
  };

  const prev = () => {
    if ( current > 1) {
      const start = (current - 2) * perPage;
      const end = (current - 1) * perPage;
      onChange && onChange({ start, end, current: current - 1 });
    }
  };

  const direct = (i) => {
    if (current !== i) {
      const start = (i - 1) * perPage;
      const end = i * perPage;
      onChange && onChange({ start, end, current: i });
    }
  };

  return (
    <ul className={styles.wrapper}>
      <li onClick={prev}>&lt;</li>
      {links}
      <li onClick={next}>&gt;</li>
    </ul>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  start: PropTypes.number,
  end: PropTypes.number,
};

Pagination.defaultProps = {
  current: 1,
  perPage: 5,
  totalItems: 36,
  start: 1,
  end: 5,
};

export default Pagination;
