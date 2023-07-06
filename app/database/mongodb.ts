import mongoose from "mongoose";

mongoose.Promise = global.Promise

const MONGO_USERNAME = process.env.MONGO_USERNAME
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME
const MONGO_DATABASE = process.env.MONGO_DATABASE

const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?retryWrites=true&w=majority`

mongoose.connect(url)
    .then(() => console.log('mongodb connection successfully!'))
    .catch((err) => console.error(err))
