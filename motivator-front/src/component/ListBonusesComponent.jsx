import React, { Component } from 'react';
import BonusDataService from '../service/BonusDataService';
import BonusPopFormComponent from './BonusPopFormComponent';

class ListBonusesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bonuses: [],
            userId: this.props.userId,
            message: null
        }
        this.refreshBonuses = this.refreshBonuses.bind(this)
        this.deleteBonusClicked = this.deleteBonusClicked.bind(this)
        this.updateBonusClicked = this.updateBonusClicked.bind(this)
        this.addBonusClicked = this.addBonusClicked.bind(this)
        this.chooseBonus = this.chooseBonus.bind(this)
    }

    componentDidMount() {
        this.refreshBonuses();
    }

    refreshBonuses() {
        BonusDataService.retrieveAllBonuses()
            .then(
                response => {
                    console.log(response);
                    this.setState({ bonuses: response.data })
                }
            )
    }

    deleteBonusClicked(id) {
        var result = window.confirm("Вы действительно хотите удалить данную информацию?");
        BonusDataService.deleteBonus(id)
            .then(
                response => {
                    this.setState({ message: `Delete of info ${id} Successful` })
                    this.refreshBonuses()
                }
            )
    }

    updateBonusClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/bonuses/${id}`)
    }

    addBonusClicked() {
        this.props.history.push(`/bonuses/-1`)
    }

    chooseBonus(userId) {
        return this.state.bonuses.map(
            bonus => {
                if (bonus.user.id == userId) {
                    return (
                        <tr key={bonus.id}>
                            <td>{bonus.type}</td>
                            <td>{bonus.bonusamount}</td>
                            <td>{bonus.sum}</td>
                            <td>{bonus.year}</td>
                            <td>{bonus.month}</td>
                            <td><button className="btn btn-warning" onClick={() => this.deleteBonusClicked(bonus.id)}>Удалить</button></td>
                            <td><button className="btn btn-success" onClick={() => this.updateBonusClicked(bonus.id)}>Редактировать</button></td>
                        </tr>
                    )

                }
            })
    }

    render() {
        return (
            <div className="container">
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Тип</th>
                                <th>Объём премии(%)</th>
                                <th>Суммарно</th>
                                <th>Год</th>
                                <th>Месяц</th>
                                <th>Удалить</th>
                                <th>Редактировать</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.chooseBonus(this.state.userId)
                            }
                        </tbody>
                    </table>
                    <div className="row">
                    <BonusPopFormComponent userId={this.state.userId} id='-1'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBonusesComponent