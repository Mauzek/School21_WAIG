import Tag from "./Tag";
import styles from "./TagsList.module.css"
import { testDataTags } from "./test.tsx"

export default function TagsList() {
  interface InnerObject {
    name: string;
    color: string;
  }
  const array: InnerObject[] = testDataTags;
  return (
    <>
      <p className={styles.interest__title}>Интересы</p>
      <div className={styles.interest} >
        <ul className={styles.interest__list}>
          {array.map((elem) => (
            <Tag color={elem.color} name={elem.name} />)
          )}
        </ul>
      </div>
    </>
  )
}