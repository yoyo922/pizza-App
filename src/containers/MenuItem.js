import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addSizeSelection, addToppingSelection, removeToppingSelection, addPopSelection, minusPopSelection} from '../actions/index'


class MenuItem extends Component{
  constructor(props){
    super(props)
    this.state = {toppings:""}
  }

  handleClickAddPop(data){
    const { addPopSelectionProp } = this.props
    addPopSelectionProp(data)
  }

  handleClickMinusPop(data){
    const { minusPopSelectionProp } = this.props
    minusPopSelectionProp(data)
  }
  handleClick(data){
    const { addSizeSelectionProp, addToppingSelectionProp, removeToppingSelectionProp, currentMenu, selectedToppings } = this.props
    switch (currentMenu) {
      case 1:
          console.log(data)
          addSizeSelectionProp(data)
          break
      case 2:
          if (!(selectedToppings.indexOf(data) === -1))
            removeToppingSelectionProp(data)
          else
            addToppingSelectionProp(data)
        break
    }
  }

  render(){
    const {data, selected, currentMenu, selectedPops} = this.props
    return(
      <div className={`card ${selected ? 'selected' : ''}`} onClick={() => this.handleClick(data)}>
        <div className="card-body">
          <img className="card-img-top" src={data.picture}  alt="Card image cap" />
          <h5 className="card-title"> {data.title}</h5>
          <p className="card-text">Price: ${data.cost}</p>
          {currentMenu === 3 &&
            <React.Fragment>
              <p className="card-text">Quantity: {selectedPops[data.id] !== undefined ? selectedPops[data.id].quantity : 0}</p>
              <div className="card-buttons">
                <button className="btn minus" onClick={() => this.handleClickMinusPop(data)}>
                  -
                </button>
                <button className="btn btn-primary plus" onClick={() => this.handleClickAddPop(data)}>
                  +
                </button>
              </div>
            </React.Fragment>
          }
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    selectedToppings: state.selections.toppings,
    selectedPops: state.selections.pops
  }; //from combineReducers
}
function mapDispatchToProps(dispatch){
  return {
    addSizeSelectionProp: (data) => {dispatch(addSizeSelection(data))},
    addToppingSelectionProp: (data) => {dispatch(addToppingSelection(data))},
    removeToppingSelectionProp: (data) => {dispatch(removeToppingSelection(data))},
    addPopSelectionProp: (data) => {dispatch(addPopSelection(data))},
    minusPopSelectionProp: (data) => {dispatch(minusPopSelection(data))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuItem)
