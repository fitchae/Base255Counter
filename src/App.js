const React = require('react')
const ReactDom = require('react-dom')

class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
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
      headerTitle: title,
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
            ? "X" //<FontAwesome name="angle-up" size="2x"/>
            : "O" //<FontAwesome name="angle-down" size="2x"/>
          }
        </div>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <li className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.base, item.id, item.key)}>{item.base} {item.selected && "-" /*<FontAwesome name="check"/>*/}</li>
          ))}
        </ul>}
      </div>
    )
  }
}
class Timer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			integer_value: 65874,
			button_title: "Start",
			running: false,
			base: [
				{
					id: 1,
					base: 10,
					selected: false,
					name: "Ten"
				},
				{
					id: 2,
					base: 16,
					selected: false,
					name: "Sixteen"
				},
				{
					id: 3,
					base: 256,
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
		this.setState({
			integer_value: parseInt(this.state.integer_value,10) + 1
		})
	}
	resetThenSet(id, key) {
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp
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
			<Dropdown
            title="Select base"
            list={this.state.base}
            resetThenSet={this.resetThenSet}/>
			</div>
		</div>
		);
	}
}
export default Timer
