import React from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'
import activitiesHome from './HomeStore'
import { withRouter } from 'react-router-dom'
import "./Home.css"
import tracks from "./img/tracks.png"
var iddd;

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

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            activity: {
                id:'',
                description: '',
                startDate: '',
                accessCode: '',
                duration: ''
            },
            activities: [],
            isAddDialogShown:false,
            acc:''
        }
        this.logOut=()=>{
            window.location.replace("http://localhost:3000/#/login");
            localStorage.clear();
        }
        this.viewActiv = () => {
            //console.log(this.state.activities)
            this.state.activities.forEach(activity => {
                console.log(activity.accessCode)
                console.log(this.state.acc)
                if(this.state.acc===activity.accessCode) {
                    // dur= activity.duration;
                    // strD=activity.startDate;
                    // des=activity.description;
                    iddd=activity.id
                    console.log(iddd)
                    localStorage.setItem("myCode",iddd)
                    this.setState({
                        isAddDialogShown: true,
                        activity:{
                            id:activity.id,
                            accessCode:activity.accessCode,
                            description:activity.description,
                            startDate:activity.startDate,
                            duration:activity.duration
                        }
                    })
                }else { console.log("nu")
                console.log(iddd) }
            })
        }
        this.hideAddDialog = () => {
            this.setState({
                isAddDialogShown: false
            })
        }

        //adaugat --> aici cred ca merge copy-replace la toata functia
        this.Reactions = () => {
            var d = new Date(this.state.activity.startDate)
            var d2 = new Date(this.state.activity.startDate)
        
            d.setMinutes(d.getMinutes() + this.state.activity.duration)
            console.log(d)
            var n = new Date()
            console.log(n)

            if (d2.getTime() > n.getTime()) {
                snakbar();
            }
            else if (n.getTime() > d.getTime()) {
                snakbar2()
            }
            else {
                window.location.replace("http://localhost:3000/#/Reactions");
                window.location.reload()
                //adaugat
            }
        }
        

        this.handleChange = (evt) => {
            this.setState({[evt.target.id]: evt.target.value});
        }


        this.addDialogFooter = (
            <div className='centered'>
                <Button label='Connect' className='p-button-rounded p-button-outlined' onClick={this.Reactions}/>
            </div>
        )


        this.formTemplate = () => {
            return (
                <div className='formTemplate'>

                </div>
            )
        }
    }

    componentDidMount() {
        activitiesHome.getAll()
        activitiesHome.emitter.addListener('GET_ALL_SUCCESS', () => {
            this.setState({
                activities: activitiesHome.data
            })
        })


    }

    render() {
        return (<div id="page">
             <div className="header">
                         <div id="logo">
                     <img src = {tracks} width="40px"></img>
                     <p id="titleHeader">The Lazy Dog</p>
                     </div>
    <Button id="logOutBtn" label='Log Out' icon='pi pi-sign-out' className='p-button p-button-outlined' onClick={this.logOut} />
    </div>
    <div id="header">
    <div id="title">Give feedback to your activities</div>
    </div>
<div id="contentHome">
                <div className="p-field">
                    <label htmlFor="acc">Access Code</label>
                    <InputText id="acc" type="text" name="acc" 
                    value={this.state.acc} onChange={this.handleChange}/>
                </div>
                <Button id="viewActiv" label="View Activity" icon="pi pi-info-circle" className="p-button-lg" onClick={this.viewActiv} />


                <Dialog header='Activity Details'
                    visible={this.state.isAddDialogShown}
                    className='p-fluid'
                    footer={this.addDialogFooter}
                    onHide={this.hideAddDialog} id="popupViewActiv">
                    <div className='p-field'>
                        <label htmlFor="description">Description</label>
                        <InputText type="text" id="description" name="description" value={this.state.activity.description} onChange={this.handleChange} readOnly />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="startDate">Start Date</label>
                        <InputText type="text" id="startDate" name="startDate" value={this.state.activity.startDate} onChange={this.handleChange} readOnly />
                    </div>
                    <div className='p-field'>
                        <label htmlFor="duration">Duration</label>
                        <InputText type="text" id="duration" name="duration" value={this.state.activity.duration} onChange={this.handleChange} readOnly />
                    </div>
                </Dialog>
                <div id="snackbar">The activity hasn't started yet!</div>{/* adaugat */}
                <div id="snackbar2">The activity has finished!</div>{/* adaugat */}
                </div>
            </div>
            )
    }

}



export default Home