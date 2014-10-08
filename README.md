Sample project for [Write Modern Web Apps with the MEAN Stack](http://www.amazon.com/Write-Modern-Apps-MEAN-Stack/dp/0133930157) by [Jeff Dickey](https://dickey.xxx)

This repo has separate branches for each chapter with code for each one to follow along.

Changes
=======

As JavaScript and the web is always changing, here are some of the ways this codebase has moved away from the book:

Express res.send -> res.sendStatus
----------------------------------

Express deprecated the syntax for simple HTTP responses. You used to be able to say `res.send(401)` and it would reply 'Unauthorized' along with the HTTP code, this is deprecated in favor of `res.sendStatus(401)` which does the same thing.

Different controller structure
------------------------------

Instead of defining each of the controllers inside `server.js`, I found it a little easier to manage by having all the controller references in a `controller/index.js`.

This way `server.js` only needs the following:

    app.use(require('./controllers'))

Then the controller can mount sub-controllers, here is `controllers/index.js`:

```javascript
var router = require('express').Router()

router.use('/api', require('./api'))
router.use('/', require('./static'))

module.exports = router
```

Also, I found it better to only namespace the api to `/api` at this point, and not in `controllers/api/index.js`. Instead, the full path without `/api` should be in each controller action.

In other words, for `/api/users`, I found

    router.get('/users', function (req, res, next) {

preferable to having `/users` defined higher up and having the action look like this:

    router.get('/', function (req, res, next) {

The reason is that it makes it easier to find routes since the actions will already have most of the url in them, it takes less hunting in files to get the actual URL. It's still useful to prefix `/api` as it can be helpful for a 404 endpoint or perhaps a versioning setup.
