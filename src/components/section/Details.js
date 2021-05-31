import React, { Component } from "react";
import { DataContext } from "../Context";
import { Link } from "react-router-dom";
import Colors from "./Colors";
import "../css/Details.css";

export class Details extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      detail: [this.props.location.state.detail],
    };
  }

  static contextType = DataContext;
  state = {
    product: [],
  };

  getProduct = () => {
    if (this.props.match.params.id) {
      const res = this.context.products;
      const data = res.filter((item) => {
        return item._id === this.props.match.params.id;
      });
      this.setState({ product: data });
    }
  };

  componentDidMount() {
    this.getProduct();
  }
  addtocart = (i) => {
    const { addCart } = this.context;
    this.props.history.push("/cart", {
      cartdetails: i,
    });
    addCart(i._id);
  };

  render() {
    const { product } = this.state;
    const { addCart } = this.context;
    console.log(this.state.detail);
    return (
      <>
        {this.state.detail.map((i) => {
          return (
            <div className="details">
              <img src={i.coverUrlWeb} alt="" />
              <div className="box">
                <div className="row">
                  <h2>{i.title}</h2>
                  <span>${i.price}</span>
                </div>
                <p>{i.category}</p>
                <p>{i.summary}</p>
                <button disabled={i.stock ? false : true} className="cart" onClick={() => this.addtocart(i)}>
                {i.stock ? "ADD TO CART" : "SOLD OUT"}
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default Details;
