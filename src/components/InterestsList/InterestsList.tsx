import { FC } from "react";
import Tag from "./Tag.tsx";
import styles from "./TagsList.module.css";
import { Interests } from "../../types.ts";

interface InterestsListProps {
  interests: Interests[];
}

export const InterestsList: FC<InterestsListProps> = ({ interests }) => {
  return (
    <>
      <p className={styles.interest__title}>Интересы</p>
      <div className={styles.interest}>
        <ul className={styles.interest__list}>
          {interests.map((elem) => (
            <Tag key={elem.name} color={`#${elem.color}`} name={elem.name} />
          ))}
        </ul>
      </div>
    </>
  );
};
