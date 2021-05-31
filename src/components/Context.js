import React, { Component } from 'react'
import fire from '../fire';

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        products: [],
        cart: [],
        total: 0,
        filterState: "",
        category: ""
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        console.log({products,cart,id,check})
        if(check){
            const data = products.filter(product =>{
                return product._id == id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The product has been added to cart.")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    };

    setFilterState = (word) => {
        const {filterState} = this.state;
        this.setState({filterState : word})
    }

    setCategory = (word) => {
        this.setState({category : word})
    }

    getProducts = () =>{
        var arr = []
    fire.database().ref('/').child("Books").on("child_added", (data) => {
        var product = data.val();
        product._id = data.key;
        product.count = 1;
      arr.push(product)
      this.setState({
        products: arr
      })
    })
    }

    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    };

    componentDidMount(){
        this.getProducts();
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }

    }
   

    render() {
        const {products, cart, total, filterState, category} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal, setFilterState, setCategory} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal, filterState, setFilterState, category, setCategory}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


