import React, { Component } from 'react';
import Counter from '../counter';
import styles from '../counter.css';

class CounterContainerDefault extends Component {
	render() {
		return (
			<div>
				<button onClick={this.props.addCount}>
					Increment Counter
				</button>
				<button onClick={this.props.decCount}>
					Decrement Counter
				</button>
				{ this.props.evenCount && 
					<div className={styles.evenNotifier}>
						EVEN!
					</div> 
				}
				{ !this.props.evenCount && 
					<div className={styles.oddNotifier}>
						ODD!
					</div> 
				}
				<Counter count={this.props.count} />
			</div>
		);
	}
}

export default CounterContainerDefault;
