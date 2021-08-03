import { EventEmitter } from 'fbemitter'
 
const SERVER = 'http://localhost:8080'

class RegisterFormStore{
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
    }


    async getAllP() {
        try {
          const response = await fetch(`${SERVER}/professors`)
          const data = await response.json()
          this.data = data
          this.emitter.emit('GET_ALL_SUCCESS')
        } catch (err) {
          console.warn(err)
          this.emitter.emit('GET_ALL_ERROR')
        }
    }


async getProfessor(){
    try {
        const response = await fetch(`${SERVER}/loginp`)
        const data = await response.json()
        this.data = data
        this.emitter.emit('GET_ALL_SUCCESS')
      } catch (err) {
        console.warn(err)
        this.emitter.emit('GET_ALL_ERROR')
      }
}


      async addOneP(professor) {
        try {
          await fetch(`${SERVER}/professors/add`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(professor)
          })
          this.getAllP()
        } catch (err) {
          console.warn(err)
          this.emitter.emit('ADD_ONE_ERROR')
        }
      }


}

const utilizator = new RegisterFormStore()
 
export default utilizator