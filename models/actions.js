const mongoose = require('mongoose'); 

const actionSchema = mongoose.Schema ({
    action:{
        type: String,
        required: true
    },
    member:{
        type: String,
        required: true
    },
    mod:{
        type: String, 
        required: true 
    },
    reason:{
        type: String
    },
    expires:{
        type: Date
    },
    current:{
        type: Boolean,
        required: true
    }
    
}, { timestamps: true });

const Action = mongoose.model('Action', actionSchema);
module.exports = Action;
