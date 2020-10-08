import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
class MenuComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/users">Пользователи</Link></li>
                        <li><Link className="nav-link" to="/workamounts">Производительность труда</Link></li>
                        <li><Link className="nav-link" to="/diagram">Графическая инф-я</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}
export default withRouter(MenuComponent)