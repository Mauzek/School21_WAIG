import { FC } from "react";
import styles from "./ChooseInterests.module.css";

interface Interest {
  name: string;
  color: string;
}

interface ChooseInterestsProps {
  selectedInterests: Interest[];
  availableInterests: Interest[];
  removeInterest: (interest: Interest) => void;
  addInterest: (interest: Interest) => void;
}

export const ChooseInterests: FC<ChooseInterestsProps> = ({
  selectedInterests,
  availableInterests,
  removeInterest,
  addInterest,
}) => {
  return (
    <article className={styles.content}>
      <div className={styles.itemsList__container}>
        <label className={styles.lable_container}>Убрать интересы:</label>
        <div className={styles.container}>
          <ul className={styles.itemsList}>
            {selectedInterests.map((interest) => (
              <li
              className={`${styles.list__item} ${styles.removeInterest}`}
                key={interest.name}
                onClick={() => removeInterest(interest)}
              >
                <span
                  className={styles.colorCircle}
                  style={{ backgroundColor: interest.color }}
                ></span>
                <span className={styles.interestText}>{interest.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.itemsList__container}>
        <label className={styles.lable_container}>Добавить интересы:</label>
        <div className={styles.container}>
          <ul className={styles.itemsList}>
            {availableInterests.map((interest) => (
              <li
                className={`${styles.list__item} ${styles.addInterest}`}
                key={interest.name}
                onClick={() => addInterest(interest)}
              >
                <span
                  className={styles.colorCircle}
                  style={{ backgroundColor: interest.color }}
                ></span>
                <span className={styles.interestText}>{interest.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};
