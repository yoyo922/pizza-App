import React, { Component } from 'react';
import Menu from '../containers/Menu'
import Checkout from '../containers/Checkout'

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {userSelect:0}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(selection){
    this.setState({
      userSelect: selection
    })
    console.log(this.state.hasOrdered)
  }

  render() {
    const { userSelect } = this.state

    return(
      <div className="pizza-app">
        <div className="pizza-title">
          <h1 className="display-2">Pizza App</h1>
          <p className="lead">Peters Pizza Store Demo</p>
          <hr className="my-4"></hr>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <button className="selection-button btn btn-primary" onClick={() => this.handleClick(1)} type="button">Size</button>
              <button className="selection-button btn btn-primary" onClick={() => this.handleClick(2)} type="button">Toppings</button>
              <button className="selection-button btn btn-primary" onClick={() => this.handleClick(3)} type="button">Pops</button>
            </div>
            <div className="col-lg-6">
              <Menu menuItem={userSelect}/>
            </div>
            <div className="col-lg-4">
              <Checkout />
            </div>
          </div>
        </div>
      </div>

    )
  }
}
