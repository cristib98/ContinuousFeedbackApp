import React from 'react'
import { Button } from 'primereact/button';
import activities from './NewActivityStore'
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext'
import "./AddNewActivity.css"
import tracks from "./img/tracks.png"
const variabila2 = localStorage.getItem("myProfessorId")


class AddNewActivity extends React.Component {
    constructor(props) {
        super(props)
        this.formTemplate = () => {
            return (
                <div className='formTemplate'>

                </div>
            )
        }
        this.state = {
            activs: [],
            activ: {
                startDate: '',
                duration: '',
                description: '',
                descriptionError: '', //adaugat
                durationError: '',//adaugat
                startDateError: ''//adaugat
            }

        }


        this.handleChange = (evt) => {
            const activ = this.state.activ
            activ[evt.target.name] = evt.target.value
            this.setState({
                activ: activ
            })

        }
this.logOut=()=>{
    window.location.replace("http://localhost:3000/#/login");
    localStorage.clear();
}
        this.save = () => {

            const isValid = this.validate()     //adaugat
            if (isValid) {      //adaugat
                var isoDate = this.state.activ.startDate.toISOString();
                this.state.activ.startDate = isoDate

                console.log(this.state.activ.description)
                //console.log(this.state.activ.startDate.toISOString())
                activities.addOne(this.state.activ, variabila2)
                window.location.replace("http://localhost:3000/#/newactivity")
                window.location.reload()
            }


        }




    }


    //adaugat
    validate = () => {
        let descriptionError = ""
        let durationError = ""
        let startDateError = ""

        if (!this.state.activ.description) {
            descriptionError = "Description cannot be blank!"
        }
        if (!this.state.activ.duration) {
            durationError = "Duration cannot be blank!"
        }

        if (!this.state.activ.startDate) {
            startDateError = "Start date cannot be blank!"
        }

        else if (this.state.activ.startDate < Date.now()) {
            startDateError = "The start date has to be in the future!"
        }


        if (descriptionError || durationError || startDateError) {
            this.setState({ descriptionError, durationError, startDateError })
            return false;
        }
        return true;
    }


    componentDidMount() {
        activities.getAll(variabila2)
        activities.emitter.addListener('GET_ALL_SUCCESS', () => {
            this.setState({
                activs: activities.data
            })
        })
    }


    //const [date8, setDate8] = useState(null);

    render() {


        return (
<div id="page">
<div className="header">
                         <div id="logo">
                     <img src = {tracks} width="40px"></img>
                     <p id="titleHeader">The Lazy Dog</p>
                     </div>
    <Button id="logOutBtn" label='Log Out' icon='pi pi-sign-out' className='p-button p-button-outlined' onClick={this.logOut} />
    </div>
            <div id="containerNewActiv" className="p-shadow-24">
                <div id="dialog" className='p-fluid'>
                <div id="titleActiv">Add new activity</div>
                    <div className='p-field'>
                        <label htmlFor="description">Description</label>
                        <InputText type="text" id="description" name="description"
                            value={this.state.activ.description} onChange={this.handleChange} />
                    </div>
  
                    <div style={{ fontSize: 16, color: 'red' }}>{this.state.descriptionError}</div>{/* adaugat */}
                    <div className='p-field'>
                        <label htmlFor="duration">Duration</label>
                        <InputText type="number" id="duration" name="duration"
                            value={this.state.activ.duration} onChange={this.handleChange} />
                        <div style={{ fontSize: 16, color: 'red' }}>{this.state.durationError}</div> {/* adaugat */}
                    </div>
                    <div className="p-field p-col-12 p-md-4" id="calendar">
                        <label htmlFor="time24">Start Date</label>
                        <Calendar id="time24" showTime showSeconds name="startDate"
                            value={this.state.activ.startDate} onChange={this.handleChange} />
                        <div style={{ fontSize: 16, color: 'red' }}>{this.state.startDateError}</div> {/* adaugat */}
                    </div>
                    <div className='centered'>
                        <Button id="saveBtn" label='Save' icon='pi pi-save' className=' p-button-outlined' onClick={this.save} />
                    </div>
                </div>

            </div>


            </div>
        )
    }
}

export default AddNewActivity;