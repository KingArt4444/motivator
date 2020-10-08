import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserDataService from '../service/UserDataService';

class UserComponent extends Component {
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
            educationPlace: ''
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleStatusDropdownChange = this.handleStatusDropdownChange.bind(this)
        this.handleEducationDropdownChange = this.handleEducationDropdownChange.bind(this)
        this.handleEducationPlaceDropdownChange = this.handleEducationPlaceDropdownChange.bind(this)
    }

    componentDidMount() {

        console.log(this.state.id)

        if (this.state.id == -1) {
            return
        }

        UserDataService.retrieveUser(this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    surname: response.data.surname,
                    age: response.data.age,
                    email: response.data.email,
                    salary: response.data.salary,
                    status: response.data.status,
                    education: response.data.education,
                    educationPlace: response.data.educationPlace
                })



                let selectStatusElement = document.getElementById("status-select");
                selectStatusElement.value = response.data.status;
                let selectEducationElement = document.getElementById("education-select");
                selectEducationElement.value = response.data.education;
                let selectEducationPlaceElement = document.getElementById("education_place-select");
                selectEducationPlaceElement.value = response.data.educationPlace;
                console.log(selectEducationPlaceElement.value);
            })
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

    handleStatusDropdownChange(e) {
        let { workdays, totalWorkdays, assessment, month, year, user, id } = this.state
        this.setState({
            status: e.target.value
        });
    }

    handleEducationDropdownChange(e) {
        this.setState({ education: e.target.value });
    }

    handleEducationPlaceDropdownChange(e) {
        this.setState({ educationPlace: e.target.value });
    }


    render() {
        let { name, surname, id, age, email, salary, status, education, educationPlace } = this.state

        return (
            <div>
                <h3>User</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, name, surname, age, email, salary, status, education, educationPlace }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="name" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="surname" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="age" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="email" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Имя</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Фамилия</label>
                                        <Field className="form-control" type="text" name="surname" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Возраст</label>
                                        <Field className="form-control" type="number" name="age" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>E-mail</label>
                                        <Field className="form-control" type="email" name="email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Оклад</label>
                                        <Field className="form-control" type="number" name="salary" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Классификация работника</label>
                                        <select
                                            id="status-select"
                                            className="form-control"
                                            name="status"
                                            placeholder="Выберите класс-цию работника"
                                            onChange={this.handleStatusDropdownChange}
                                            value={this.props.status}
                                        >
                                            {/* <option value='0' label="Выберите класс-цию работника" /> */}
                                            <option value='Молодой специалист' label="Молодой специалист" />
                                            <option value='Педагогический работник' label="Педагогический работник" />
                                            <option value='Профессор/преподаватель' label="Профессор/преподаватель" />
                                            <option value='Воспитатель/педагог-психолог/педагог-организатор' label="Воспитатель/педагог-психолог/педагог-организатор" />
                                            <option value='Руководитель структурного подразделения' label="Руководитель структурного подразделения" />
                                        </select>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Образование</label>
                                        <select
                                            id="education-select"
                                            className="form-control"
                                            name="education"
                                            placeholder="Выберите образование сотрудника"
                                            onChange={this.handleEducationDropdownChange}
                                            value={this.props.education}
                                        >
                                            {/* <option value='0' label="Выберите класс-цию работника" /> */}
                                            <option value='Высшее' label="Высшее" />
                                            <option value='Неоконченное высшее' label="Неоконченное высшее" />
                                            <option value='Среднее специальное' label="Среднее специальное" />
                                            <option value='Среднее' label="Среднее" />
                                            <option value='Без образования' label="Без образования" />
                                        </select>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Учебное заведение окончил</label>
                                        <select
                                            id="education_place-select"
                                            className="form-control"
                                            name="educationPlace"
                                            placeholder="Выберите место обучения сотрудника"
                                            onChange={this.handleEducationPlaceDropdownChange}
                                            value={this.props.educationPlace}
                                        >
                                            {/* <option value='0' label="Выберите класс-цию работника" /> */}
                                            <option value='БГУИР' label="БГУИР" />
                                            <option value='БГТУ' label="БГТУ" />
                                            <option value='БГЭУ' label="БГЭУ" />
                                            <option value='БГУКИ' label="БГУКИ" />
                                            <option value='БНТУ' label="БНТУ" />
                                            <option value='МГЛУ' label="МГЛУ" />
                                            <option value='МГКТДЛП' label="МГКТДЛП" />
                                            <option value='МГМК' label="МГМК" />
                                            <option value='МГВРК' label="МГВРК" />
                                        </select>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Сохранить</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

}

export default UserComponent