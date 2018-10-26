import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import PizzaMaker from '../containers/PizzaMaker';
import moment from 'moment';
import {addSizeSelection,addPopSelection,specialPopSelection} from '../actions/index'
import {pizzaSizeList, pizzaToppingList, popList} from '../constants'

class Checkout extends Component{
  constructor(props){
    super(props)
    this.state = {selected:false}
    this.getTotalPrice = this.getTotalPrice.bind(this)
    this.checkState = this.checkState.bind(this)
  }
  getTotalPrice(isDeal){

    const{sizeSelections={}, toppingSelections=[], popSelections={}} = this.props

    let totalSizePrice = 0
    let totalToppingPrice = 0
    let totalPopPrice = 0
    let quantity = 0;
    if(Object.values(popSelections).length === 1){
      Object.values(popSelections).forEach((pop) => {
       quantity = pop.quantity
      })
    }
    if((sizeSelections.id !=3 || Object.values(popSelections).length > 1 || quantity > 1 ) && document.getElementById("speicalId") &&  this.state.selected === true){
      this.setState(state =>({
        selected: false
      }))
      document.getElementById("speicalId").classList.remove("selected")
    }
    if(isDeal === true){
      return 12.5
    }else{
      if(Object.keys(sizeSelections).length > 0) {
        totalSizePrice = sizeSelections.cost
      }

      toppingSelections.forEach((topping) => {
        totalToppingPrice += topping.cost
      })

      Object.values(popSelections).forEach((pop) => {
        totalPopPrice += pop.cost * pop.quantity
      })

      return totalSizePrice + totalToppingPrice + totalPopPrice
    }
  }

  handleSpecialClick(){
    const { addPopSelectionProp,addSizeSelectionProp,specialPopSelectionProp,popSelections={} } = this.props
    addSizeSelectionProp(pizzaSizeList[2])
    this.setState(state =>({
      selected: !this.state.selected
    }))
    if(Object.keys(popSelections).length ===0 && popSelections.constructor === Object)
      addPopSelectionProp(popList[0])
    else{
      specialPopSelectionProp(popList[0])
    }
  }

  checkState(){
    const {sizeSelections,popSelections} = this.props
    if(sizeSelections.title !== "Large"){
      this.setState(state =>({
        selected: false
      }))
    }
  }
  render(){
    const { popSelections, toppingSelections, sizeSelections } = this.props
    var deal = false
    if(moment().weekday() === (moment().startOf('month').day('Saturday').add(1, 'week')).weekday()) {
      deal = true
    }

    return(
        <div>
          <h4>Checkout Cart</h4>
          <PizzaMaker size={sizeSelections} toppings={toppingSelections}/>
          <br />
          <p><strong>Size</strong></p>
          <hr />
          {sizeSelections !== undefined && sizeSelections.cost &&
            <ul>
              <li>{sizeSelections.title} (${sizeSelections.cost})</li>
            </ul>
          }
          <br />
          <p><strong>Toppings</strong></p>
          <hr />
          <ul>
          {toppingSelections.map(topping =>
            <li>{topping.title} (${topping.cost})</li>
          )}
          </ul>
          <br />
          <p><strong>Pops</strong></p>
          <hr />
          <ul>
          {Object.values(popSelections).map(pop =>
              (pop.quantity > 0 &&
                  <li>{pop.title} x{pop.quantity} (${pop.cost})</li>
              )
          )}
          </ul>
          <br />
          <h5>Total Price: <strong>${this.getTotalPrice(this.state.selected)}</strong></h5>
          <hr />
          {deal &&
            <button type="button" id="speicalId" className= {`btn specialButton  ${this.state.selected ? 'selected' : ''}`} onClick={() => this.handleSpecialClick()}>Order Combo?</button>
          }
          {!deal &&
            <h5>No speicals for Today</h5>
          }
          <button className="btn btn-primary ">Checkout</button>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sizeSelections: state.selections.sizes,
    toppingSelections: state.selections.toppings,
    popSelections: state.selections.pops
  }; //from combineReducers
}

function mapDispatchToProps(dispatch){
  return{
    addPopSelectionProp: (data) => {dispatch(addPopSelection(data))},
    addSizeSelectionProp: (data) => {dispatch(addSizeSelection(data))},
    specialPopSelectionProp: (data) => {dispatch(specialPopSelection(data))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)
