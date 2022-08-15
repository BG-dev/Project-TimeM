const bcrypt = require("bcrypt");
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
    password: hashedPassword,
  };

  const user = await userIntegration.create(newUser);
  return user;
};

exports.login = async (userData) => {
  const isUserExists = await checkIsUserExists(userData.username);
  if (!isUserExists) throw new Error("This user no exists");

  const user = await userIntegration.getOneBy({
    username: userData.username,
  });

  const isMatch = await bcrypt.compare(userData.password, user.password);

  if (!isMatch) throw new Error("Password is incorrect");

  const token = user.generateAuthToken();

  return token;
};

async function checkIsUserExists(username) {
  const isExists = await userIntegration.getOneBy({ username });
  return !!isExists;
}

async function checkIsUserEmailExists(email) {
  const isExists = await userIntegration.getOneBy({ email });
  return !!isExists;
}
