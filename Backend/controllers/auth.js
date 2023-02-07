const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userIntegration = require("../integration/user");

exports.create = async (userData) => {
  const isUsernameExists = await checkIsUserExists(userData.username);
  if (isUsernameExists) throw new Error("This username already exists");
  const isEmailExists = await checkIsUserEmailExists(userData.email);
  if (isEmailExists) throw new Error("This email already exists");

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const newUser = {
    username: userData.username,
    email: userData.email,
    role: "user",
    password: hashedPassword,
  };

  const user = await userIntegration.create(newUser);
  return user;
};

exports.login = async (userData) => {
  const isUserExists = await checkIsUserExists(userData.username);
  if (!isUserExists) throw new Error("This user no exists");

  const user = await userIntegration.getByUsername(userData.username);

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (!isMatch) throw new Error("Password is incorrect");

  const token = generateAuthToken(user.userId, user.username);

  return token;
};

function generateAuthToken(id, username) {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

async function checkIsUserExists(username) {
  const isExists = await userIntegration.getByUsername(username);
  return !!isExists;
}

async function checkIsUserEmailExists(email) {
  const isExists = await userIntegration.getByEmail(email);
  return !!isExists;
}
