import request from 'supertest';
import { test } from './app.test.js'; 
import { databaseConnection } from './database/connection.js'; 
import mongoose from 'mongoose'; 

jest.setTimeout(10000);

beforeAll(async () => {
  await databaseConnection(); 
});


afterAll(async () => {
  await mongoose.disconnect(); 
});


describe('POST /api/auth/login', () => { 
  it('should login a user and return a token', async () => {
    const response = await request(test)
      .post('/api/auth/login')
      .send({
        email: 'Mariam@email.com',
        password: '123123123'
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined(); 
  });
});
