import React, { Component } from 'react';
import UserDataService from '../service/UserDataService';
import WorkAmountDataService from '../service/WorkAmountDataService';

class ListWorkAmountsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            workAmounts: [],
            message: null
        }
        this.refreshAmounts = this.refreshAmounts.bind(this)
        this.deleteAmountClicked = this.deleteAmountClicked.bind(this)
        this.updateAmountClicked = this.updateAmountClicked.bind(this)
        this.addAmountClicked = this.addAmountClicked.bind(this)
    }

    componentDidMount() {
        this.refreshAmounts();
    }

    refreshAmounts() {
        WorkAmountDataService.retrieveAllAmounts()
            .then(
                response => {
                    console.log(response);
                    this.setState({ workAmounts: response.data })
                }
            )
    }

    deleteAmountClicked(id) {
        var result = window.confirm("Вы действительно хотите удалить данную информацию?");
        WorkAmountDataService.deleteAmount(id)
            .then(
                response => {
                    this.setState({ message: `Delete of info ${id} Successful` })
                    this.refreshAmounts()
                }
            )
    }

    updateAmountClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/workamounts/${id}`)
    }

    addAmountClicked() {
        this.props.history.push(`/workamounts/-1`)
    }

    getUserName(id) {
        UserDataService.retrieveUser(id)
            .then(response => {
                return response.data.name + ' ' + response.data.surname;
            }
            )
    }

    render() {
        return (
            <div className="container">
                <h3>Информация о продуктивности сотрудника</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Сотрудник</th>
                                <th>Дней отработано(в мес.)</th>
                                <th>Всего рабочих дней(в мес.)</th>
                                <th>Оценка(1-5)</th>
                                <th>Месяц</th>
                                <th>Год</th>
                                <th>Удалить</th>
                                <th>Редактировать</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.workAmounts.map(
                                    workAmount =>
                                        <tr key={workAmount.id}>
                                            <td>{workAmount.user.name} {workAmount.user.surname}</td>
                                            <td>{workAmount.workdays}</td>
                                            <td>{workAmount.totalWorkdays}</td>
                                            <td>{workAmount.assessment}</td>
                                            <td>{workAmount.month}</td>
                                            <td>{workAmount.year}</td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteAmountClicked(workAmount.id)}>Удалить</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.updateAmountClicked(workAmount.id)}>Редактировать</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addAmountClicked}>Добавить</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListWorkAmountsComponent