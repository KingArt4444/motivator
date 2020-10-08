import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PenaltyDataService from '../service/PenaltyDataService';
const PopPop = require('react-poppop');


export default class PenaltyPopFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            type: '',
            reason: '',
            date: '',
            duration: '',
            user: {
                id: this.props.userId
            },
            show: false
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
        this.handleTypeDropdownChange = this.handleTypeDropdownChange.bind(this)
    }
    componentDidMount() {

        console.log(this.state.id)
        console.log(this.state.user.id)

        // eslint-disable-next-line
        if (this.state.id == -1) {
            return
        }

        PenaltyDataService.retrievePenalty(this.state.id)
            .then(response => {
                this.setState({
                    type: response.data.type,
                    reason: response.data.reason,
                    date: response.data.date,
                    duration: response.data.duration,
                    user: {
                        id: response.data.user.id
                    }
                })
                let selectTypeElement = document.getElementById("type-select");
                selectTypeElement.value = response.data.type;
            })

    }

    onSubmit(values) {
        let penalty = {
            id: this.state.id,
            type: values.type,
            reason: values.reason,
            date: values.date,
            duration: values.duration,
            user: {
                id: this.state.user.id
            }
        }


        if (values.id == -1) {
            PenaltyDataService.createPenalty(penalty)
                .then(() => {
                    this.toggleShow(false);
                    document.location.href = `/userdetails/${this.state.user.id}`;
                    // this.props.history.push(`/userdetails/${this.state.user.id}`)
                })
        } else {
            PenaltyDataService.updatePenalty(this.state.id, penalty)
                .then(() => document.location.href = `/userdetails/${this.state.user.id}`) /*this.props.history.push(`/allowances`))*/
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

    handleTypeDropdownChange(e) {
        this.setState({ type: e.target.value });
    }

    toggleShow = show => {
        this.setState({ show });
    }

    render() {
        const { show } = this.state;
        let { id, type, reason, date, duration, user } = this.state

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
                        <h3>Дисциплинарные взыскания</h3>
                        <div className="container">
                            <Formik
                                initialValues={{ id, type, reason, date, duration, user }}
                                onSubmit={this.onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={this.validate}
                                enableReinitialize={true}
                            >
                                {
                                    (props) => (
                                        <Form id="form"
                                        >
                                            <fieldset className="form-group">
                                                <label>Id</label>
                                                <Field className="form-control" type="text" name="id" disabled />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Тип дисциплинарного взыскания</label>
                                                <select
                                                    id="type-select"
                                                    className="form-control"
                                                    name="type"
                                                    onChange={this.handleTypeDropdownChange}
                                                    value={this.props.type}
                                                >
                                                    <option value='0' label="Выберите тип дисциплинарного взыскания" />
                                                    <option value='Частично' label="Частичное лишение премии" />
                                                    <option value='Полностью' label="Полное лишение премии" />
                                                </select>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Причина вынесения взыскания</label>
                                                <Field className="form-control" type="text" name="reason" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Дата</label>
                                                <Field className="form-control" type="date" name="date" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Длительность(месяцев)</label>
                                                <Field className="form-control" type="number" max="12" min="1" name="duration" />
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