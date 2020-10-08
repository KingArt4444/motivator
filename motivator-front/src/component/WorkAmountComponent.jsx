import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import WorkAmountDataService from '../service/WorkAmountDataService';
import UserDataService from '../service/UserDataService';
import Modal from 'react-awesome-modal';


class WorkAmountComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            workdays: '',
            totalWorkdays: '',
            assessment: '',
            month: '',
            year: '',
            user: {
                id: ''
            },
            users: []
        }

        this.onSubmit = this.onSubmit.bind(this)
        // this.onFormChange = this.onFormChange.bind(this)
        this.validate = this.validate.bind(this)
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.handleMonthDropdownChange = this.handleMonthDropdownChange.bind(this)
    }

    componentDidMount() {

        console.log(this.state.id)

        this.getUsers();

        if (this.state.id == -1) {
            return
        }

        WorkAmountDataService.retrieveAmount(this.state.id)
            .then(response => {
                this.setState({
                    workdays: response.data.workdays,
                    totalWorkdays: response.data.totalWorkdays,
                    assessment: response.data.assessment,
                    month: response.data.month,
                    year: response.data.year,
                    user: {
                        id: response.data.user.id
                    }
                })
                let selectMonthElement = document.getElementById("demo-simple-select");
                selectMonthElement.value = response.data.month;
                let selectUserElement = document.getElementById("user-select");
                selectUserElement.value = response.data.user.id;
                console.log(selectMonthElement.value);
            })

    }

    onSubmit(values) {
        // let setUser = this.getUser(values.user);
        let workAmount = {
            id: this.state.id,
            workdays: values.workdays,
            totalWorkdays: values.totalWorkdays,
            assessment: values.assessment,
            month: values.month,
            year: values.year,
            user: values.user
        }
        console.log(values);

        if (values.id == -1) {
            console.log(workAmount);
            WorkAmountDataService.createAmount(workAmount)
                .then(() => this.props.history.push('/workamounts'))
        } else {
            console.log(workAmount);
            console.log(this.props.history);
            WorkAmountDataService.updateAmount(this.state.id, workAmount)
                .then(() => this.props.history.push('/workamounts'))
        }

        console.log(values);
    }

    validate(values) {
        let errors = {}
        if (!values.workdays) {
            errors.workdays = 'Введите имя'
        }
        if (!values.totalWorkdays) {
            errors.totalWorkdays = 'Введите фамилию'
        }
        if (!values.assessment) {
            errors.assessment = 'Введите возраст'
        }
        if (values.month === "") {
            errors.month = 'Выберите месяц'
        }
        if (values.user.id === "") {
            errors.user = 'Выберите сотрудника перед сохранением'
        }

        return errors
    }

    getUsers() {
        UserDataService.retrieveAllUsers()
            .then(
                response => {
                    console.log(response.data);
                    this.setState({ users: response.data })
                })
    }

    getUser(id) {
        UserDataService.retrieveUser(id)
            .then(response => {
                return response.data;
            })
    }

    handleDropdownChange(e) {
        let { workdays, totalWorkdays, assessment, month, year, user, id } = this.state
        this.setState({
            user: e.target.value
        });
    }

    handleMonthDropdownChange(e) {
        this.setState({ month: e.target.value });
    }


    render() {
        let { workdays, totalWorkdays, assessment, month, year, user, id } = this.state

        return (
            <div>
                <h3>Выработка</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, workdays, totalWorkdays, assessment, month, year, user }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form id="form"
                                // onChange={this.onFormChange}
                                >
                                    <ErrorMessage name="workdays" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="totalWorkdays" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="assessment" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="month" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="year" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="user" component="div"
                                        className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Дней отработано(в мес.)</label>
                                        <Field className="form-control" type="number" name="workdays" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Всего рабочих дней(в мес.)</label>
                                        <Field className="form-control" type="number" name="totalWorkdays" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Оценка(1-5)</label>
                                        <Field className="form-control" min="1" max="5" type="number" name="assessment" />
                                    </fieldset>
                                    <fieldset>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label id="demo-simple-select-label" htmlFor="demo-simple-select">Месяц</label>
                                                <select
                                                    id="demo-simple-select"
                                                    className="form-control"
                                                    name="month"
                                                    value={this.props.month}
                                                    onChange={this.handleMonthDropdownChange}
                                                >
                                                    <option value='0' label="Выберите месяц" />
                                                    <option value='Январь' label="Январь" />
                                                    <option value='Февраль' label="Февраль" />
                                                    <option value='Март' label="Март" />
                                                    <option value='Апрель' label="Апрель" />
                                                    <option value='Май' label="Май" />
                                                    <option value='Июнь' label="Июнь" />
                                                    <option value='Июль' label="Июль" />
                                                    <option value='Август' label="Август" />
                                                    <option value='Сентябрь' label="Сентябрь" />
                                                    <option value='Октябрь' label="Октябрь" />
                                                    <option value='Ноябрь' label="Ноябрь" />
                                                    <option value='Декабрь' label="Декабрь" />
                                                </select>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="year-input">Год</label>
                                                <Field className="form-control" id="year-input" type="number" name="year" />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Сотрудник</label>
                                        <select
                                            id="user-select"
                                            className="form-control"
                                            name="user"
                                            value={this.props.user}
                                            onChange={this.handleDropdownChange}
                                        >
                                            <option value='0' label="Выберите сотрудника" />
                                            {
                                                this.state.users.map(user => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.name} {user.surname}
                                                    </option>
                                                ))
                                            }
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

export default WorkAmountComponent