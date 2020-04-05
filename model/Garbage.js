//
// ────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G A R B A G E   M O N G O D B   M O D E L : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//
/********************************************************************************************
 * 
 * Information for garbages;
 * Garbage description
 * Garbage location
 * Garbage spotted by
 * 
*********************************************************************************************/
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//


    const mongoose = 
        require("mongoose")

        
//
// ─── BODY ───────────────────────────────────────────────────────────────────────
//

    
 const garbageSchema = 
    new mongoose.Schema ({
        garbageType :      {
            type :  String,
            required: true
        },
        location :  {
            longitude : {
                type: Number,
                required : true
            },

            latitude : {
                type: Number,
                required : true 
            }
        },
        contents : {
            type : Array,
            required: true
        },
        dirtLevel : {
            type : Number,
            required : true
        },
        imageUrl : {
            type : String,
            required : true
        },
        removed :     {
            type: Boolean,
            required: true,
            default : false
        },
        detected : {
            type: Boolean,
            required : true,
            default : false
        },
        spottedBy : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath : 'onModel'
        },
        onModel: {
            type: String,
            required: true,
            enum: ['User', 'Guest']
          }
    },


    {
        timestamps : true
    })



//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    

 module.exports = mongoose.model('Garbage', garbageSchema)
