import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './HomeComponent/HomeComponent';
import Header from './HeaderComponent/HeaderComponent';
import Footer from './FooterComponent/FooterComponent';
import ListPropertiesComponent from './ListPropertiesComponent/ListPropertiesComponent';
import AdminDashboard from './AdminDashboardComponent/AdminDashboardComponent';
import UserDashboard from './UserDashboardComponent/UserDashboardComponent';
import AddPropertyComponent from "./AddPropertyComponent/AddPropertyComponent";
import { loginUser, logoutUser, registerUser } from "../redux/actions/authActions";
import PrivateRoute from '../routes/PrivateRoute';
import {addImageToServer, addProperty, fetchProperties} from "../redux/actions/propertyActions";
import {actions} from "react-redux-form";

const mapStateToProps = state => {
    return {
        auth: state.auth,
        properties: state.properties
    }
};

const mapDispatchToProps = (dispatch) => ({
    loginUser: (userData)=> dispatch(loginUser(userData)),
    logoutUser: ()=>{dispatch(logoutUser())},
    registerUser:(userData)=> dispatch(registerUser(userData)),
    addProperty:(newProperty)=>dispatch(addProperty(newProperty)),
    addImageToServer:(image)=>dispatch(addImageToServer(image)),
    fetchProperties: ()=>{dispatch(fetchProperties())},
    resetAddPropertyForm: ()=> {dispatch(actions.reset('feedback'))},
});


class Main extends Component {


    componentDidMount() {
        this.props.fetchProperties();
    }

    render() {

        return (
            <div>
                <Header
                    loginUser={this.props.loginUser}
                    registerUser={this.props.registerUser}
                    logoutUser={this.props.logoutUser}
                    auth={this.props.auth}
                />
                <Switch>
                    <Route exact path="/" component={()=> <HomePage properties={this.props.properties.properties}
                                                                    isLoading={this.props.properties.isLoading}
                                                                    errMess={this.props.properties.errMess}
                                                        />}
                    />
                    <Route path="/list" component={()=> <ListPropertiesComponent
                                                            properties={this.props.properties.properties}
                                                            isLoading={this.props.properties.isLoading}
                                                            errMess={this.props.properties.errMess}
                                                        />}
                    />
                    <PrivateRoute exact path="/admin/dashboard" component={AdminDashboard}/>
                    <PrivateRoute exact path="/user/dashboard" component={UserDashboard}/>
                    <PrivateRoute path="/addproperty" component={() => <AddPropertyComponent
                                                                    addProperty={this.props.addProperty}
                                                                    addImageToServer={this.props.addImageToServer}
                                                                    resetAddPropertyForm={this.props.resetAddPropertyForm}
                                                                />}
                    />
                    <Redirect to="/"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
