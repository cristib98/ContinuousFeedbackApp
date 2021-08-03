import React from 'react'

import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'
import './RegisterForm.css'

import utilizatorS from './RegisterFormStoreS'
import utilizator from './RegisterFormStore'

import { withRouter } from 'react-router-dom'


class RegisterForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],

            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                emailError: "",// adaugat
                firstNameError: '',// adaugat
                lastNameError: '',// adaugat
                passwordError: '',// adaugat
                pickError: ''// adaugat

            },
            type: null
        }

        this.handleChange = (evt) => {
            const user = this.state.user
            user[evt.target.name] = evt.target.value
            this.setState({
                user: user
            })

        }
        this.handleLogIn = () => {
            window.location.replace("http://localhost:3000/#/login");

        }
        this.handleSubmit = () => {


            const isValid = this.validate() // adaugat
            if (isValid) { // adaugat
                if (this.state.type === "student") {
                    utilizatorS.addOne(this.state.user)
                } else {
                    utilizator.addOneP(this.state.user)

                }
                window.location.replace("http://localhost:3000/#/login");
            }



        }


        this.formTemplate = () => {
            return (
                <div className='formTemplate'>

                </div>
            )
        }
    }

    // adaugat
    validate = () => {
        let emailError = ""
        let firstNameError = ""
        let lastNameError = ""
        let passwordError = ""
        let pickError = ""

        if (!this.state.user.firstName) {
            firstNameError = "First name cannot be blank!"
        }
        if (!this.state.user.lastName) {
            lastNameError = "Last name cannot be blank!"
        }

        if (this.state.user.password.length < 6) {
            passwordError = "The password must have at least 6 characters!"
        }

        if (!this.state.user.email.includes("@")) {
            emailError = "Invalid email!"
        }

        if (this.state.type === null) {
            pickError = "Choose the account type!"
        }
        if (emailError || firstNameError || lastNameError || passwordError || pickError) {
            this.setState({ emailError, firstNameError, lastNameError, passwordError, pickError })
            return false;
        }
        return true;
    }


    render() {
        return (
            <div id="fullPage">

                <div className="formTemplate">
                    <div className="p-fluid">
                        <div id="container" className="p-shadow-10">
                            <div id="titleReg">Register</div>
                            <div className="p-field">
                                <label htmlFor="firstName">First Name</label>
                                <InputText id="firstNameReg" type="text" name="firstName" value={this.state.user.firstName} onChange={this.handleChange} />

                                <div style={{ fontSize: 16, color: 'red' }}>{this.state.firstNameError}</div>{/* adaugat */}
                            </div>
                            <div className="p-field">
                                <label htmlFor="lastname">Last Name</label>
                                <InputText id="lastnameReg" type="text" name="lastName" value={this.state.user.lastName} onChange={this.handleChange} />

                                <div style={{ fontSize: 16, color: 'red' }}>{this.state.lastNameError}</div>{/* adaugat */}
                            </div>
                            <div className="p-field">
                                <label htmlFor="email">E-mail</label>
                                <InputText id="emailReg" type="email" name="email" value={this.state.user.email} onChange={this.handleChange} />

                                <div style={{ fontSize: 16, color: 'red' }}>{this.state.emailError}</div>{/* adaugat */}
                            </div>
                            <div className="p-field">
                                <label htmlFor="password">Password</label>
                                <InputText id="passwordReg" type="password" name="password" value={this.state.user.password} onChange={this.handleChange} />
                                <div style={{ fontSize: 16, color: 'red' }}>{this.state.passwordError}</div>{/* adaugat */}
                            </div>



                            <div className="selectare" id="select">
                                <label htmlFor="select" id="selectLabel">
                                    I am a: </label>
                                <div id="radio">
                                    <div className="p-field-checkbox" id="rdStud">
                                        <RadioButton inputId="selectStudent" value="student" name="type" onChange={e => this.setState({ type: e.value })}
                                            checked={this.state.type === 'student'} />
                                        <label htmlFor="selectStudent">Student</label>
                                    </div>
                                    <div className="p-field-checkbox" id="rdTeacher">
                                        <RadioButton inputId="selectProfesor" value="profesor" name="type" onChange={e => this.setState({ type: e.value })}
                                            checked={this.state.type === 'profesor'} />
                                        <label htmlFor="selectProfesor">Professor</label>
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: 16, color: 'red' }}>{this.state.pickError}</div>{/* adaugat */}
                            <Button id="submit" type="button" label="Submit" onClick={this.handleSubmit} />
                            <Button type="button" label="Log In" onClick={this.handleLogIn} id="register" />
                        </div>
                    </div>
                </div>
            </div>)
    }

}



export default RegisterForm