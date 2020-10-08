import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import HealthBenefitsDataService from '../service/HealthBenefitsDataService';
const PopPop = require('react-poppop');

class BenefitPopFormComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.id,
            reason: '',
            amount: '',
            date: '',
            user: {
                id: this.props.userId
            },
            show: false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {

        console.log(this.state.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        HealthBenefitsDataService.retrieveBenefit(this.state.id)
            .then(response => {
                this.setState({
                    reason: response.data.reason,
                    amount: response.data.amount,
                    date: response.data.date,
                    user: {
                        id: response.data.user.id
                    }
                })
            })
    }

    onSubmit(values) {
        let benefit = {
            id: this.state.id,
            reason: values.reason,
            amount: values.amount,
            date: values.date,
            user: {
                id: this.state.user.id
            }
        }


        if (values.id == -1) {
            HealthBenefitsDataService.createBenefit(benefit)
                .then(() => {
                    this.toggleShow(false);
                    document.location.href = `/userdetails/${this.state.user.id}`;
                    // this.props.history.push('/bonuses')
                })
        } else {
            HealthBenefitsDataService.updateBenefit(this.state.id, benefit)
                .then(() => this.props.history.push('/healthbenefits'))
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

    toggleShow = show => {
        this.setState({ show });
    }


    render() {
        const { show } = this.state;
        let { id, reason, amount, date, user } = this.state

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
                                initialValues={{ id, reason, amount, date, user }}
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
                                                <label>Причина выплаты ЕВО</label>
                                                <Field className="form-control" type="text" name="reason" />
                                            </fieldset>
                                            <fieldset>
                                                <label>Дата</label>
                                                <Field className="form-control" type="date" name="date" />
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

export default BenefitPopFormComponent