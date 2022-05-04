import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import app from '../src/app';

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('Purpose for testing API', () => {
  describe('POST /register ', () => {
    it('return status 201 when user register successful', (done) => {
      chai
        .request(app)
        .post('/register')
        .send({
          userName:"ABC126",
          name:"ABC126",
          email:"admin126@gmail.com",
          password:"12345678"
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

  //   it('return status 400 data user is not correct', (done) => {
  //     chai
  //       .request(server)
  //       .post('/users/register')
  //       .send({
  //         username: 'what',
  //         age: 12,
  //         email: 'what99@gmail.vn',
  //         password: '123321',
  //         job: 'abc',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         done();
  //       });
  //   });

  //   it('return status 400 user email is already', (done) => {
  //     chai
  //       .request(server)
  //       .post('/users/register')
  //       .send({
  //         username: 'what',
  //         age: 12,
  //         email: 'what99@gmail.vn',
  //         password: '123321',
  //         job: 'abc',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         done();
  //       });
  //   });

  //   it('return status 400 user data user is null', (done) => {
  //     chai
  //       .request(server)
  //       .post('/users/register')
  //       .send({
  //         username: 'what',
  //         age: 12,
  //         email: 'what99@gmail.vn',
  //         password: '123321',
  //         job: 'abc',
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(400);
  //         done();
  //       });
  //   });

  });
});