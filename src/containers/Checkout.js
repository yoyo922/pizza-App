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
    this.state = {deal:false}
    this.getTotalPrice = this.getTotalPrice.bind(this)
  }
  getTotalPrice(isDeal){

    const{sizeSelections={}, toppingSelections=[], popSelections={}} = this.props

    let totalSizePrice = 0
    let totalToppingPrice = 0
    let totalPopPrice = 0

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
    console.log(pizzaSizeList[2])
    addSizeSelectionProp(pizzaSizeList[2])
    this.setState(state =>({
      deal: !state.deal
    }))
    console.log(this.state.deal)
    if(Object.keys(popSelections).length ===0 && popSelections.constructor === Object)
      addPopSelectionProp(popList[0])
    else{
      specialPopSelectionProp(popList[0])
    }
  }

  render(){
    const { popSelections, toppingSelections, sizeSelections } = this.props

    var deal = false
    // Checks if today is the same as the first saturday of the month + 1 week (2nd saturday of the week)
    if(moment().isSame(moment().startOf('month').day('saturday').add(1, 'week')) === false) {
      deal = false
    }

    return(
        <div>
          {deal &&
            <button type="button" class="btn btn-primary btn-sm" onClick={() => this.handleSpecialClick()}>Order Special?</button>
          }
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
          <h5>Total Price: <strong>${this.getTotalPrice(this.state.deal)}</strong></h5>
          <hr />
          <button className="btn btn-primary">Checkout</button>
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
