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

})