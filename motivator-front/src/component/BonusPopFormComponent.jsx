import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import BonusDataService from '../service/BonusDataService';
const PopPop = require('react-poppop');

class BonusPopFormComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            type: '',
            bonusamount: '',
            sum: '',
            year: '',
            month: '',
            user: {
                id: this.props.userId
            },
            show: false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleDropdownChange = this.handleDropdownChange.bind(this)
        this.handleMonthDropdownChange = this.handleMonthDropdownChange.bind(this)
    }

    componentDidMount() {

        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        BonusDataService.retrieveBonus(this.state.id)
            .then(response => {
                this.setState({
                    type: response.data.type,
                    bonusamount: response.data.bonusamount,
                    sum: response.data.sum,
                    year: response.data.year,
                    month: response.data.month,
                    user: {
                        id: response.data.user.id
                    }
                })
                let selectMonthElement = document.getElementById("demo-simple-select");
                selectMonthElement.value = response.data.month;
                let selectTypeElement = document.getElementById("type-select");
                selectTypeElement.value = response.data.type;
                console.log(selectMonthElement.value);
            })
    }

    onSubmit(values) {
        let bonus = {
            id: this.state.id,
            type: values.type,
            bonusamount: values.bonusamount,
            sum: values.sum,
            year: values.year,
            month: values.month,
            user: {
                id: this.state.user.id
            }
        }


        if (values.id == -1) {
            BonusDataService.createBonus(bonus)
                .then(() => {
                    this.toggleShow(false);
                    document.location.href = `/userdetails/${this.state.user.id}`;
                    // this.props.history.push('/bonuses')
                })
        } else {
            BonusDataService.updateSalary(this.state.id, bonus)
                .then(() => this.props.history.push('/bonuses'))
        }

        console.log(values);
    }

    validate(values) {
        let errors = {}
        if (values.type.length < 3) {
            errors.type = 'Имя должно состоять минимум из 2-х букв'
        }
        if (!values.salary) {
            errors.salary = 'Введите фамилию'
        }
        if (!values.premiya) {
            errors.premiya = 'Фамилия должно состоять минимум из 2-х букв'
        }
        if (!values.sum) {
            errors.sum = 'Введите возраст'
        }
        if (!values.month) {
            errors.month = 'Введите месяц'
        }
        console.log(values.user)
        if (values.user.id === "") {
            errors.user = 'Выберите сотрудника перед сохранением'
        }

        return errors
    }

    handleDropdownChange(e) {
        this.setState({ type: e.target.value });
    }

    handleMonthDropdownChange(e) {
        this.setState({
            month: e.target.value
        });
    }

    toggleShow = show => {
        this.setState({ show });
    }


    render() {
        const { show } = this.state;
        let { type, bonusamount, id, sum, year, month, user } = this.state

        return (
            <div>
                <button className="btn btn-success" onClick={() => this.toggleShow(true)}>Добавить</button>
                <PopPop position="centerCenter"
                    open={show}
                    closeBtn={true}
                    closeOnEsc={true}
                    onClose={() => this.toggleShow(false)}
                    closeOnOverlay={true}>
                    <div>
                        <h3>Премия</h3>
                        <div className="container">
                            <Formik
                                initialValues={{ id, type, bonusamount, sum, year, month, user }}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            <ErrorMessage name="type" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="salary" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="premiya" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="sum" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="month" component="div"
                                        className="alert alert-warning" />
                                    <ErrorMessage name="user" component="div"
                                        className="alert alert-warning" />
                                            <fieldset className="form-group">
                                                <label>Id</label>
                                                <Field className="form-control" type="text" name="id" disabled />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Тип премирования</label>
                                                <select
                                                    id="type-select"
                                                    className="form-control"
                                                    name="type"
                                                    value={this.props.type}
                                                    onChange={this.handleDropdownChange}
                                                >
                                                    <option value='0' label="Выберите тип премии" />
                                                    <option value='Базовое' label="Базовое" />
                                                    <option value='Дополнительное' label="Дополнительное" />
                                                    <option value='Разовое' label="Разовое" />
                                                </select>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Размер премии(%)</label>
                                                <Field className="form-control" type="number" name="bonusamount" />
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
                                            <button className="btn btn-success" type="submit">Сохранить</button>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                </PopPop>
            </div>
        )
    }

}

export default BonusPopFormComponent