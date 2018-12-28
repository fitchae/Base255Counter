const React = require('react')
const ReactDom = require('react-dom')
class Timer extends React.Component {
	constructor(props) {
		super(props)
	console.log("Testing?");
		this.state = {
			integer_value: 65874,
			button_title: "Start",
			running: false,
		}

		this.intervalHandle;
		this.handleInterval = this.handleInterval.bind(this);
		this.handleStartPause = this.handleStartPause.bind(this);
		this.handleDecimalChange = this.handleDecimalChange.bind(this);
	}

	handleDecimalChange (event) {
		this.setState({
			integer_value: event.target.value,
			running: this.state.running,
			button_title: this.state.button_title,
		});
	}

	handleStartPause() {
		if (this.state.running === true) {
			this.setState({
				integer_value: this.state.integer_value,
				running: false,
				button_title: "Start",
			});
			clearInterval(this.intervalHandle);
		} else {
			this.setState({
				integer_value: this.state.integer_value,
				running: true,
				button_title: "Pause",
			});
			this.intervalHandle = setInterval(this.handleInterval, 1000);
		}
	}	
	handleInterval() {
		this.setState({
			integer_value: parseInt(this.state.integer_value,10) + 1
		})
	}
	render() {
		return(
		<div>
			<h1 id="centerTitle">Base X Counter</h1>
			<div class="centerIt" id="number">
			<input class="form-control" id="numberValue" type="text" value={this.state.integer_value} onChange={this.handleDecimalChange} />
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
			<div class="centerIt" id="buttons">
			<button class="btn btn-success" onClick={this.handleStartPause}>{this.state.button_title}</button>
			</div>
		</div>
		);
	}
}
export default Timer
