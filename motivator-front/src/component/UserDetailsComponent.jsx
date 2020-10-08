import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';
import AllowancesTableComponent from './AllowancesTableComponent'
import PenaltyTableComponent from './PenaltyTableComponent'
import HealthBenefitsTableComponent from './HealthBenefitsTableComponent'
import ListBonusesComponent from './ListBonusesComponent'
import photo from '../resources/getimg.png'
import AllowancePopFormComponent from './AllowancePopFormComponent';

class UserDetailsComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            surname: '',
            age: '',
            email: '',
            salary: '',
            status: '',
            education: '',
            educationPlace: '',
            showHideAllowanceTable: false,
            showHideBonusTable: false,
            showHideHealthBenefitTable: false,
            showHidePenaltyTable: false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.showTable = this.showTable.bind(this);
    }

    componentDidMount() {

        console.log(this.state.id)

        UserDataService.retrieveUser(this.state.id)
            .then(response => this.setState({
                name: response.data.name,
                surname: response.data.surname,
                age: response.data.age,
                email: response.data.email,
                salary: response.data.salary,
                status: response.data.status,
                education: response.data.education,
                educationPlace: response.data.educationPlace
            }))

    }

    onSubmit(values) {
        let user = {
            id: this.state.id,
            name: values.name,
            surname: values.surname,
            age: values.age,
            email: values.email,
            salary: values.salary,
            status: values.status,
            education: values.education,
            educationPlace: values.educationPlace
        }


        if (values.id == -1) {
            UserDataService.createUser(user)
                .then(() => this.props.history.push('/users'))
        } else {
            UserDataService.updateUser(this.state.id, user)
                .then(() => this.props.history.push('/users'))
        }

        console.log(values);
    }

    validate(values) {
        let errors = {}
        if (!values.name) {
            errors.name = 'Введите имя'
        } else if (values.name.length < 2) {
            errors.name = 'Имя должно состоять минимум из 2-х букв'
        }
        if (!values.surname) {
            errors.surname = 'Введите фамилию'
        } else if (values.surname.length < 3) {
            errors.surname = 'Фамилия должно состоять минимум из 2-х букв'
        }
        if (!values.age) {
            errors.age = 'Введите возраст'
        }
        if (!values.email) {
            errors.email = 'Введите адрес электронной почты'
        } else if (values.email.length < 8) {
            errors.email = 'Имя должно состоять минимум из 8-ми символов'
        }

        return errors
    }

    showTable(name) {
        console.log(name);
        switch (name) {
            case "showHideAllowanceTable":
                this.setState({ showHideAllowanceTable: !this.state.showHideAllowanceTable });
                break;
            case "showHideBonusTable":
                this.setState({ showHideBonusTable: !this.state.showHideBonusTable });
                break;
            case "showHideHealthBenefitTable":
                this.setState({ showHideHealthBenefitTable: !this.state.showHideHealthBenefitTable });
                break;
            case "showHidePenaltyTable":
                this.setState({ showHidePenaltyTable: !this.state.showHidePenaltyTable });
                break;
            default:
                return null;
        }
    }

    render() {
        let { name, surname, id, age, email, salary, status, education, educationPlace, showHideAllowanceTable, showHideBonusTable, showHideHealthBenefitTable, showHidePenaltyTable } = this.state

        return (
            <div>
                <h3>Пользователь</h3>
                <header className="header">
                    <div className="container">
                        <div className="teacher-name">

                            <div className="row" >
                                <div className="col-md-9">
                                    <h2 ><strong>{this.state.name} {this.state.surname}</strong></h2>
                                </div>
                                <div className="col-md-3">
                                    {/* <div class="button" >
                                        <a href="#" class="btn btn-outline-success btn-sm">Edit Profile</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div className="row" >
                            <div className="col-md-3">
                                <a href="#"> <img className="rounded-circle" src={photo} alt="Photo" /></a>
                            </div>

                            <div className="col-md-6">
                                <p>Email: <strong>{this.state.email}</strong></p>
                                <p>Возраст: <strong>{this.state.age}</strong></p>
                                <p>Классификация: <strong>{this.state.status}</strong></p>
                                <p>Оклад: <strong>{this.state.salary}</strong></p>
                                <p>Образование: <strong>{this.state.education}</strong></p>
                                <p>Место получения образования: <strong>{this.state.educationPlace}</strong></p>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="card-body px-lg-5 pt-0">


                    <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" onClick={() => this.showTable("showHideAllowanceTable")}>Отобразить/скрыть таблицу надбавок</button>
                    <div className="d-flex justify-content-center">
                        {showHideAllowanceTable && <AllowancesTableComponent userId={this.state.id} />}
                    </div>
                    <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" onClick={() => this.showTable("showHideBonusTable")}>Отобразить/скрыть таблицу премий</button>
                    <div className="d-flex justify-content-center">
                        {showHideBonusTable && <ListBonusesComponent userId={this.state.id} />}
                    </div>
                    <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" onClick={() => this.showTable("showHideHealthBenefitTable")}>Отобразить/скрыть таблицу ЕВО</button>
                    <div className="d-flex justify-content-center">
                        {showHideHealthBenefitTable && <HealthBenefitsTableComponent userId={this.state.id} />}
                    </div>
                    <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" onClick={() => this.showTable("showHidePenaltyTable")}>Отобразить/скрыть таблицу дисциплинарных взысканий</button>
                    <div className="d-flex justify-content-center">
                        {showHidePenaltyTable && <PenaltyTableComponent userId={this.state.id} />}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserDetailsComponent