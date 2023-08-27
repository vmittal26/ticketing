import request from 'supertest';
import { app } from '../../app';
import { signIn } from '../../test/utils/signIn';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/v1/tickets').send({});
  expect(response.status).not.toEqual(404);
});

it('rejects the request if user is not signed in', async () => {
  await request(app).post('/api/v1/tickets').send({}).expect(401);
});

it('accepts the request if user is signed in', async () => {
  const response = await request(app)
    .post('/api/v1/tickets')
    .set('Cookie', signIn())
    .send({});

  expect(response.status).not.toEqual(401);
});


describe('returns an error if an invalid title is provided',  () => {

  test('if empty title is provided', async()=>{
    await request(app)
    .post('/api/v1/tickets')
    .set('Cookie', signIn())
    .send({
      title: '',
      price: 10,
    })
    .expect(400);
  });

  test('if empty title is not provided', async()=>{
    await request(app)
    .post('/api/v1/tickets')
    .set('Cookie', signIn())
    .send({
      price: 10,
    })
    .expect(400);
  });
  
});

describe('returns an error if an invalid price is provided', () => {
  test('if negative price is provided', async () => {
    await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', signIn())
      .send({
        title: 'mockTitle',
        price: -10,
      })
      .expect(400);
  });

  test('if empty price is provided', async () => {
    await request(app)
      .post('/api/v1/tickets')
      .set('Cookie', signIn())
      .send({
        title: 'mockTitle',
      })
      .expect(400);
  });
});
// it.('creates a ticket with valid inputs', async () => {});
