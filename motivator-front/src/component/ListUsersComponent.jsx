import React, { Component } from 'react';
import UserDataService from '../service/UserDataService';

class ListUsersComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            filteredUsers: null,
            message: null
        }
        this.refreshUsers = this.refreshUsers.bind(this)
        this.deleteUserClicked = this.deleteUserClicked.bind(this)
        this.updateUserClicked = this.updateUserClicked.bind(this)
        this.addUserClicked = this.addUserClicked.bind(this)
        this.showUserDetailsClicked = this.showUserDetailsClicked.bind(this)
        this.filterSurname = this.filterSurname.bind(this)
    }

    componentDidMount() {
        this.refreshUsers();
    }

    refreshUsers() {
        UserDataService.retrieveAllUsers()
            .then(
                response => {
                    console.log(response);
                    this.setState({ users: response.data })
                }
            )
    }

    deleteUserClicked(id) {
        var result = window.confirm("Вы действительно хотите удалить данного сотрудника?");
        UserDataService.deleteUser(id)
            .then(
                response => {
                    this.setState({ message: `Delete of user ${id} Successful` })
                    this.refreshUsers()
                }
            )
    }

    updateUserClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/users/${id}`)
    }

    addUserClicked() {
        this.props.history.push(`/users/-1`)
    }

    showUserDetailsClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/userdetails/${id}`)
    }

    filterSurname(e) {
        const surname = e.target.value;
        if (surname) {
          this.setState({
            filteredUsers: this.state.users.filter(v => {
                let userSurname = v.surname.toLowerCase();
                return userSurname.indexOf(
                surname.toLowerCase()) !== -1
            }),
          });
        } else {
          this.setState({
            filteredUsers: null,
          });
        }
      }

    render() {
        const dataOutput = this.state.filteredUsers || this.state.users;
        return (
            <div className="container">
                <h3>Сотрудники</h3>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Id</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Возраст</th>
                                <th>E-mail</th>
                                <th>Удалить</th>
                                <th>Редактировать</th>
                                <th>Подробнее</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dataOutput.map(
                                    user =>
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.surname}</td>
                                            <td>{user.age}</td>
                                            <td>{user.email}</td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteUserClicked(user.id)}>Удалить</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.updateUserClicked(user.id)}>Редактировать</button></td>
                                            <td><button className="btn btn-success" onClick={() => this.showUserDetailsClicked(user.id)}>Данные</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addUserClicked}>Добавить</button>
                    </div>
                    <div>
                        <label>Фильтр по фамилии</label>
                        <input type="text" onChange={e => this.filterSurname(e)} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ListUsersComponent