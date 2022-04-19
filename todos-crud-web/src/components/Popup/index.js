import { useEffect, useState } from "react";
import popupStyles from "../../styles/Popup.module.css";
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const CustomPopup = (props) => {
  const [show, setShow] = useState(false);

  const closeHandler = (e) => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? "visible" : "hidden",
        opacity: show ? "1" : "0",
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>

        <h2><AiOutlineExclamationCircle /></h2>
        <div className={popupStyles.content}>{props.children}</div>
      </div>

    </div>
  );
};


export default CustomPopup;