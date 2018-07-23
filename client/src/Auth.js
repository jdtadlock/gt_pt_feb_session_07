import auth0 from 'auth0-js';
import axios from 'axios';

const env = process.env.NODE_ENV;

export default class Auth {
  constructor(history) {
    this.auth0 = new auth0.WebAuth({
      domain: 'jdtadlock.auth0.com',
      clientID: 'CVeOOkjxWB65Vau30sMBy6wjpAmzZfpz',
      // redirectUri: 'http://localhost:3000/callback',
      // STEP #2
      redirectUri: env === 'development' ? 'http://localhost:3000/callback' : 'https://gtfeb5.now.sh/callback',
      audience: 'https://jdtadlock.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid email'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.processAuthentication = this.processAuthentication.bind(this);

    this.history = history;
  }
  // STEP #1
  login() {
    // Sends you to auth0 website where you start the log in process
    this.auth0.authorize();
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_email');

    this.history.push('/');
  }
  
  // STEP #5
  processAuthentication() {
    // 
    this.auth0.parseHash((err, authResult) => {
      if ( err ) return console.log(err);
      
      if ( authResult && authResult.accessToken && authResult.idToken ) {
        let expires_at = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
        let email = authResult.idTokenPayload.email;

        // console.log(authResult);
        // STEP #6 - Storing values from the url to localStorage
        // so the user can stay logged in as long as the expire token has not expired
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expires_at);
        localStorage.setItem('user_email', email);

        // STEP #7
        axios.post('/user', {email: email})
          .then(res => {
            // console.log(res.data);
            this.history.push('/dashboard');
          });
      }
    });
  }

  isAuthenticated() {
    let expires_at = JSON.parse(localStorage.getItem('expires_at'));

    return new Date().getTime() < expires_at;
  }

}