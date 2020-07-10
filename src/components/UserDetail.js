import React, { Component } from 'react';
import './user.css'

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthsData: null,
            totalPoints: 0
        }
    }

    calculatePoints(amount) {
        let points = 0;
        if (amount > 100) {
            points += (amount - 100) * 2;
            amount = amount - 100;
        }
        if (amount > 50) {
            points += (amount - 50)
        }
        return points;
    }

    getPointsData = () => {
        const { transactions } = this.props;
        let monthsData = {};
        let totalPoints = 0;
        console.log(transactions);
        transactions.forEach(t => {
            let { amount, created_at } = t;
            let tMonth = new Date(created_at).toLocaleString('en-us', { month: 'short' });

            amount = Math.round(parseFloat(amount.slice(1)))

            const points = this.calculatePoints(amount);

            if (monthsData[tMonth]) {
                monthsData[tMonth]['amount'] += amount;
                monthsData[tMonth]['points'] += points;
            } else {
                monthsData[tMonth] = {
                    amount: amount,
                    points: points
                }
            }
            totalPoints += points;
        });

        console.log(monthsData, totalPoints);

        this.setState({
            monthsData,
            totalPoints
        })
    }

    componentDidMount() {
        this.getPointsData();
    }

    componentWillReceiveProps() {
        this.getPointsData();
    }

    render() {
        const { user, transactions } = this.props;
        const { monthsData, totalPoints } = this.state;
        // console.log(monthsData);
        return (
            <div className='user-card'>
                <h4>Username : {user.name}</h4>
                <table>
                    <thead>
                        <th>Month</th>
                        <th>Amount In A Month</th>
                        <th>Points</th>
                    </thead>
                    <tbody>
                        {
                            monthsData && Object.keys(monthsData).map(m =>
                                <tr key={m}>
                                    <td>{m}</td>
                                    <td>${monthsData[m]['amount']}</td>
                                    <td>{monthsData[m]['points']}</td>
                                </tr>
                            )
                        }

                        {monthsData && <p> Total : {totalPoints} </p>}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default UserDetail;