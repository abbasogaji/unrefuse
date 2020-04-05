// ────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G U E S T   M O N G O D B   M O D E L : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────
//
/*********************************************************************************************
 * 
 * Information for stored in the document include;
 * Guest IP address,
 * Guest Location
 * 
**********************************************************************************************/
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//


    const mongoose = 
        require("mongoose")


//
// ─── BODY ───────────────────────────────────────────────────────────────────────
//

    
    const guestSchema = 
        new mongoose.Schema(
            {
                name : String,
                deviceId: String,
                location :  {
        
                    latitude : {
                        type: Number,
                        required : true 
                    },
                    
                    longitude : {
                        type: Number,
                        required : true
                    }
                },
            },


            {
                timestamps: true
            }


            );

        
//
// ─── EXPORTS ────────────────────────────────────────────────────────────────────
//

    
    module.exports = mongoose.model("Guest", guestSchema);
