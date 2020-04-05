//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A P P   E N T R Y   P O I N T : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//
/**********************************************************************************
 * 
 * This is the Frontal Application Layer that interacts with http request with 
 * the help of back-end
 * conponents, database schemas and route
 * 
***********************************************************************************/
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    //
    // ─── DEPENDENCIES ───────────────────────────────────────────────────────────────
    //

        
        const mongoose =
            require("mongoose")


        const express =
            require("express");


        const bodyParser =
            require("body-parser");

        const appCommons = 
            require("./app.commons");


    //
    // ─── CUSTOM DEPENDENCIES ────────────────────────────────────────────────────────
    //

     
        const userRoutes =
            require('./routes/user-routes')


        const guestRoutes =
            require('./routes/guest-routes')

        const garbageRoutes = 
            require('./routes/garbage-routes')


        const errorHandler = 
            require('./middleware/error/error-handler.mware')

//
// ─── CONSTANTS ──────────────────────────────────────────────────────────────────
//


    const MONGODB_CONNECTION_URI = 
        process.env.MONGODB_CONNECTION_URI;


    const app =
        express();

//
// ─── GENERAL MIDDLEWARES ────────────────────────────────────────────────────────
//


    app.use( bodyParser.json() )
    app.use(( req, res, next ) => {

        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        if(req.method === 'OPTIONS'){
            return res.sendStatus(200)
        }
        next()
        
    })

//
// ─── ROUTES MIDDLEWARES ─────────────────────────────────────────────────────────
//

    
    app.use(userRoutes)
    app.use(garbageRoutes)
    app.use(guestRoutes)


//
// ─── ERROR HANDLING MIDDLEWARE ──────────────────────────────────────────────────
//


    app.use(errorHandler)


    
//
// ─── DATA CONNNECTION AND HTTP SERVER LISTENING @ PORT 3020 ──────────────────────────────────
//

    // app.listen(3020);
    mongoose
    .connect(MONGODB_CONNECTION_URI)
    .then(() => {
        console.log("working fyn")
        app.listen(process.env.PORT || 3030);
    })

    .catch((error ) => { console.log("something went wrong")});
