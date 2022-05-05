import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import app from '../src/app';

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

const dataTest = {
  userName: 'ABC133',
  name: 'ABC133',
  email: 'admin133@gmail.com',
  password: '12345678',
};

describe('Purpose for testing API', () => {
  describe('POST /register ', () => {
    it('return status 201 when user register successful', (done) => {
      chai
        .request(app)
        .post('/register')
        .send(dataTest)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    describe('login with email !', () => {
      it('POST /login', (done) => {
        chai
          .request(app)
          .post('/login')
          .send({
            email: dataTest.email,
            password: dataTest.password,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.keys(
              'id',
              'name',
              'username',
              'email',
              'status',
              'accessToken'
            );
            done();
          });
      });
    });
    describe('login with username !', () => {
      it('POST /login', (done) => {
        chai
          .request(app)
          .post('/login_username')
          .send({
            username: dataTest.userName,
            password: dataTest.password,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.keys(
              'id',
              'name',
              'username',
              'email',
              'status',
              'accessToken'
            );
            done();
          });
      });
    });
    describe('change password !', () => {
      it('POST /change-password', (done) => {
        chai
          .request(app)
          .post('/auth/change-password')
          .send({
            password: dataTest.password,
            newPassword: '123321123',
            confirmPassword: '123321123'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property('message')
              .eql('successfully change password!');
            done();
          });
      });
    });
    describe('reset password !', () => {
      it('POST /reset_password', (done) => {
        chai
          .request(app)
          .post('/auth/forgot-password')
          .send({
            newPassword: '123321123',
            confirmPassword: '123321123',
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have
              .property('message')
              .eql('reset pass successfully');
            done();
          });
      });
    });
  });
});
