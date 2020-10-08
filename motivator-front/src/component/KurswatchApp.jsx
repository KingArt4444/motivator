import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListUsersComponent from './ListUsersComponent';
import ListWorkAmountsComponent from './ListWorkAmountsComponent';
import ListBonusesComponent from './ListBonusesComponent';
import BonusPopFormComponent from './BonusPopFormComponent';
import HealthBenefitsTableComponent from './HealthBenefitsTableComponent';
import BenefitPopFormComponent from './BenefitPopFormComponent';
import PenaltyTableComponent from './PenaltyTableComponent';
import PenaltyPopFormComponent from './PenaltyPopFormComponent';
import UserComponent from './UserComponent';
import UserDetailsComponent from './UserDetailsComponent';
import MenuComponent from './MenuComponent';
import WorkAmountComponent from './WorkAmountComponent';
import DiagramComponent from './DiagramComponent';
import AllowancePopFormComponent from './AllowancePopFormComponent'
import AllowancesTableComponent from './AllowancesTableComponent'

class KurswatchApp extends Component {
    render() {
        return (
            <Router>
                <>
                    <MenuComponent />
                        <Switch>
                            <Route path="/" exact component={ListUsersComponent} />
                            <Route path="/users" exact component={ListUsersComponent} />
                            <Route path="/users/:id" component={UserComponent} />
                            <Route path="/workamounts" exact component={ListWorkAmountsComponent} />
                            <Route path="/workamounts/:id" component={WorkAmountComponent} />
                            <Route path="/allowances" exact component={AllowancesTableComponent} />
                            <Route path="/allowances/:id" component={AllowancePopFormComponent} />
                            <Route path="/penalties" exact component={PenaltyTableComponent} />
                            <Route path="/penalties/:id" component={PenaltyPopFormComponent} />
                            <Route path="/bonuses" exact component={ListBonusesComponent} />
                            <Route path="/bonuses/:id" component={BonusPopFormComponent} />
                            <Route path="/healthbenefits" exact component={HealthBenefitsTableComponent} />
                            <Route path="/healthbenefits/:id" component={BenefitPopFormComponent} />
                            <Route path="/userdetails/:id" component={UserDetailsComponent} />
                            <Route path="/diagram" component={DiagramComponent} />
                        </Switch>
                </>
            </Router>
        )
    }
}

export default KurswatchApp