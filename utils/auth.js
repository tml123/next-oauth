const jwt = require('jsonwebtoken');

const credentials = {
    client: {
        id: process.env.APP_ID,
        secret: process.env.APP_PASSWORD
    },
    auth: {
        tokenHost: process.env.TOKEN_HOST,
        authorizePath: process.env.AUTHORIZE_PATH,
        tokenPath: process.env.TOKEN_PATH
    }
}

const oauth2 = require('simple-oauth2').create(credentials);

function getAuthUrl() {
    const returnVal = oauth2.authorizationCode.authorizeURL({
        redirect_uri: process.env.REDIRECT_URI,
        scope: process.env.APP_SCOPES
    });
    console.log(`Generated auth url: ${returnVal}`);
    return returnVal;
}

async function getAccessToken(cookies, res) {
    // Do we have an access token cached?
    let token = cookies.graph_access_token;
  
    if (token) {
      // We have a token, but is it expired?
      // Expire 5 minutes early to account for clock differences
      const FIVE_MINUTES = 300000;
      const expiration = new Date(parseFloat(cookies.graph_token_expires - FIVE_MINUTES));
      if (expiration > new Date()) {
        // Token is still good, just return it
        return token;
      }
    }
  
    // Either no token or it's expired, do we have a
    // refresh token?
    const refresh_token = cookies.graph_refresh_token;
    if (refresh_token) {
      const newToken = await oauth2.accessToken.create({refresh_token: refresh_token}).refresh();
      saveValuesToCookie(newToken, res);
      return newToken.token.access_token;
    }
  
    // Nothing in the cookies that helps, return empty
    return null;
}

async function getTokenFromCode(auth_code, req, res) {
    let result = await oauth2.authorizationCode.getToken({
      code: auth_code,
      redirect_uri: process.env.REDIRECT_URI,
      scope: process.env.APP_SCOPES
    });
  
    const token = oauth2.accessToken.create(result);
    console.log('Token created: ', token.token);
  
    saveValuesToCookie(token, req, res);
  
    return token.token.access_token;
}

function saveValuesToCookie(token, req, res) {
    // Parse the identity token
    const user = jwt.decode(token.token.id_token);
  
    // Save the access token in a cookie
    req.session.accessToken = token.token.access_token;
    // Save the user's name in a cookie
    req.session.userName = user.name;
    req.session.refreshToken = token.token.refresh_token;
    req.session.tokenExpires = token.token.expires_at.getTime();
}

function clearCookies(req, res) {
    // Clear cookies
    delete req.session.accessToken;
    delete req.session.userName;
    delete req.session.refreshToken;
    delete req.session.tokenExpires;
}
  
module.exports.clearCookies = clearCookies;
module.exports.getAuthUrl = getAuthUrl;
module.exports.getAccessToken = getAccessToken;
module.exports.getTokenFromCode = getTokenFromCode;

