 //
 // ──────────────────────────────────────────────────────────────────────────── I ──────────
 //   :::::: U S E R   M O N G O D B   M O D E L : :  :   :    :     :        :          :
 // ──────────────────────────────────────────────────────────────────────────────────────
/********************************************************************************************
 * 
 * Information for stored in the document include;
 * Guest IP address,
 * Guest Location
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

    

 const userSchema = 
    new mongoose.Schema ({
        name :      {
            type :  String,
            required: true
        },


        email :     {
            type: String,
            required: true
        },


        password :  {
            type : String,
            required: true
        }
    },


    {
        timestamps : true
    })

        
//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//


    module.exports = mongoose.model('User', userSchema)