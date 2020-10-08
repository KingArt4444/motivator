import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AllowancesDataService from '../service/AllowancesDataService';
const PopPop = require('react-poppop');


export default class AllowancePopFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      type: '',
      date: '',
      rate: '',
      sum: '',
      distribution: '',
      period: '',
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
    console.log(this.state.user.id)

    // eslint-disable-next-line
    if (this.state.id == -1) {
      return
    }

    AllowancesDataService.retrieveAllowance(this.state.id)
      .then(response => this.setState({
        type: response.data.type,
        date: response.data.date,
        rate: response.data.rate,
        sum: response.data.sum,
        distribution: response.data.distribution,
        period: response.data.period,
        user: {
          id: response.data.user.id
        }
      }))

  }

  onSubmit(values) {
    let allowance = {
      id: this.state.id,
      type: values.type,
      date: values.date,
      rate: values.rate,
      sum: values.sum,
      distribution: values.distribution,
      period: values.period,
      user: {
        id: this.state.user.id
      }
    }


    if (values.id == -1) {
      AllowancesDataService.createAllowance(allowance)
        .then(() => {
          this.toggleShow(false);
          document.location.href = `/userdetails/${this.state.user.id}`;
          // this.props.history.push(`/userdetails/${this.state.user.id}`)
        })
    } else {
      AllowancesDataService.updateAllowance(this.state.id, allowance)
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

  toggleShow = show => {
    this.setState({ show });
  }

  render() {
    const { show } = this.state;
    let { id, type, date, rate, sum, distribution, period, user } = this.state

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
            <h3>Надбавка</h3>
            <div className="container">
              <Formik
                initialValues={{ id, type, date, rate, sum, distribution, period, user }}
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
                        <label>Тип надбавки</label>
                        <Field className="form-control" type="text" name="type" />
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Дата</label>
                        <Field className="form-control" type="date" name="date" />
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Процент</label>
                        <Field className="form-control" type="number" name="rate" />
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Работает по распределению</label>
                        <Field className="form-control" type="text" name="distribution" />
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Длительность</label>
                        <Field className="form-control" type="text" name="period" />
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