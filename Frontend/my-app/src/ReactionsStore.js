import { EventEmitter } from 'fbemitter'
 
const SERVER = 'http://localhost:8080'

//var idActivity=localStorage.getItem("myCode")


class ReactionsStore{
    constructor (idActivity) {
        this.data = []
        this.emitter = new EventEmitter()
        this.idActivity=idActivity
   
    }


    async getAll(idActivity) {
      try {
        const response = await fetch(`${SERVER}/activities/${idActivity}/feedback`)
        const data = await response.json()
        this.data = data
        this.emitter.emit('GET_ALL_SUCCESS')
      } catch (err) {
        console.warn(err)
        this.emitter.emit('GET_ALL_ERROR')
      }
  }

    async addOne(reaction,idActivity) {
        try {
          await fetch(`${SERVER}/feedbacks/add/${idActivity}`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reaction)
          })
          this.getAll(idActivity)
        } catch (err) {
          console.warn(err)
          this.emitter.emit('ADD_ONE_ERROR')
        }
      }


}

const reactions = new ReactionsStore()
 
export default reactions