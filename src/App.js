import FontAwesome from 'react-fontawesome'
const React = require('react')
const ReactDom = require('react-dom')

class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.list.filter(function (item) {
				return item.selected === true;
			})[0].base
    }
    this.close = this.close.bind(this)
  }

  componentDidUpdate(){
    const { listOpen } = this.state
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      }
      else{
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  close(timeOut){
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id, stateKey){
    this.setState({
      headerTitle: this.props.list[id].base,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
        </div>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.base, item.id, item.key)}>{item.base} {item.selected && <FontAwesome name="check"/>}</li>
          ))}
        </ul>}
      </div>
    )
  }
}
class App extends React.Component {
	constructor(props) {
		super(props)

		this.oq1 = 0;
		this.oq2 = 0;
		this.oq3 = 0;
		this.oq4 = 0;

		this.q1 = 0;
		this.q2 = 0;
		this.q3 = 0;
		this.q4 = 0;

		this.state = {
			integer_value: 250,
			start_pause_button_title: "Start Counting",
			reset_button_title: "Reset",
			running: false,
			selected_base: 256,
			base: [
				{
					id: 0,
					base: 10,
					key: 'base',
					selected: false,
					name: "Ten"
				},
				{
					id: 1,
					base: 16,
					key: 'base',
					selected: false,
					name: "Sixteen"
				},
				{
					id: 2,
					base: 256,
					key: 'base',
					selected: true,
					name: "Two hundred fifty six."
				}
			],
		}
		this.intervalHandle;
		this.handleInterval = this.handleInterval.bind(this);
		this.handleStartPause = this.handleStartPause.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleDecimalChange = this.handleDecimalChange.bind(this);
		this.resetThenSet = this.resetThenSet.bind(this);
	}

	handleReset() {
		this.setState({
			integer_value: 250
		})
	}

	handleDecimalChange(event) {
		this.setState({
			integer_value: event.target.value,
			running: this.state.running,
			start_pause_button_title: this.state.start_pause_button_title,
		});
	}

	handleStartPause() {
		if (this.state.running === true) {
			this.setState({
				integer_value: this.state.integer_value,
				running: false,
				start_pause_button_title: "Start Counting",
			});
			clearInterval(this.intervalHandle);
		} else {
			this.setState({
				integer_value: this.state.integer_value,
				running: true,
				start_pause_button_title: "Pause Counting",
			});
			this.intervalHandle = setInterval(this.handleInterval, 1000);
		}
	}	
	handleInterval() {
		var current_value = 0;
		var next_value = 0;
		if (this.state.integer_value !== '') {
			current_value = parseInt(this.state.integer_value,10);
		}

		next_value = current_value + 1;
		if (next_value >= 4294967295) {
			next_value = 0;
		}

		this.setState({
			integer_value: next_value,
		})
	}

	resetThenSet(id, key) {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
    })
		this.setState({
			selected_base: parseInt(temp[id].base, 10),
			integer_value: this.state.integer_value,
		})
	}

	format(number, base) {
		if (base === 16)
			return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'][number];
		else
			return number
	}

	render() {

		var base = parseInt(this.state.selected_base, 10)
		var value = parseInt(this.state.integer_value,10);

		this.oq1 = this.q1;
		this.oq2 = this.q2;
		this.oq3 = this.q3;
		this.oq4 = this.q4;

		this.q1 = ((value/Math.pow(base, 3)) % base);
		this.q2 = ((value/Math.pow(base, 2)) % base);
		this.q3 = ((value/Math.pow(base, 1)) % base);
		this.q4 = (value % base);

		/*
		 * This is to correct for the absurd behavior
		 * of parseInt
		 */
		if (this.q1 < 1.0) {
			this.q1 = 0;
		}
		if (this.q2 < 1.0) {
			this.q2 = 0;
		}
		if (this.q3 < 1.0) {
			this.q3 = 0;
		}
		if (this.q4 < 1.0) {
			this.q4 = 0;
		}

		this.q1 = parseInt(this.q1, 10);
		this.q2 = parseInt(this.q2, 10);
		this.q3 = parseInt(this.q3, 10);
		this.q4 = parseInt(this.q4, 10);

		var q1class = "centerIt q col-sm-2 ";
		var q2class = "centerIt q col-sm-2 ";
		var q3class = "centerIt q col-sm-2 ";
		var q4class = "centerIt q col-sm-2 ";

		if (this.q1 !== this.oq1) {
			q1class += "changed";
		}
		if (this.q2 !== this.oq2) {
			q2class += "changed";
		}
		if (this.q3 !== this.oq3) {
			q3class += "changed";
		}
		if (this.q4 !== this.oq4) {
			q4class += "changed";
		}
			
		return(
		<div>
			<h1 id="centerTitle">Base {this.state.selected_base} Counter</h1>
			<div class="centerIt" id="number">
			Decimal <input class="form-control" id="numberValue" type="text" value={this.state.integer_value} onChange={this.handleDecimalChange} />
{/*		I'd like a newline here. */}
			in base <Dropdown
            list={this.state.base}
            resetThenSet={this.resetThenSet}/>
{/*		I'd like a newline here. */} is
			</div>
			<div class="row">
			<div class={q1class} id="q1">
			<p>{this.format(this.q1, this.state.selected_base)}</p>
			</div>
			<div class="centerIt col-sm-1">
			.
			</div>
			<div class={q2class} id="q2">
			<p>{this.format(this.q2, this.state.base)}</p>
			</div>
			<div class="centerIt col-sm-1">
			    .
			</div>
			<div class={q3class} id="q3">
			<p>{this.format(this.q3, this.state.base)}</p>
			</div>
			<div class="centerIt col-sm-1">
			    .
			</div>
			<div class={q4class} id="q4">
			<p>{this.format(this.q4, this.state.base)}</p>
			</div>

			</div>
			<div class="centerIt" id="buttons">
			<button class="btn btn-success" onClick={this.handleStartPause}>{this.state.start_pause_button_title}</button>
			<button class="btn" onClick={this.handleReset}>{this.state.reset_button_title}</button>
			</div>
		</div>
		);
	}
}
export default App
