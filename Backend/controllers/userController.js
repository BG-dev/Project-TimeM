// const { validateUser, validateNewUser } = require("./validators/userValidator");
const bcrypt = require("bcrypt");
const { findUserBy, addUser } = require("../integration/userIntegration");

async function createUser(newUserData) {
  //   const { error } = validateNewUser(newUserData);
  //   if (error) throw new Error(error.details[0].message);
  const isUsernameExists = await checkIsUserExists(newUserData.username);
  if (isUsernameExists) throw new Error("This username already exists");
  const isEmailExists = await checkIsUserEmailExists(newUserData.email);
  if (isEmailExists) throw new Error("This email already exists");

  const hashedPassword = await bcrypt.hash(newUserData.password, 12);
  const newUser = {
    username: newUserData.username,
    email: newUserData.email,
    password: hashedPassword,
  };

  const user = await addUser(newUser);
  return user;
}

async function loginUser(userData) {
  //   const { error } = validateUser(userData);
  //   if (error) throw new Error(error.details[0].message);

  const isUserExists = await checkIsUserExists(userData.username);
  if (!isUserExists) throw new Error("This user no exists");

  const user = await findUserBy({ username: userData.username });

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (!isMatch) throw new Error("Password is incorrect");

  const token = user.generateAuthToken();

  return token;
}

async function checkIsUserExists(username) {
  const isExists = await findUserBy({ username });
  return !!isExists;
}

async function checkIsUserEmailExists(email) {
  const isExists = await findUserBy({ email });
  return !!isExists;
}

module.exports = {
  createUser,
  loginUser,
};
