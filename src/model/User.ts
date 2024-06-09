import mongoose,{Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
   username:{
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true
   },
   email:{
    type: String,
    required: [true, "Email is required"],
    match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, "Please use valid email address"]
   },
   password:{
    type:String,
    requried: [true,"Password is required"]
   },
   verifyCode:{
    type: String,
    required: [true, "Verify Code is required"]
   },
   verifyCodeExpiry:{
    type: Date,
    required: [true, "Verify Code Expiry is required"]
   },
   isVerified:{
    type: Boolean,
    default: false,
   },
   isAcceptingMessage:{
    type:Boolean,
    default:false,
   },
   messages: [MessageSchema]
})

//a check used in Next as it runs on Edge Runtime as Next doesn't know if it is the first time it is running or it has already ran before
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel