import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,require:true,trim:true},
    password:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    image:{type:String}
},{
    timestamps:true
});

const userModel = mongoose.model("User",userSchema);
export default userModel;