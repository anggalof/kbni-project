import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar} from "@fortawesome/free-solid-svg-icons";
import styles from "./style.module.css";

const CustomInput = React.forwardRef(({ value, onClick, name, className, disabled, onChange }: any, ref: any) => (
  <div className={styles.container}>
    <input
      type="text"
      className={`${styles.dateinput} ${className}`}
      name={name}
      value={value}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
      placeholder="Enter Birthdate"
      readOnly
    />
    <span className={styles.calendaricon}>
      <FontAwesomeIcon icon={faCalendar} aria-hidden="true" />
    </span>
  </div>
));

export default CustomInput;
