import { FC, useState } from "react";
import styles from "./CustomGroupAvatar.module.css";
import CloseIcon from "../../../assets/icons/close_popup.svg";
import { ColorPicker } from "antd";
import { Color } from "antd/es/color-picker";

interface CustomGroupAvatarProps {
  colorAvatar: string;
  charsAvatar: string;
  setChars: (value: string) => void;
  setColor: (value: string) => void;
  setIsOpenPopup: () => void;
}

export const CustomGroupAvatar: FC<CustomGroupAvatarProps> = ({
  setChars,
  setColor,
  setIsOpenPopup,
  charsAvatar,
  colorAvatar,
}) => {
  const [chars, updateChars] = useState(charsAvatar);
  const [color, updateColor] = useState(`#${colorAvatar}`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.slice(0, 3);
    updateChars(input);
  };

  const handleColorChange = (value: Color, css: string) => {
    updateColor(css);
  };

  const rgbToHex = (rgb: string) => {
    const result = rgb.match(/\d+/g);
    if (!result) return "";    
    return result
      .slice(0, 3)
      .map((num) => parseInt(num).toString(16).padStart(2, "0"))
      .join("");
  };

  const handleSaveChanges = () => {
    setColor(rgbToHex(color));
    setChars(`${chars.length > 0 ? chars : 'AAA'}`);
    setIsOpenPopup();
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-labelledby="modal-title"
      aria-modal="true"
    >
      <div className={styles.popup}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Изменение аватарки группы
          </h2>
          <button
            onClick={setIsOpenPopup}
            className={styles.btn_close}
            aria-label="Закрыть"
          >
            <img src={CloseIcon} alt="Закрыть" className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.content}>
          <div
            className={styles.avatarPreview}
            style={{ backgroundColor: `${color}` }}
          >
            <span className={styles.avatarText}>{chars}</span>
          </div>
          <div className={styles.form}>
            <label htmlFor="avatar-chars" className={styles.label}>
              Символы для отображения:
            </label>
            <input
              id="avatar-chars"
              type="text"
              className={styles.input}
              value={chars}
              onChange={handleInputChange}
            />
            <div className={styles.colorPickerContainer}>
              <label className={styles.label} htmlFor="colorPicker">Цвет:</label>
              <ColorPicker
                defaultValue={color}
                onChange={handleColorChange}
                showText
                disabledAlpha
                format="hex"
                style={{ border: "1px solid transparent", }}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSaveChanges} className={styles.saveButton}>
            Сохранить
          </button>
          <button className={styles.cancelButton} onClick={setIsOpenPopup}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
