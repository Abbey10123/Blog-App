const request = require('supertest')
const {connect} = require('./database')
const UserModel = require('../src/models/user.model')
const app = require('../app')

describe( 'Auth: signUp', ()=>{
    let conn;

    beforeAll(async () => {
        conn = await connect()
    })

   afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should sign up a user', async () => {
        const response = await request(app).post('/user/signup')
            .set('content-type', 'application/json')
            .send({
                first_name: "Abbey",
                last_name: "Raheem",
                username: 'Abbey23',
                email: "Abbey@mail.com",
                password: "123456",
            });
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty("message", "user signup successful");
        expect(response.body.data.user).toHaveProperty("first_name", "Abbey");
        expect(response.body.data.user).toHaveProperty("last_name", "Raheem");
        expect(response.body.data.user).toHaveProperty("username", "Abbey23");
        expect(response.body.data.user).toHaveProperty("email", "Abbey@mail.com");
        expect(response.body.data.user).not.toHaveProperty("password");
        expect(response.body.data).toHaveProperty("token");
    });

    it('should login a user', async () => {
        const user = await UserModel.create({
            first_name: 'Abbey',
            last_name: 'Raheem',
            username: 'Abbey23',
            email: 'Abbey@mail.com',
            password: '123456', 
        });
       
        const response = await request(app)
        .post('/user/login')
        .set('content-type', 'application/json')
        .send({ 
            email: 'Abbey@mail.com', 
            password: '123456'
        });

    

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty('token')  ;
        

    })

})