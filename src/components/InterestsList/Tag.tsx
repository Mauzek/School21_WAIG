import { FC } from "react";
import styles from "./TagsList.module.css";

interface MyComponentProps {
  name: string;
  color: string;
}

const Tag: FC<MyComponentProps> = ({ name, color }) => {
  return (
    <li className={styles.tag__container}>
      <div className={styles.tag__color} style={{ background: color }}/>
      <p>{name}</p>
    </li>
  );
};

export default Tag;
