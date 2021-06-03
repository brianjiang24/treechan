const mongoose = require('mongoose'); 

const actionSchema = mongoose.Schema ({
    server:{
        type: String,
        required: true
    },
    logchan:{
        type: String,
        required: true
    },
    mod:{
        type: String, 
        required: true 
    }
}, { timestamps: true });

const Log = mongoose.model('Log', actionSchema);
module.exports = Log;
