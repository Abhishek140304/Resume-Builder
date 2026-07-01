import mongoose from 'mongoose'

export default async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected successfully')
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error)
    }
}