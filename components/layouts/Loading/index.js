import styles from './style.module.scss';

export default function Loading() {
    return(
        <div className={`${styles.loading}`}>
            <p>Loading...</p>
        </div>
    )
}
