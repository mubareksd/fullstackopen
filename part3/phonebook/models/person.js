const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to', url)

mongoose
    .connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((err) => {
        console.log('error connecting to MongoDB:', err.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        required: true,
        validate: [
            {
                validator: (number) => {
                    number.replace('-', '')
                    return number.length >= 8 ? true : false
                },
                message: (props) => `${props.value} is not a valid number!`,
            },
            {
                validator: (number) => {
                    return /^\d{2,3}-\d+$/.test(number)
                },
                message: (props) => `${props.value} is not a valid number!`,
            },
        ],
    },
})

personSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
