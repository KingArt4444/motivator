import React, { Component } from 'react';
import PenaltyDataService from '../service/PenaltyDataService';
import PenaltyPopFormComponent from './PenaltyPopFormComponent';

class PenaltyTableComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            penalties: [],
            userId: this.props.userId,
            message: null
        }
        this.refreshPenalties = this.refreshPenalties.bind(this)
        this.deletePenaltyClicked = this.deletePenaltyClicked.bind(this)
        this.updatePenaltyClicked = this.updatePenaltyClicked.bind(this)
        this.addPenaltyClicked = this.addPenaltyClicked.bind(this)
        this.choosePenalty = this.choosePenalty.bind(this)
    }

    componentDidMount() {
        this.refreshPenalties();
    }

    refreshPenalties() {
        PenaltyDataService.retrieveAllPenalties()
            .then(
                response => {
                    console.log(response);
                    this.setState({ penalties: response.data })
                }
            )
    }

    deletePenaltyClicked(id) {
        var result = window.confirm("Вы действительно хотите удалить данную информацию?");
        PenaltyDataService.deletePenalty(id)
            .then(
                response => {
                    this.setState({ message: `Delete of info ${id} Successful` })
                    this.refreshPenalties()
                }
            )
    }

    updatePenaltyClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/penalties/${id}`)
    }

    addPenaltyClicked() {
        this.props.history.push(`/penalties/-1`)
    }

    choosePenalty(userId) {
        return this.state.penalties.map(
            penalty => {
                if (penalty.user.id == userId) {
                    return (
                        <tr key={penalty.id}>
                            <td>{penalty.type}</td>
                            <td>{penalty.reason}</td>
                            <td>{penalty.date}</td>
                            <td>{penalty.duration}</td>
                            <td><button className="btn btn-warning" onClick={() => this.deletePenaltyClicked(penalty.id)}>Удалить</button></td>
                            <td><button className="btn btn-success" onClick={() => this.updatePenaltyClicked(penalty.id)}>Редактировать</button></td>
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
                                <th>Тип дисциплинарного взыскания</th>
                                <th>Причина вынесения взыскания</th>
                                <th>Дата</th>
                                <th>Длительность(мес.)</th>
                                <th>Удалить</th>
                                <th>Редактировать</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.choosePenalty(this.state.userId)
                            }
                        </tbody>
                    </table>
                    <div className="row">
                    <PenaltyPopFormComponent userId={this.state.userId} id='-1'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PenaltyTableComponent