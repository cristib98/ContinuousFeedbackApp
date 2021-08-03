import { EventEmitter } from 'fbemitter'
 
const SERVER = 'http://localhost:8080'

class RegisterFormStoreS{
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getAllS() {
        try {
          const response = await fetch(`${SERVER}/students`)
          const data = await response.json()
          this.data = data
          this.emitter.emit('GET_ALL_SUCCESS')
        } catch (err) {
          console.warn(err)
          this.emitter.emit('GET_ALL_ERROR')
        }
    }

  


    async addOne(student) {
        try {
          await fetch(`${SERVER}/students/add`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
          })
          this.getAllS()
        } catch (err) {
          console.warn(err)
          this.emitter.emit('ADD_ONE_ERROR')
        }
      }


}

const utilizatorS = new RegisterFormStoreS()
 
export default utilizatorS