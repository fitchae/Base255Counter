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
		this.state = {
			integer_value: 65874,
			button_title: "Start",
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
		this.handleDecimalChange = this.handleDecimalChange.bind(this);
		this.resetThenSet = this.resetThenSet.bind(this);
	}

	handleDecimalChange(event) {
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
		var current_value = 0;
		if (this.state.integer_value !== '') {
			current_value = parseInt(this.state.integer_value,10);
		}
		this.setState({
			integer_value: current_value + 1
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
		var value = parseInt(this.state.integer_value, 10)
		var q1 = ((value/Math.pow(base, 3)) % base);
		var q2 = ((value/Math.pow(base, 2)) % base);
		var q3 = ((value/Math.pow(base, 1)) % base);
		var q4 = ((value/base, 3) % base);

		/*
		console.log("q1:" + q1)
		console.log("q2:" + q2)
		console.log("q3:" + q3)
		console.log("q4:" + q4)
		*/
		/*
		 * This is to correct for the absurd behavior
		 * of parseInt
		 */
		if (q1 < 1.0) {
			q1 = 0;
		}
		if (q2 < 1.0) {
			q2 = 0;
		}
		if (q3 < 1.0) {
			q3 = 0;
		}
		if (q4 < 1.0) {
			q4 = 0;
		}
		/*
		console.log("q1:" + q1)
		console.log("q2:" + q2)
		console.log("q3:" + q3)
		console.log("q4:" + q4)
		*/
		q1 = parseInt(q1, 10);
		q2 = parseInt(q2, 10);
		q3 = parseInt(q3, 10);
		q4 = parseInt(q4, 10);

		return(
		<div>
			<h1 id="centerTitle">Base {this.state.selected_base} Counter</h1>
			<div class="centerIt" id="number">
			<input class="form-control" id="numberValue" type="text" value={this.state.integer_value} onChange={this.handleDecimalChange} />
{/*		I'd like a newline here. */}
			Base: <Dropdown
            list={this.state.base}
            resetThenSet={this.resetThenSet}/>
{/*		I'd like a newline here. */}
			<button class="btn btn-success" onClick={this.handleStartPause}>{this.state.button_title}</button>
			</div>
			<div class="row">
			<div class="centerIt col-sm-2" id="q1">
			<p>{q1}</p>
			</div>
			<div class="centerIt col-sm-1">
			.
			</div>
			<div class="centerIt col-sm-2" id="q2">
			<p>{q2}</p>
			</div>
			<div class="centerIt col-sm-1">
			    .
			</div>
			<div class="centerIt col-sm-2" id="q3">
			<p>{q3}</p>
			</div>
			<div class="centerIt col-sm-1">
			    .
			</div>
			<div class="centerIt col-sm-2" id="q4">
			<p>{q4}</p>
			</div>

			</div>
			<div class="centerIt" id="buttons">
			</div>
		</div>
		);
	}
}
export default App
