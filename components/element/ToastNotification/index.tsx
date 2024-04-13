import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo} from "@fortawesome/free-solid-svg-icons";

interface ToastProps {
  textInfo: string;
  textDesc: string;
  iconBgColor: string;
  iconColor: string;
}

const ToastNotification: React.FC<ToastProps> = ({ textInfo, textDesc, iconBgColor, iconColor }) => {
  return (
    <div className="custom-toast-content">
      <div className="custom-toast-title">
        <div className={`${iconBgColor} mr-2 ${iconColor} text-[6px] px-[0.4rem] py-[0.2rem] rounded-[50%]`}>
          <FontAwesomeIcon icon={faInfo} />
        </div>
        <strong>{textInfo}</strong>
      </div>
      <div className="custom-toast-description">{textDesc}</div>
    </div>
  );
}

export default ToastNotification;
