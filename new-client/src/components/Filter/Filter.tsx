import { useState } from 'react';
import classNames from 'classnames';
import styles from './Filter.module.scss';
export const Filter = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed((x) => !x);
    }
    return <div className={classNames(styles.filters, {
        [styles.collapsed]: collapsed,
    })}>
        <button onClick={toggleCollapsed}>
            <div className={styles.burger}></div>
        </button>
        <div className={styles.filter__content}>
            some filters go here
        </div>
    </div>
}