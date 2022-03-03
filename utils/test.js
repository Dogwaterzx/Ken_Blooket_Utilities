const Blooket = require('../index')

const client = new Blooket();

(async () => {
    const login = await client.login('email', 'password');

    const x = await client.createSet('xx', 'xx', false, 'aa', login.cookie)

    console.log(x)
})();
