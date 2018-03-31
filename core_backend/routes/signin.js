var express = require('express')
var session = require('express-session')

/*
 * `checkAuth` should be called on all protected pages.
 * The other functions should be called on the application-level as middleware.
 */

// https://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js

function checkAuth(req, res, next) {
  if (! req.session.user_id) {
    res.send("Your must log in")
  } else { 
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
  }
}

function makeLoginRoute(app) {
  app.post('/login', (req,res) => {
    var post = req.body();
    if (post.user === 'steve' && post.password === '123') {
      // TODO
      req.session.user_id = 'steve_id';
      res.redirect(`/logged_in?sess_id=${sess_id}`);
    } else {
      res.send("Account non-existent or password incorrect");
    }
  });
}

function makeLogoutRoute(app) {
  app.get('/logout', (req,res) => {
    delete req.session.user_id;
    res.redirect('/login');
  });
}

module.exports = {
  checkAuth: checkAuth,
  makeLoginRoute: makeLoginRoute
  makeLogout: makeLogoutRoute
};
