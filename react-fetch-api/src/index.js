import React, { Component } from 'react';
import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import Hello from './Hello';
import './style.css';
import Pagination from "react-js-pagination";


class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null,
    activePage:1,
    total:1
  };


  fetchUsers(pageNumber) {
    fetch("https://reqres.in/api/users?page="+pageNumber)
      .then(response => response.json())
      .then(data =>{
        this.setState({ 
          users: data.data,        
          isLoading: false, 
          per_page: data.per_page,
          total: data.total,
          total_pages:data.total_pages

        })
        console.log(this.state.users);
      }
       
      )
      .catch(error => this.setState({ error, isLoading: false }));
      
  }

  componentDidMount() {
    this.fetchUsers(1);
  }

  handlePageChange(pageNumber) {
        this.setState({ activePage: pageNumber });
        this.fetchUsers(pageNumber);
        console.log(this.state);
        console.log(pageNumber)
    }

  render() {
    const { isLoading, users, error } = this.state;
    return (
      <React.Fragment>
        <h1>User List</h1>
        {error ? <p>{error.message}</p> : null}
        {!isLoading ? (
          users.map(user => {
            const { id, first_name, email } = user;
            return (
              <div key={id}>
                <p>Name: {first_name}</p>
                <p>Email Address: {email}</p>
                <hr />
              </div>
            );
          })
        ) : (
          <h3>Loading...</h3>
        )}

         <Pagination
        itemClass="page-item" // add it for bootstrap 4
        linkClass="page-link" // add it for bootstrap 4
        activePage={this.state.activePage}
        itemsCountPerPage={this.state.per_page}
        totalItemsCount={this.state.total}     
        onChange={this.handlePageChange.bind(this)}
      />
      </React.Fragment>
    );
  }
}


ReactDOM.render(<App />, document.getElementById("root"));