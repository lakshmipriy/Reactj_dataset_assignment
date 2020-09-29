import React, { Component } from 'react';
import UserDetail from './UserDetail';

class UserList extends Component {
    constructor(props) {
        super(props);
        this.mappedTransactions = null;
        this.state = {
            users: [],
            transactions: [],
            dataFetched: false
        };
    };

    async fetchData() {
        const urls = ['/data/users.json', '/data/transactions.json'];
        const requests = urls.map(url => fetch(url));

        Promise.all(requests)
            .then(async res => {
                const [res1, res2] = res;
                const json1 = await res1.json();
                const json2 = await res2.json();
                this.setState({
                    users: json1.users,
                    transactions: json2.transactions,
                    dataFetched: true,
                }, this.mapTransactions);
            });
    };

    mapTransactions() {
        const { users, transactions } = this.state;
        console.log(users, transactions);
        
        this.mappedTransactions = {};
        users.forEach(user => {
            this.mappedTransactions[user.id] = transactions.filter(t => t.userid === user.id);
        });
        this.setState({ mappedTransactions: this.mappedTransactions });
    };

    componentDidMount() {
        this.fetchData();
    };

    render() {
        const { users, dataFetched, mappedTransactions } = this.state;

        return (
            <>
                <h2>Users - Points</h2>
                {dataFetched && mappedTransactions && users.map(user => <UserDetail key={user.id} user={user} transactions={mappedTransactions[user.id]} />)}
            </>
        );
    };
};

export default UserList;