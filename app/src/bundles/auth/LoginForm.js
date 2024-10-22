// Login Form implemented via redux-forms according to https://medium.com/technest/implement-user-auth-in-a-django-react-app-with-knox-fc56cdc9211c

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions/auth';

class LoginForm extends Component {
    // show the error label should the input not pass validation
    renderField = ({ input, label, type, meta: { touched, error } }) => {
        return (
            <div className={`field ${touched && error ? 'error' : ''}`}>
                <label>{label}</label>
                <input {...input} type={type} />
                {touched && error && (
                    <span className="ui pointing red basic label">{error}</span>
                )}
            </div>
        );
    };

    hiddenField = ({ type, meta: { error } }) => {
        return (
            <div className="field">
                <input type={type} />
                {error && <div className="ui red message">{error}</div>}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.login(formValues);
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        return (
            <div className="ui container mb-5">
                <h1 className="ui header mt-5">Login</h1>
                <div className="ui segment">
                    <form
                        onSubmit={this.props.handleSubmit(this.onSubmit)}
                        className="ui form"
                    >
                        <Field
                            name="username"
                            type="text"
                            component={this.renderField}
                            label="Username"
                        />
                        <Field
                            name="password"
                            type="password"
                            component={this.renderField}
                            label="Password"
                        />
                        <Field
                            name="non_field_errors"
                            type="hidden"
                            component={this.hiddenField}
                        />
                        <button className="ui primary button">Login</button>
                    </form>
                    <p style={{ marginTop: '1rem' }}>
                        Don't have an account?{' '}
                        <Link to="/register"><strong className="ml-1">Register Here</strong></Link>
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

LoginForm = connect(mapStateToProps, { login })(LoginForm);

export default reduxForm({
    form: 'loginForm',
})(LoginForm);
