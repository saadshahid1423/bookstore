import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context";
import "../css/Products.css";
import fire from "../../fire";

export class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completeDetail: [],
      categoryProducts: [],
    };
  }

  componentDidMount() {
    // var arr = []
    // fire.database().ref('/').child("Books").on("child_added", (data) => {
    //   arr.push(data.val())
    //   this.setState({
    //     completeDetail: arr
    //   })
    // })
  }

  move_data = (i) => {
    this.props.history.push("/product/:id", {
      detail: i,
    });
  };
  addtocart = (i) => {
    const { addCart } = this.context;
    this.props.history.push("/cart", {
      cartdetails: i,
    });
    addCart(i._id);
  };

  static contextType = DataContext;

  render() {
    const { products, addCart, filterState, category } = this.context;
    const { categoryProducts } = this.state;
    console.log(products);

    products.map((item) => {
      return item.category === category ? categoryProducts.push(item) : null;
    });

    return (
      <div id="product">
        {products
          .filter((product) =>
            product.category.toLowerCase().includes(category.toLowerCase())
          )
          .filter((product) =>
            product.title.toLowerCase().includes(filterState.toLowerCase())
          )
          .map((product) => (
            <div className="card" key={product._id}>
              {/* <Link to={`/product/${product._id}`}> */}
              <img
                src={product.coverUrlWeb}
                alt=""
                onClick={() => this.move_data(product)}
              />
              {/* </Link> */}
              <div className="content">
                <h3>
                  <Link to={`/product/${product._id}`}>{product.title}</Link>
                </h3>
                <span>${product.price}</span>
                <p>{product.author}</p>
                <button disabled={product.stock ? false : true} onClick={() => this.addtocart(product)}>
                {product.stock ? "ADD TO CART" : "SOLD OUT"}
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default Products;
