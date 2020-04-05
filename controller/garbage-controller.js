//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

    
    const Garbage = require("../model/Garbage")
    const { validationResult } = require("express-validator")
    const errorThrower = require("../core/utils/error-genetor.utils")
    const appCommons = require('../app.commons')


//
// ─── BODY ───────────────────────────────────────────────────────────────────────
//

    
exports.createGarbage = ( req, res, next ) => {
    const errors = validationResult(req)
    const userId  = req.userId;
    const input = JSON.parse(req.body.fields);
    

    const imageUrl = req.file.path
    const location = {longitude : input.longitude, latitude : input.latitude}
    if(errors.isEmpty()){
        const garbage = new Garbage({

            garbageType : input.garbageType,
            location : location,
            contents : input.contents,
            removed : false,
            detected : false,
            dirtLevel : input.dirtLevel,
            imageUrl : imageUrl,
            spottedBy : userId,


        })
        garbage.save().then( newGarbage => {
                return res.status(200).json({
                    garbage : newGarbage
                })
        }).catch(err =>{
            next(err)
        })
    }else{  
        errorThrower("Unable to Save Garage Spotted", errors.array())
    }


}

exports.getAllGarbages = (req, res, next) => {
    
    Garbage.find({ }).then( garbages => {
        return res.status(200).json({
            dataTitle: appCommons.GARBAGE_READ_ALL_DATA_TITLE,
            dataType : appCommons.GARBAGE_READ_ALL_DATA_TYPE,
            data : garbages
        })
    }).catch(err => {
        next(err)
    })
}

exports.getGarbageById = (req, res, next) => {
    Garbage.findOne({ _id : req.params.id }).then(garbage => {
        return res.status(200).json({
            dataTitle: appCommons.GARBAGE_READ_DATA_TITLE,
            dataType : appCommons.GARBAGE_READ_DATA_TYPE,
            data : garbage
        })
    }).catch(err => {
        next(err)
    })
}

exports.removeAllGarbages = (req,res, next) => {
    Garbage.deleteMany({}).then(data => {
        return res.status(200).json({
            dataTitle: "Garbages Deleted",
            dataType : "empty",
            data : "All data deleted"
        })
    }).catch(err => {
        next(err)
    }) 
}

exports.deleteGarbageById = (req, res, next) => {
    const userId  = req.userId;
    const garbageId = req.params.id 
    Garbage.findOneAndDelete({_id : garbageId, spottedBy : userId}).then(data => {
        return res.status(200).json({
            dataTitle: appCommons.GARBAGE_DELETED_DATA_TITLE,
            dataType : appCommons.GARBAGE_DELETED_DATA_TYPE,
            data : "Garbage ID : "+garbageId
        })
    }).catch(err => {
        next(err)
    })
}

exports.updateGarbageById = (req, res, next) => {

    const userId  = req.userId;
    const garbageId = req.params.id 
    const input = req.body;

    Garbage.findOneAndUpdate({_id : garbageId, spottedBy : userId}, {
        garbageType : input.garbageType,
        contents : input.contents,
        dirtLevel : input.dirtLevel,
        removed : input.removed,
        detected : input.detected ,
    }, {
        new : true,
    }).then(data => {
        return res.status(200).json({
            dataTitle: appCommons.GARBAGE_UPDATED_DATA_TITLE,
            dataType : appCommons.GARBAGE_UPDATED_DATA_TYPE,
            data : data
        })
    }).catch(err => {
        next(err)
    })
}
