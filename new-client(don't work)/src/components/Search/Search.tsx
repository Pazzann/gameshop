import styles from "./Search.module.scss";
export const Search = () => {
    return (
        <div className={styles.search}>
         <input
            type="text"
            placeholder="Search"
          />
        </div>
    );
}