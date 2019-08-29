const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    createUser(newUser, callback) {
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(newUser.password, salt);
  
      return User.create({
        username: newUser.username,
        email: newUser.email,
        password: hashedPassword
      })
        .then(user => {
          const msg = {
            to: 'test@example.com',
            from: 'test@example.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          };
          sgMail.send(msg);
          callback(null, user);
        })
        .catch(err => {
          callback(err);
        });
    },
    getUser(id, callback) {
      let result = {};
      User.findByPk(id).then(user => {
        if (!user) {
          callback(404);
        } else {
          result["user"] = user;
          Collaborator.scope({ method: ["collaboratorFor", id] })
            .findAll()
            .then(collaborator => {
              result["collaborator"] = collaborator;
              callback(null, result);
            })
            .catch(err => {
              callback(err);
            });
        }
      });
    },
}