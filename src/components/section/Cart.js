import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import Colors from './Colors'
import '../css/Details.css'
import '../css/Cart.css'

export class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: []
        };
      }
    static contextType = DataContext;

    componentDidMount(){
        this.context.getTotal();
        this.setState({detail: this.context.cart})
    }
    
    render() {
        const {cart,increase,reduction,removeProduct,total} = this.context;
        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}>Cart is Empty</h2>
        }else{
            return (
                <>
                            {this.state.detail.map((i)=>{
                                return(
                            <div className="details cart">
                                <img src={i.coverUrlWeb} alt=""/>
                                <div className="box">
                                    <div className="row">
                                        <h2>{i.title}</h2>
                                        <span>${i.price}</span>
                                    </div>
                                    <p>{i.category}</p>
                                    <p>{i.summary}</p>
                                    <div className="amount">
                                        <button className="count" onClick={() => reduction(i._id)}> - </button>
                                        <span>{i.count}</span>
                                        <button className="count" onClick={() => increase(i._id)} disabled={i.count == i.stock ? true : false}> + </button>
                                    </div>
                                </div>
                                <div className="delete" onClick={() => removeProduct(i._id)}>X</div>
                            </div>
                            
                            )
                                })}
                    <div className="total">
                        <Link to="/payment">Payment</Link>
                        <h3>Total: ${total}</h3>
                    </div>
                </>
                )
            }
        }
}

export default Cart
