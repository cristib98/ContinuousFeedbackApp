import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class NewActivityStore {
    constructor(profId) {
        this.data = []
        this.emitter = new EventEmitter()
        this.profId = profId
    }

    async getAll(profId) {
        try {
            const response = await fetch(`${SERVER}/professors/${profId}/activities`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_ALL_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }


    async addOne(activity, profId) {
        try {
            await fetch(`${SERVER}/professors/${profId}/add`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(activity)
                })
                //this.getAll()
        } catch (err) {
            console.warn(err)
            this.emitter.emit('ADD_ONE_ERROR')
        }
    }

}

const activities = new NewActivityStore()

export default activities