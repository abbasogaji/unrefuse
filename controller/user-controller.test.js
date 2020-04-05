const httpMocks = require('node-mocks-http')
const expect = require('expect')
const mongoose = require('mongoose')
const appCommon = require('../app.commons')
const User = require('../model/User')
const userController = require('./user-controller')
const sinon = require('sinon')


describe('USER CONTROLLER TEST', () => {

        let userId;
        beforeEach(() => {

        })

        beforeAll(() => {
                mongoose.connect(appCommon.MONGODB_TEST_CONNECTION_URI)
        })


        afterEach(() => {

        })

        afterAll( async(done) => {
                const data  = await User.deleteMany({ email : 'yurihandman@example.com'})
                mongoose.disconnect(done)
        })


        describe('CREATE -- WITH USER CONRTOLLER', () => {
            it('stores new user into DB', (done) => {

                let request = httpMocks.createRequest({
                    method : 'POST',
                    url : '/api/auth/signup',
                    body : {
                        name : 'Yuri Handman',
                        email : 'yurihandman@example.com',
                        password : 'yurihandman123'

                    }
                })

                let response  = httpMocks.createResponse({
                    eventEmitter : require('events').EventEmitter
                })
                let next = sinon.spy()
                userController.createUser(request, response, next)
                response.on('end', () => {
                        let data = response._getJSONData()
                        expect(data.dataTitle).toBe(appCommon.USER_CREATED_DATA_TITLE)
                        expect(data.dataType).toBe(appCommon.USER_CREATED_DATA_TYPE)
                        expect(typeof(data.data)).toBe("object")
                        userId = data.data._id
                        done();
                })
                


            })
        })

        describe('READ -- WITH USER CONTROLLER', () => {

            it('gets a user from DB', (done) => {
                let request = httpMocks.createRequest({
                    method : 'GET',
                    url : '/api/user/'+userId,
                    params : {
                            id : userId
                    }
                })

                let response  = httpMocks.createResponse({
                    eventEmitter : require('events').EventEmitter
                })
                let next = sinon.spy()
                userController.getUserById(request, response, next)
                response.on('end', () => {
                        let data = response._getJSONData()
                        expect(data.dataTitle).toBe(appCommon.USER_READ_DATA_TITLE)
                        expect(data.dataType).toBe(appCommon.USER_READ_DATA_TYPE)
                        expect(typeof(data.data)).toBe("object")
                        done();
                })  
            })

            it('gets all users from DB', (done) => {
                let request = httpMocks.createRequest({
                    method : 'GET',
                    url : '/api/user/all'
                })

                let response  = httpMocks.createResponse({
                    eventEmitter : require('events').EventEmitter
                })
                let next = sinon.spy()
                userController.getAllUsers(request, response, next)
                response.on('end', () => {
                        let data = response._getJSONData()
                        expect(data.dataTitle).toBe(appCommon.USER_READ_ALL_DATA_TITLE)
                        expect(data.dataType).toBe(appCommon.USER_READ_ALL_DATA_TYPE)
                        expect(Array.isArray(data.data)).toBe(true)
                        done();
                })          
            })
        })

        describe('UPDATE -- WITH USER CONTROLLER', () => {
            it('updates a users credential DB', () => {
                let request = httpMocks.createRequest({
                    method : 'POST',
                    url : '/api/user/'+userId+'/edit',
                    params : {
                        id : userId
                    },
                    body : {
                        name : "Abbas Ogaji"
                    }
                })

                let response  = httpMocks.createResponse({
                    eventEmitter : require('events').EventEmitter
                })
                let next = sinon.spy()
                userController.updateUserById(request, response, next)
                response.on('end', () => {
                        let data = response._getJSONData()
                        expect(data.dataTitle).toBe(appCommon.USER_READ_ALL_DATA_TITLE)
                        expect(data.dataType).toBe(appCommon.USER_READ_ALL_DATA_TYPE)
                        expect(typeof(data.data)).toBe("object")
                        done();
                })                                       
            })
        })

        describe('DELETE -- WITH USER CONTROLLER', () => {
            it('removes a user from DB', (done) => {
                let request = httpMocks.createRequest({
                    url : '/api/user/'+userId+'/delete',
                    params : {
                        id : userId
                    },
                })

                let response = httpMocks.createResponse({
                    eventEmitter : require('events').EventEmitter
                })

                let next = sinon.spy()
                userController.deleteUserById(request, response, next);
                response.on('end', () => {
                    let data = response._getJSONData()
                        expect(data.dataTitle).toBe(appCommon.USER_DELETED_DATA_TITLE)
                        expect(data.dataType).toBe(appCommon.USER_DELETED_DATA_TYPE)
                        expect(typeof(data.data)).toBe("string")
                        done();
                })
            })

        })

})

