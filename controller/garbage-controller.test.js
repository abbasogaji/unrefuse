const Garbage = require('../model/Garbage')
const garbageController = require('./garbage-controller')
const User = require('../model/User')
const mongoose = require("mongoose")
const appCommon = require("../app.commons")
const bcrypt  = require('bcryptjs')
const httpMocks = require('node-mocks-http')
const expect = require('expect')
const sinon = require('sinon')



//
// ─── TEST DATA ──────────────────────────────────────────────────────────────────
//

    const createGarbageDummyData = (userId, arrayIndex) => {
      garbageArray = [
        {
          garbageType: "plastic wwaster",
          location: {longitude : 2.343434, latitude : 6.443333},
          contents: ["waste", "Garbage", "Plastic"],
          removed: false,
          detected: false,
          dirtLevel: 3,
          imageUrl: "/uploads/garbage-images/image-1567713601279-test.jpg",
          spottedBy: userId
        },
        {
          garbageType: "second plastic wwaster",
          location: {longitude : 2.343434, latitude : 6.443333},
          contents: ["second waste", "second Garbage", "another one"],
          removed: false,
          detected: false,
          dirtLevel: 4,
          imageUrl: "/uploads/garbage-images/image-1567713601279-test.jpg",
          spottedBy: userId
        }
      ];

      return garbageArray[arrayIndex]
    };
    


//
// ─── CRUD TEST FOR NODEJS ──────────────────────────────────────────────────
//

describe('Garbage API test (Mongoose/MongDB/ExpressJS)', () => {
    let garbage;
    let garbageId;

w

    beforeAll(() => {
            mongoose.connect(appCommon.MONGODB_TEST_CONNECTION_URI)
    })


    beforeEach(() => {
        return User.findOne({email : 'abbasogaji@gmail.com'}).then(user => {
            // garbage = new Garbage(createGarbageDummyData(user.id, 0));
            // garbage.save();
            // garbage = new Garbage(createGarbageDummyData(user.id, 1));
            // return garbage.save();
        })
    });



    afterEach(() => {
        // return Garbage.deleteMany({})
    });



    afterAll((done) => {
        mongoose.disconnect(done);
        
    });



    describe('CREATE -- Garabage Document', () => {
        it('Stores Garbage in DB', (done) => {
            let request  = httpMocks.createRequest({
                method: 'POST',
                url: '/api/garbage/new',
                body :  {
                    fields : JSON.stringify({
                        garbageType: "plasticababsabsbasbas wwaster",
                        longitude : 2.343434, 
                        latitude : 6.443333,
                        contents: ["waste", "Garbage", "Plastic"],
                        removed: false,
                        detected: false,
                        dirtLevel: 3,
                        imageUrl: "/uploads/garbage-images/image-1567713601279-test.jpg",
                        spottedBy: '5d74bcd6f771a23a506eab47'
                    })
                },
                file : {
                    path : '/uploads/garbage-images/image-1567713601279-test.jpg'
                },
                userId : '5d74bcd6f771a23a506eab47'
            });
         
            let  response = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
              });

            let next  = sinon.spy()

            garbageController.createGarbage(request, response, next);
            response.on('end', () => {
                let data = response._getJSONData()
                expect(data.garbage).toBeDefined()
                done();
            })
            
        })

    })


    describe('READ -- Garbage Document', () => {

        it('Gets All Garbages in DB', (done) => {
            let request  = httpMocks.createRequest({
                method: 'GET',
                url: '/api/garbage/all',
                
            });
         
            let  response = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            });
            let next  = sinon.spy()
            garbageController.getAllGarbages(request, response, next);
            response.on('end', () => {
                let data = response._getJSONData()
                expect(data.dataTitle).toBeDefined()
                expect(data.dataType).toBeDefined()
                expect(data.data).toBeDefined()
                expect(Array.isArray(data.data)).toBe(true)
                garbageId = data.data[0]._id
                done();
            })

        })

        it('Gets A Garbage By ID', (done) => {
            let request  = httpMocks.createRequest({
                method: 'GET',
                url: '/api/garbage/find',
                params : { id : garbageId}
                
            });
         
            let  response = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            });
            
            garbageController.getAllGarbages(request, response);
            response.on('end', () => {
                let data = response._getJSONData()
                expect(data.dataTitle).toBeDefined()
                expect(data.dataType).toBeDefined()
                expect(data.data).toBeDefined()
                expect(typeof(data.data)).toBe('object')
                done();
            })
        })
    })



    describe('UPDATE -- Garbage Document', () => {
        it('Updates a Garbage property in DB', (done) => {

            const newContent = ['Acid', 'Nitrogen', 'Black Sand']
            const newGarbageType = 'Green Goblin'
            const newDirtLevel = 6
            const newRemoved = true
            const newDetected = true

            let request  = httpMocks.createRequest({
                method: 'PUT',
                url: '/api/garbage/edit/'+garbageId,
                body : {
                    garbageType : newGarbageType,
                    contents : newContent ,
                    dirtLevel : newDirtLevel ,
                    removed : newRemoved,
                    detected : newDetected 
                },
                params : {
                    id : garbageId
                },
                userId : '5d74bcd6f771a23a506eab47'
                
            });
         
            let  response = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            });
            let next  = sinon.spy()
            garbageController.updateGarbageById(request, response, next);
            response.on('end', () => {
                let data = response._getJSONData()
                expect(data.dataTitle).toBe(appCommon.GARBAGE_UPDATED_DATA_TITLE)
                expect(data.dataType).toBe(appCommon.GARBAGE_UPDATED_DATA_TYPE)
                expect(data.data.garbageType).toBe(newGarbageType)
                expect(data.data.contents).toStrictEqual(newContent)
                expect(data.data.dirtLevel).toBe(newDirtLevel)
                expect(data.data.removed).toBe(newRemoved)
                expect(data.data.detected).toBe(newDetected)
                done();
            })
        })
    })


    describe('DELETE -- Garbage Document', () => {
        it('Delete a Garbage by ID in DB', (done) => {
            let request  = httpMocks.createRequest({
                method: 'DELETE',
                url: '/api/garbage/'+garbageId+'/delete',
                params : {
                    id : garbageId
                },
                userId : '5d74bcd6f771a23a506eab47'
                
            });
         
            let  response = httpMocks.createResponse({
                eventEmitter: require('events').EventEmitter
            });

            let next  = sinon.spy()
            garbageController.deleteGarbageById(request, response, next);
            response.on('end', () => {
                let data = response._getJSONData()
                expect(data.dataTitle).toBe(appCommon.GARBAGE_DELETED_DATA_TITLE)
                expect(data.dataType).toBe(appCommon.GARBAGE_DELETED_DATA_TYPE)
                expect(data.data).toBe("Garbage ID : "+garbageId)
                done();
            })
        })
    })



    
})




    



