import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {pizzaSizeList, pizzaToppingList, popList} from '../constants'
import MenuItem from './MenuItem'

class Menu extends Component{
  constructor(props){
    super(props)
    this.switchMenu = this.switchMenu.bind(this)
  }

  switchMenu(){
    const {menuItem, selectedToppings, selectedSizes} = this.props
    // selectedList is all toppings in state (AKA TOPPINGS THAT ARE SELECTED)
    const selectedList = selectedToppings.map(topping => topping.id)
    switch(menuItem){
      case 1:
        return(
          pizzaSizeList.map((pizzaSize, index)=>(
            <MenuItem key={index} data={pizzaSize} currentMenu={menuItem} selected={selectedSizes.id === pizzaSize.id} />
          ))
        )
      case 2:
        return(
          pizzaToppingList.map((pizzaTopping, index)=>{
            return (
              <MenuItem
                key={index}
                data={pizzaTopping}
                currentMenu={menuItem}
                selected={selectedList.includes(pizzaTopping.id)}/>
            )
          })
        )
      case 3:
        return(
          popList.map((pop, index)=>(
            <MenuItem key={index} data={pop} currentMenu={menuItem}/>
          ))
        )
      default:
        return(
          <div>Select a Pizza</div>
        )
    }
  }

  render(){
    return (
      <div className="menu">
        {this.switchMenu()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedSizes: state.selections.sizes,
    selectedToppings: state.selections.toppings
  }; //from combineReducers
}

export default connect(mapStateToProps)(Menu)
