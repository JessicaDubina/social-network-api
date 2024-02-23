const { Schema, model, default: mongoose } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(v){
                //return formateddate
                return `${v.getMonth()}/${v.getDate()}/${v.getFullYear()} at ${v.getHours()}:${v.getMinutes()}`
            }
        },
    }
)

module.exports = reactionSchema;