import { EventEmitter } from 'fbemitter'
 
const SERVER = 'http://localhost:8080'

class HomeStore{
    constructor () {
        this.data = []
        this.emitter = new EventEmitter()
   
    }

    async getAll() {
        try {
          const response = await fetch(`${SERVER}/activities`)
          const data = await response.json()
          this.data = data
          this.emitter.emit('GET_ALL_SUCCESS')
        } catch (err) {
          console.warn(err)
          this.emitter.emit('GET_ALL_ERROR')
        }
    }


}

const activitiesHome = new HomeStore()
 
export default activitiesHome