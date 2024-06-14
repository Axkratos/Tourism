import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    accountType: {
        type: String,
        enum: ['tourist', 'guide'],
        required: true
    },
    
    places: {
        type: [String],
        required: function() {
            return this.accountType === 'guide';
        }
    },
    specialty: {
        type: String,
        required: function() {
            return this.accountType === 'guide';
        }
    },

    price: {
        type: Number,
        required: function() {
            return this.accountType === 'guide';
        }
    },

    phone: {
        type: Number,
        required: function() {
            return this.accountType === 'guide';
        }
    },

    document: {
        type: String,
        required: function() {
            return this.accountType === 'guide';
        }
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
