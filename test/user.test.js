/***************************************************************
 * @purpose  : Test Api  
 * @file     : user.test.js              
 * @overview : Test Cases To Test Api  
 * @author   : priti shinde
 * @since    : 23/5/2020
***************************************************************/

const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require('../server')
chai.use(chaiHttp)
const expect = require('chai').expect
const url = `http://localhost:3000/`;  
const request = require('supertest')(url);
var fs = require("fs")

function readFile() {
    var readData = fs.readFileSync("/home/priti/Desktop/fundooNote/test/userData.json")
    var data = JSON.parse(readData)
    console.log(data)
    return data
    
}

describe(`User Api Test`,() =>{

    it(`givenUser_whenStoreInDatabase_shouldReturnUserById`,(done)=>{
        request.post('/graphql')
        .send({ query: readFile().getUserById })
        .expect(200)
        .end((err,res) =>{
            if (err) {
                return done(err);
            }
            expect(JSON.parse(res.text).data.getUserById.firstName).to.equals("poonam");
            done();
        })
    })

    it.skip(`givenUser_whenLoginProper_shouldReturnSucessMessage`,(done)=>{
        request.post('/graphql')
        .send({ query: readFile().login })
        .expect(200)
        .end((err,res) =>{
            if (err) {
                return done(err);
            }
            expect(JSON.parse(res.text).data.login.message).to.equals("login Successfull");
            done();
        })
    })

    it(`givenUser_whenRegisterProper_shouldReturnSucessMessage`,(done)=>{
        request.post('/graphql')
        .send({ query: readFile().register })
        .expect(400)
        .end((err,res) =>{
            if (err) {
                return done(err);
            }
            expect(JSON.parse(res.text).data.register.message).to.equals("register Successfull");
            done();
        })
    })


    it.skip(`givenUser_whenForgotPassword_shouldReturnTokenMessage`,(done)=>{
        request.post('/graphql')
        .send({ query: readFile().forgotPassword })
        .expect(200)
        .end((err,res) =>{
            if (err) {
                return done(err);
            }
            expect(JSON.parse(res.text).data.forgotPassword.message).to.equals("Token Generated Sucessfully");
            expect(JSON.parse(res.text).data.forgotPassword.success).to.equals(true);
            done();
        })
    })

    it.only(`givenUser_whenResetPassword_shouldReturnTokenMessage`,(done)=>{
        request.post('/graphql')
        .send({ query: readFile().resetPassword ,Headers: readFile().resetPassword})
        
        .expect(400)
        .end((err,res) =>{
            if (err) {
                return done(err);
            }
            expect(JSON.parse(res.text).data.resetPassword.message).to.equals("Password Reset Sucessfully");
            expect(JSON.parse(res.text).data.resetPassword.success).to.equals(true);
            done();
        })
    })


    



})