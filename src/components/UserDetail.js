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
            points += ((amount - 100) * 2) + 50;
            return points;
        }
        if (amount > 50) {
            points += (amount - 50)
        }
        return points;
    }

    getPointsData = () => {
        const { transactions } = this.props;
        let months = [];
        let totalPoints = 0;
        const monthsData = transactions
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((t) => {
                const amount = Math.round(parseFloat(t.amount.slice(1)))
                const numAmount = parseFloat(t.amount.slice(1));
                const points = this.calculatePoints(amount);
                const tMonth = new Date(t.created_at).toLocaleString('en-us', { month: 'short' });
                if (!months.includes(tMonth)) {
                    months.push(tMonth)
                }
                t.points = points;
                t.month = tMonth;
                t.numAmount = numAmount;
                return t
            });
        totalPoints = monthsData.reduce((a, b) => a + b.points, 0)
        this.setState({
            monthsData,
            totalPoints,
            months
        })
    }

    componentDidMount() {
        this.getPointsData();
    };

    getAmount(m, data) {
        const total = data.filter((d) => d.month === m).reduce((t, a) => t + a.numAmount, 0);
        return '$' + total.toFixed(2);
    }

    getPoints(m, data) {
        console.log("final calculations test", data, m)
        const total = data.filter((d) => d.month === m).reduce((t, a) => t + a.points, 0);
        return total
    }

    render() {
        const { user } = this.props;
        const { monthsData, totalPoints, months } = this.state;
        console.log(monthsData);

        return (
            <div className='user-card'>
                <h4>Username : {user.name}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>Amount In A Month</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            monthsData && months && months.map(m =>
                                <tr key={m}>
                                    <td>{m}</td>
                                    <td>{this.getAmount(m, monthsData)}</td>
                                    <td>{this.getPoints(m, monthsData)}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {monthsData && <p> Total : {totalPoints} </p>}
            </div>
        )
    }

}

export default UserDetail;