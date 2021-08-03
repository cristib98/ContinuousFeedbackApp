import React from 'react'
import {
    Button
} from 'primereact/button';
import {
    DataTable
} from 'primereact/datatable';
import {
    Column
} from 'primereact/column';
import "./NewActivity.css"
import activities from './NewActivityStore'
import {
    PrimeIcons
} from 'primereact/api';
import {
    Dialog
} from 'primereact/dialog'
import {
    InputText
} from 'primereact/inputtext'
import tracks from "./img/tracks.png"


var myStorage = window.localStorage
const variabila = localStorage.getItem("myProfessorFirstName")
const variabila2 = localStorage.getItem("myProfessorId")
var cod

class NewActivity extends React.Component {
    constructor(props) {
        super(props)
        this.formTemplate = () => {
            return ( <
                div className = 'formTemplate' >
                </div>
            )
        }
        this.state = {
            activs: [],
            activ: {
                id:'',
                startDate: '',
                duration: '',
                description: '',
                accessCode: ''

            },
            isCodeDialogShown: false

        }

        this.logOut=()=>{
            window.location.replace("http://localhost:3000/#/login");
            localStorage.clear();
        }


        this.hideCodeDialog = () => {
            this.setState({
                isCodeDialogShown: false
            })
        }

        this.showAddDialog = () => {
            // this.setState({
            //   isAddDialogShown: true
            // })
            window.location.replace("http://localhost:3000/#/addnewactivity");


        }

        this.showCode = (rowData) => {
            this.setState({
                isCodeDialogShown: true,
                activ: rowData
            })
        }

        this.handleChange = (evt) => {
            const activ = this.state.activ
            activ[evt.target.name] = evt.target.value
            this.setState({
                activ: activ
            })
        }
        this.goToActivity = (evt) => {

            // cod=this.state.activ.id
            // console.log(cod)
            // localStorage.setItem('myCode', cod);
            myStorage.setItem("myCodeProf", this.state.activ.id)
            window.location.replace("http://localhost:3000/#/ProfView");
            window.location.reload()
        }

        this.opsTemplate = (rowData) => {
            return ( <div className = 'ops' >
                <span className = 'spaced' >
                <Button icon = 'pi pi-unlock'
                className = 'p-button-rounded p-button-outlined'
                onClick = {
                    () => this.showCode(rowData)
                }/> </span >
                </div>
            )
        }


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


        return ( <div id = "page" >
        <div className="header">
                         <div id="logo">
                     <img src = {tracks} width="40px"></img>
                     <p id="titleHeader">The Lazy Dog</p>
                     </div>
    <Button id="logOutBtn" label='Log Out' icon='pi pi-sign-out' className='p-button p-button-outlined' onClick={this.logOut} />
    </div>
            <div id = "header">
            <p id = "title" > Learn what your students think about you, {
                variabila
            } </p> 
            <p id = "subtitle" > One of the best method to interact with your students </p></div> 
            <svg xmlns = "http://www.w3.org/2000/svg"viewBox = "0 0 1440 320" > < path fill = "#1CB5E0"fillOpacity = "1"d = "M0,160L34.3,149.3C68.6,139,137,117,206,122.7C274.3,128,343,160,411,160C480,160,549,128,617,112C685.7,96,754,96,823,106.7C891.4,117,960,139,1029,144C1097.1,149,1166,139,1234,160C1302.9,181,1371,235,1406,261.3L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z" > </path></svg >
            <Button id = "addBtn2"className = "p-button-lg" onClick = {this.showAddDialog} > Add Activity </Button>
            <div id = "tableContainer" >
            <DataTable value = {this.state.activs} id = "tabelActivity" className = "p-shadow-24 p-datatable-striped"resizableColumns columnResizeMode = "fit" >
            < Column field = "description"header = "Description"class = "header"style = {{width: '28%'} } > </Column> 
            <Column field = "duration"header = "Duration"class = "header"style = {{ width: '24%'}} > </Column> 
            <Column field = "startDate"header = "Start Date"class = "header"style = {{width: '35%'}} ></Column>
             <Column body = { this.opsTemplate } style = {{width: '12%'}}/>

            </DataTable>

            </div> 
            <Dialog  header = 'Access Code: ' visible = { this.state.isCodeDialogShown}className = 'p-fluid'onHide = {this.hideCodeDialog} >
            <div className = 'p-field' >
            <InputText type = "text"id = "accessCode"name = "accessCode"value = {this.state.activ.accessCode}
            onChange = { this.handleChange}readOnly />
            </div> <Button icon = 'pi pi-arrow-right'
            className = 'p-button-rounded p-button-outlined'
            onClick = {
                this.goToActivity
            }/> 
            </Dialog >
            </div>
        )
    }
}

export default NewActivity;