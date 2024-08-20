const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs');
const { parse } = require('path');
const assert = chai.assert;


describe('API Test for Reqres', () => {
    const BASE_URL = "https://reqres.in/api/users/2"

    it('Test - GET All Objects', async() =>{
        const response = await request("https://reqres.in/api/users?page=2").get("objects")
        assert.equal(response.statusCode, 200)
        const getSchemaPath = "resource/jsonSchema/get-object.json"
        const jsonSchema = JSON.parse(fs.readFileSync(getSchemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        console.log(response.body)
    });

    it('Test - POST Create a User', async() =>{
        const body = {
            "name": "morpheus",
            "job": "leader"
        }

        const response = await request("https://reqres.in/api/users")
        .post("objects")
        .send(body)

        assert.equal(response.statusCode, 201)
        assert.equal(response.body.name, "morpheus")
        assert.equal(response.body.job, "leader")
        const postSchemaPath = "resource/jsonSchema/post-object.json"
        const jsonSchema = JSON.parse(fs.readFileSync(postSchemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        console.log(response.body)
    });

    it('Test - DELETE Delete a User', async() =>{
        const response = await request(BASE_URL).delete("objects")

        assert.equal(response.statusCode, 204)
        console.log(response.body)
    });

    it('Test - PUT Update a User', async() =>{
        const body = {
             "name": "morpheus",
             "job": "zion resident"
        }
        const response = await request(BASE_URL)
        .put("objects")
        .send(body)

        assert.equal(response.statusCode, 200)
        assert.equal(response.body.name, "morpheus")
        assert.equal(response.body.job, "zion resident")
        const putSchemaPath = "resource/jsonSchema/put-object.json"
        const jsonSchema = JSON.parse(fs.readFileSync(putSchemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        console.log(response.body)
    });
    
})