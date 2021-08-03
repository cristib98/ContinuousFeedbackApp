import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'


class ProfViewStore {
    constructor(activityId) {
        this.data = []
        this.emitter = new EventEmitter()
        this.activityId = activityId

    }

    async getAll(activityId) {
        try {
            const response = await fetch(`${SERVER}/activities/${activityId}/feedback`)
            const data = await response.json()
            this.data = data
            this.emitter.emit('GET_ALL_SUCCESS')
        } catch (err) {
            console.warn(err)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }



}

const reactViews = new ProfViewStore()

export default reactViews