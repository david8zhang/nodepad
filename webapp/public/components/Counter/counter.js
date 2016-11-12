import React from 'react';
import styles from './counter.css';

const Counter = ({ count }) => (
	<div className={styles.counter}>
		<h3>{count}</h3>
	</div>
);

export default Counter;
