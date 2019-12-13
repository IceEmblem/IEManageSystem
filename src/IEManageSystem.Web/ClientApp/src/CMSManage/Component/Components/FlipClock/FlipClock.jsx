import React from 'react'
import {BaseLeafComponent} from '../BaseLeafComponent'

import './FlipClock.css'

class AnimatedCard extends React.Component {
	render() {
		const { position, digit, animation } = this.props;
		return(
			<div className={`flipCard ${position} ${animation}`}>
				<span>{digit}</span>
			</div>
		);
	}
}

class StaticCard extends React.Component {
	render() {
		const { position, digit } = this.props;
		return(
			<div className={position}>
				<span>{digit}</span>
			</div>
		);
	}
}

class FlipUnitContainer extends React.Component {
	
	render() {
		const { digit, shuffle, unit } = this.props;
		
		let now = digit;
		let before = digit - 1;
		
		// to prevent a negative value
		if( unit !== 'hours') {
			before = before === -1 ? 59 : before;
		} else {
			before = before === -1 ? 23 : before;
		}
		
		// add zero
		if( now < 10 ) now = `0${now}`; 
		if( before < 10 ) before = `0${before}`;
		
		// shuffle digits
		const digit1 = shuffle ? before : now;
		const digit2 = !shuffle ? before : now;
		
		// shuffle animations
		const animation1 = shuffle ? 'fold' : 'unfold';
		const animation2 = !shuffle ? 'fold' : 'unfold';
		
		return(
			<div className={'flipUnitContainer'}>
				<StaticCard 
					position={'upperCard'} 
					digit={now} 
					/>
				<StaticCard 
					position={'lowerCard'} 
					digit={before} 
					/>
				<AnimatedCard 
					position={'first'}
					digit={digit1}
					animation={animation1}
					/>
				<AnimatedCard 
					position={'second'}
					digit={digit2}
					animation={animation2}
					/>
			</div>
		);
	}
}

class FlipClock extends BaseLeafComponent 
{
	constructor(props) {
		super(props);
		this.state = {
			hours: 0,
			hoursShuffle: true,
			minutes: 0,
			minutesShuffle: true,
			seconds: 0,
			secondsShuffle: true
		};
	}
	componentDidMount() {
		this.timerID = setInterval(
			() => this.updateTime(),
			50
		);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	updateTime() {
		// get new date
		const time = new Date;
		// set time units
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const seconds = time.getSeconds();
		// on hour chanage, update hours and shuffle state
		if( hours !== this.state.hours) {
			const hoursShuffle = !this.state.hoursShuffle;
			this.setState({
				hours,
				hoursShuffle
			});
		}
		// on minute chanage, update minutes and shuffle state
		if( minutes !== this.state.minutes) {
			const minutesShuffle = !this.state.minutesShuffle;
			this.setState({
				minutes,
				minutesShuffle
			});
		}
		// on second chanage, update seconds and shuffle state
		if( seconds !== this.state.seconds) {
			const secondsShuffle = !this.state.secondsShuffle;
			this.setState({
				seconds,
				secondsShuffle
			});
		}
	}
	render() {
		const { hours, minutes, seconds, hoursShuffle, minutesShuffle, secondsShuffle } = this.state;
		return(
			<div className={'flipClock'}>
				<FlipUnitContainer 
					unit={'hours'}
					digit={hours} 
					shuffle={hoursShuffle} 
					/>
				<FlipUnitContainer 
					unit={'minutes'}
					digit={minutes} 
					shuffle={minutesShuffle} 
					/>
				<FlipUnitContainer 
					unit={'seconds'}
					digit={seconds} 
					shuffle={secondsShuffle} 
					/>
			</div>
		);
	}
}

export default FlipClock;