import React from 'react'
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import "./LogIn.css";
import utilizator from './RegisterFormStore'
import utilizatorS from './RegisterFormStoreS'

var myStorage = window.localStorage

//adaugat
function snakbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

//adaugat
function snakbar2() {
    var x = document.getElementById("snackbar2");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.formTemplate = () => {
            return (
                <div className='formTemplate'>

                </div>
            )
        }
        this.state = {
            usersS: [],
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            },
            usersp: [],
            type: null

        }
        this.handleChange = (evt) => {
            const user = this.state.user
            user[evt.target.name] = evt.target.value
            this.setState({
                user: user
            })

        }

        this.handleRegister = () => {
            window.location.replace("http://localhost:3000/#/register");
        }

        this.handleSubmit = () => {

            //adaugat   
            var i = 0
            //adaugat
            if (this.state.type === null) {
                snakbar2()
            }

            if (this.state.type === "student") {
               
                this.state.usersS.forEach(user => {
                    if (user.email === this.state.user.email && user.password === this.state.user.password) {
                        
                        i = 1 //adaugat
                        localStorage.setItem('myStudent', user.id);
                        window.location.replace("http://localhost:3000/#/Home");
                        window.location.reload()
                        //adaugat
                    }

                }

                )

                if (i === 0) snakbar() //adaugat

            }
            if (this.state.type === "professor") {
                this.state.usersp.forEach(user => {
                    if (user.email === this.state.user.email && user.password === this.state.user.password) {
                       
                        localStorage.setItem('myProfessorFirstName', user.firstName);
                        i = 1 //adaugat
                        localStorage.setItem('myProfessorId', user.id);
                        window.location.replace("http://localhost:3000/#/newactivity");
                        window.location.reload()
                        //adaugat

                    }
                })


                if (i === 0) snakbar() //adaugat
            }


        }


    }




    componentDidMount() {
        utilizatorS.getAllS()
        utilizatorS.emitter.addListener('GET_ALL_SUCCESS', () => {
            this.setState({
                usersS: utilizatorS.data
            })
        })

        utilizator.getAllP()
        utilizator.emitter.addListener('GET_ALL_SUCCESS', () => {
            this.setState({
                usersp: utilizator.data
            })
        })
    }


    render() {
        return (
            <div id="fullPage">      
                <div id="container" className="p-shadow-10">
                    <div id="titleLogIn">
                        Log in as:
            </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="rgba(172,225,255,1)" fill-opacity="1" d="M0,160L80,160C160,160,320,160,480,133.3C640,107,800,53,960,53.3C1120,53,1280,107,1360,133.3L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
                    <div id="radio">
                        <div className="p-field-radiobutton" id="rdStud">
                            <RadioButton value="student" name="user" onChange={e => this.setState({ type: e.value })}
                                checked={this.state.type === 'student'}
                            />
                            <label htmlFor="student">Student</label>
                        </div>
                        <div className="p-field-radiobutton" id="rdTeacher" >
                            <RadioButton value="professor" name="user"
                                onChange={e => this.setState({ type: e.value })}
                                checked={this.state.type === 'professor'} />
                            <label htmlFor="profesor">Profesor</label>
                        </div>
                    </div>

                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText id="email" type="email" name="email" value={this.state.user.email} onChange={this.handleChange} />
                            <label htmlFor="email">E-mail</label></span>
                    </div>
                    <div className="p-field">
                        <span className="p-float-label">
                            <InputText id="password" type="password" name="password" value={this.state.user.password} onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                        </span>
                    </div>
                    <Button type="button" label="Submit" onClick={this.handleSubmit} id="submit" />
                    {/* adaugat */}
                    <Button type="button" label="Register" onClick={this.handleRegister} id="register" />
                    <div id="snackbar">Invalid username or password!</div>{/* adaugat */}
                    <div id="snackbar2">Please select the account type!</div>{/* adaugat */}

                </div>
            </div>

        )
    }

}
export default LogIn;