import React, { Component } from 'react';
import AllowancesDataService from '../service/AllowancesDataService';
import AllowancePopFormComponent from './AllowancePopFormComponent';

class AllowancesTableComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            allowances: [],
            userId: this.props.userId,
            message: null
        }
        this.refreshAllowances = this.refreshAllowances.bind(this)
        this.deleteAllowanceClicked = this.deleteAllowanceClicked.bind(this)
        this.updateAllowanceClicked = this.updateAllowanceClicked.bind(this)
        this.addAllowanceClicked = this.addAllowanceClicked.bind(this)
        this.chooseAllowance = this.chooseAllowance.bind(this)
    }

    componentDidMount() {
        this.refreshAllowances();
        console.log(this.state.userId);
    }

    refreshAllowances() {
        AllowancesDataService.retrieveAllAllowances()
            .then(
                response => {
                    console.log(response);
                    this.setState({ allowances: response.data })
                }
            )
    }

    deleteAllowanceClicked(id) {
        var result = window.confirm("Вы действительно хотите удалить данную информацию?");
        AllowancesDataService.deleteAllowance(id)
            .then(
                response => {
                    this.setState({ message: `Delete of info ${id} Successful` })
                    this.refreshAllowances()
                }
            )
    }

    chooseAllowance(userId) {
        return this.state.allowances.map(
            allowance => {
                if (allowance.user.id == userId) {
                    return (
                        <tr key={allowance.id}>
                            <td>{allowance.type}</td>
                            <td>{allowance.date}</td>
                            <td>{allowance.rate}</td>
                            <td>{allowance.sum}</td>
                            <td>{allowance.period}</td>
                            <td><button className="btn btn-warning" onClick={() => this.deleteAllowanceClicked(allowance.id)}>Удалить</button></td>
                            <td><button className="btn btn-success" onClick={() => <AllowancePopFormComponent userId={this.state.userId} id={allowance.id}/>}>Редактировать</button></td>
                        </tr>
                    )

                }
            })
    }

    updateAllowanceClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/allowances/${id}`)
    }

    addAllowanceClicked() {
        this.props.history.push(`/allowances/-1`)
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Тип</th>
                            <th>Дата</th>
                            <th>Процент</th>
                            <th>Суммарно (с окладом)</th>
                            <th>Длительность</th>
                            <th>Удалить</th>
                            <th>Редактировать</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          this.chooseAllowance(this.state.userId)
                        }
                    </tbody>
                </table>
                <div className="row">
                    <AllowancePopFormComponent userId={this.state.userId} id='-1'/>
                </div>
            </div>
        )
    }
}

export default AllowancesTableComponent