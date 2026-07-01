import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String, 
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
},{
    timestamps: true
})

// Automatically hash the password before saving a user
UserSchema.pre('save', async function(){
    if(!this.isModified('password')) return 

    try{
        this.password = await bcrypt.hash(this.password, 10)
    }
    catch(error){
        console.log(error.message)
    }
})

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', UserSchema)

export default User