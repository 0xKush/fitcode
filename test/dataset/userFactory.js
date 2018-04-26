User = require('../../models/user');

module.exports = {
    /**
     * required
     */
    emptyUserName() {
        return new User({
            email: 'test@test.com',
            password: 'password'
        });
    },
    emptyUserPassword() {
        return new User({
            name: 'tester',
            email: 'test@test.com',
        });
    },
    emptyUserEmail() {
        return new User({
            name: 'tester',
            password: 'password'
        });
    },
    /**
     * validate
     */
    invalidUserName() {
        return new User({
            name: 'tt',
            email: 'test@test.com',
            password: 'password'
        });
    },
    invalidUserPassword() {
        return new User({
            name: 'tt',
            email: 'test@test.com',
            password: 'pass'
        });
    },
    invalidUserEmail() {
        return new User({
            name: 'tt',
            email: 'testtest.com',
            password: 'pass'
        });
    },
    invalidUserId() {
        return new User({
            _id: 12345,
            name: 'tt',
            email: 'testtest.com',
            password: 'pass'
        });
    },
    validUser(name) {
        return new User({
            name: 'user',
            email: Math.random().toString(36).substring(7) + '@test.com',
            password: 'password'
        });
    }
}