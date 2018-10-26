import React, {Component} from 'react';

class PizzaMaker extends Component{
  constructor(props){
    super(props)
  }

  render(){
    const {size, toppings} = this.props
    return (
      <div className="pizza-container">
        {size &&
          <img src={size.picture} width={`${size.size}%`} height={`${size.size}%`} />
        }
        {toppings.map(topping => (
          <img className="pizza-toppings" src={topping.picture} width={`${size.size ? size.size : 100}%`} height={`${size.size ? size.size : 100}%`}/>
        ))}
      </div>
    )
  }
}

export default PizzaMaker
