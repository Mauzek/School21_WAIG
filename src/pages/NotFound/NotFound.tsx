import { FC } from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <div className={styles.codeArea}>
      <span className={styles.comment}>// 404 page not found.</span>
      <span className={styles.line}>
        <span className={styles.keyword}>if</span>(
        <span className={styles.operator}>!</span>
        <span className={styles.variable}>found</span>) {"{"}
      </span>
      <span className={styles.line}>
        <span className={styles.indent}>
          <span className={styles.keyword}>throw</span>
        </span>
        <span className={styles.throwContent}>
          (<span className={styles.string}>"(╯°□°)╯︵ ┻━┻"</span>);
        </span>
      </span>
      <span className={styles.line}>{"}"}</span>
      <span className={styles.comment}>
        //{" "}
        <Link to={"/Home"} className={styles.link}>
          Go home!
        </Link>
      </span>
    </div>
  );
};

export default NotFoundPage;
