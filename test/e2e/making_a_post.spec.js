var chai = require('chai')
chai.use(require('chai-as-promised'))
var expect = chai.expect

describe('making a post', function () {
  it('creates an account and a new post', function () {
    browser.get('http://localhost:3001')

    // click 'register'
    element(by.css('nav .register')).click()

    // fill out and submit registration form
    element(by.model('username')).sendKeys('dickeyxxx')
    element(by.model('password')).sendKeys('pass')
    element(by.css('form .btn')).click()
    
    // Navigate to the posts page
    element(by.css('nav .posts')).click();
    
    // submit a new post on the posts page
    var post = 'my new post' + Math.random()
    element(by.model('postBody')).sendKeys(post)
    element(by.css('form .btn')).click()

    expect(element.all(by.css('ul.posts li')).first().getText()).to.eventually.contain(post)
  })
})
