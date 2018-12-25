const React = require('react')
const ReactDom = require('react-dom')
class Timer extends React.Component {
	constructor(props) {
		super(props)
	console.log("Testing?");
		this.state = {
			integer_value: 65874,
		}

		this.intervalHandle;
		this.handleInterval = this.handleInterval.bind(this);

		this.intervalHandle = setInterval(this.handleInterval, 50);
	}

	handleInterval() {
	console.log("testing?")
		this.setState({
			integer_value: this.state.integer_value + 1
		})
	}
	render() {
		return(
		<div>
			<div class="centerIt" id="number">
			<p>{this.state.integer_value}</p>
			</div>
			<div class="row">
			<div class="centerIt col-sm-2" id="q1">
			<p>{(parseInt(this.state.integer_value/(256*256*256), 10)) % 256}</p>
			</div>
			<div class="centerIt col-sm-1">
			.
			</div>
			<div class="centerIt col-sm-2" id="q2">
			<p>{(parseInt(this.state.integer_value/(256*256), 10)) % 256}</p>
			</div>
			<div class="centerIt col-sm-1">
			    .
			</div>
			<div class="centerIt col-sm-2" id="q3">
			<p>{(parseInt(this.state.integer_value/256, 10)) % 256}</p>
			</div>
			<div class="centerIt col-sm-1">
			    .
			</div>
			<div class="centerIt col-sm-2" id="q4">
			<p>{this.state.integer_value % 256}</p>
			</div>

			</div>
		</div>
		);
	}
}
export default Timer
