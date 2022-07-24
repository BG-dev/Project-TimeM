const { validateUser, validateNewUser } = require("./validators/userValidator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  findUser,
  findUserByUsername,
  createUser,
} = require("../integration/userIntegration");

async function addUser(newUserData) {
  const { error } = validateNewUser(newUserData);
  if (error) throw new Error(error.details[0].message);

  const candidate = await findUser(newUserData);
  if (candidate)
    throw new Error("User with this username or email already exists");

  const hashedPassword = await bcrypt.hash(newUserData.password, 12);
  const newUser = {
    username: newUserData.username,
    email: newUserData.email,
    password: hashedPassword,
  };

  const user = await createUser(newUser);
  return user;
}

async function loginUser(userData) {
  const { error } = validateUser(userData);
  if (error) throw new Error(error.details[0].message);

  const user = await findUserByUsername(userData.username);

  if (!user) throw new Error("This user no exists");

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (!isMatch) throw new Error("Password is incorrect");

  const token = user.generateAuthToken();

  return token;
}

module.exports = {
  addUser,
  loginUser,
};
