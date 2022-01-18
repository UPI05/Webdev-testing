const db = require("../../../db.json");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (body) => {
    const { username, password } = body;

    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);

    body.password = hashPassword;

    db.users.push(body);

    db.users.forEach((user) => console.log(user));

    return {
      error: false,
      msg: "Success",
    };
  },
  login: () => {},
};
