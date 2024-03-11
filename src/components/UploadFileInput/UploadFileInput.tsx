import React, { useRef } from "react";
import { useTabContext } from "../../hooks/useTab";
import { convertToMovement } from "../../utils";
import { ImportIcon } from "../SvgIcon/SvgIcon";
import styles from "./UploadFileInput.module.css";

export type UploadFileInputProps = {
  tab: string;
};

const UploadFileInput: React.FC<UploadFileInputProps> = ({ tab }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateData } = useTabContext();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.uploadfileinput} title="Importar datos">
      <div onClick={handleClick}>
        <ImportIcon />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.length) {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
              const text = event.target?.result as string;
              updateData(tab.toLowerCase(), convertToMovement(text));
            };
            fileReader.readAsText(e.target.files[0]);
          }
        }}
        accept=".json"
      />
    </div>
  );
};

export default UploadFileInput;
