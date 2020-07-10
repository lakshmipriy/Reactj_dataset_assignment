import React, { Component } from 'react';
import UserDetail from './UserDetail';

class UserList extends Component{
    constructor(props){
        super(props);
        this.mappedTransactions = null;
        this.state = {
            users: [],
            transactions: [],
            usersFetched: false,
            transactionsFetched: false
        }
    }

    async fetchUsers(){
        const response = await fetch('/data/users.json');
        const data = await response.json();
        this.setState({
            users: data.users,
            usersFetched: true
        });
    }

    async fetchTransactions(){
        const response = await fetch('/data/transactions.json');
        const data = await response.json();
        this.setState({
            transactions: data.transactions,
            transactionsFetched: true
        });
    }

    mapTransactions(){
        const { users, transactions } = this.state;
        this.mappedTransactions = {};
        users.forEach(user => {
            this.mappedTransactions[user.id] = transactions.filter(t => t.userid === user.id);
        });
    }

    componentDidMount(){
        this.fetchUsers();
        this.fetchTransactions();
    }
    
    render(){
        this.mapTransactions();
        const { users, usersFetched, transactionsFetched } = this.state;
        console.log(this.mappedTransactions);
 
        return (
            <>
                <h2>Users - Points</h2>
                {usersFetched && transactionsFetched && users.map(user => <UserDetail key={user.id} user={user} transactions={this.mappedTransactions[user.id]} />)}
            </>
        )
    }

}

export default UserList;