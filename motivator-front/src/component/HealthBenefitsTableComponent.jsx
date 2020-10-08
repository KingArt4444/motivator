import React, { Component } from 'react';
import HealthBenefitsDataService from '../service/HealthBenefitsDataService';
import BenefitPopFormComponent from './BenefitPopFormComponent';

class HealthBenefitsTableComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            benefits: [],
            userId: this.props.userId,
            message: null
        }
        this.refreshBenefits = this.refreshBenefits.bind(this)
        this.deleteBenefitClicked = this.deleteBenefitClicked.bind(this)
        this.updateBenefitClicked = this.updateBenefitClicked.bind(this)
        this.addBenefitClicked = this.addBenefitClicked.bind(this)
        this.chooseBenefit = this.chooseBenefit.bind(this)
    }

    componentDidMount() {
        this.refreshBenefits();
    }

    refreshBenefits() {
        HealthBenefitsDataService.retrieveAllBenefits()
            .then(
                response => {
                    console.log(response);
                    this.setState({ benefits: response.data })
                }
            )
    }

    deleteBenefitClicked(id) {
        var result = window.confirm("Вы действительно хотите удалить данную информацию?");
        HealthBenefitsDataService.deleteBenefit(id)
            .then(
                response => {
                    this.setState({ message: `Delete of info ${id} Successful` })
                    this.refreshBenefits()
                }
            )
    }

    updateBenefitClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/healthbenefits/${id}`)
    }

    addBenefitClicked() {
        this.props.history.push(`/healthbenefits/-1`)
    }

    chooseBenefit(userId) {
        return this.state.benefits.map(
            benefit => {
                if (benefit.user.id == userId) {
                    return (
                        <tr key={benefit.id}>
                            <td>{benefit.reason}</td>
                            <td>{benefit.amount}</td>
                            <td>{benefit.date}</td>
                            <td><button className="btn btn-warning" onClick={() => this.deleteBenefitClicked(benefit.id)}>Удалить</button></td>
                            <td><button className="btn btn-success" onClick={() => this.updateBenefitClicked(benefit.id)}>Редактировать</button></td>
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
                                <th>Причина выдачи</th>
                                <th>Размер</th>
                                <th>Дата</th>
                                <th>Удалить</th>
                                <th>Редактировать</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.chooseBenefit(this.state.userId)
                            }
                        </tbody>
                    </table>
                    <div className="row">
                    <BenefitPopFormComponent userId={this.state.userId} id='-1'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HealthBenefitsTableComponent