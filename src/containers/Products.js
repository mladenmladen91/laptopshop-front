import React from "react";
import ReactPaginate from "react-paginate";
import "./Products.css";
import Product from '../components/Product';

class Products extends React.Component {
  state = {
    offset: 0,
    limit: 20,
    currentPage: 0,
    products: [],
    total: 0,
  };

  componentDidMount() {
    this.getProducts();
  }

  // function for getting products
  getProducts() {
    fetch("http://127.0.0.1:8000/api/products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        offset: this.state.offset,
        limit: this.state.limit,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        //return responseData;
        this.setState({
          total: Math.ceil(responseData.count / this.state.limit),
          products: responseData.products
        });
       })
      .catch(function (r) {
        console.log(r);
      });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.limit;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.getProducts();
      }
    );
  };

  render() {

    let products = <p style={{textAlign: 'center'}}>Učitavanje!</p>;

    if (this.state.products.length > 0) {
      products = this.state.products.map(product => {
          return <Product key={product.id} product={product} />;
      });
  }

    return (
      <div className="container">
        <div className="center_container products_holder mt_40">
        {products}
        </div>
        <div className="center_container mt_40">
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.total}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
        </div>
      </div>
    );
  }
}

export default Products;
