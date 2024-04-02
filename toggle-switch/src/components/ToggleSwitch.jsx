import React from "react";
import styles from "./ToggleSwitch.module.css";

// export type ToggleSwitchProps = {
//   onChange: (e: React.InputHTMLAttributes<HTMLInputElement>) => {};
//   checked: boolean;
//   checkedChildren?: ReactNode;
//   unCheckedChildren?: ReactNode;
//   label: string;
//   variant?: "success" | "danger" | "primary";
//   rounded?: boolean;
//   innerRef?: any;
// };

const ToggleSwitch = ({
  onChange,
  checked,
  label,
  variant = "primary",
  checkedChildren = null,
  unCheckedChildren = null,
  rounded = false,
  // innerRef = null,
}) => {
  return (
    <div
      className={`${styles.container}`}
      // ref={innerRef}
    >
      <div className={`${styles.wrapper}`}>
        <input type="checkbox" onChange={onChange} checked={checked} />
        <div
          className={`${styles["slider-wrapper"]} ${
            rounded ? styles.rounded : ""
          } ${styles[variant]} 
`}
        ></div>
        {checkedChildren && (
          <div
            className={`${styles.children} ${checked ? styles.visible : ""} ${
              styles.checked
            }`}
          >
            {checkedChildren}
          </div>
        )}
        {unCheckedChildren && (
          <div
            className={`${styles.children} ${
              !checked ? styles.visible : ""
            }          ${styles.unchecked}`}
          >
            {unCheckedChildren}
          </div>
        )}
      </div>
      <div>{label}</div>
    </div>
  );
};

// export default React.forwardRef((props, ref) => (
//   <ToggleSwitch {...props} innerRef={ref} />
// ));

export default ToggleSwitch;
