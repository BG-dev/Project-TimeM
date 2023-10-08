const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.getOne = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        return res.status(200).send({ user });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const isExistsUsername = await User.findOne({ username });
        const isExistsEmail = await User.findOne({ email });

        if (isExistsEmail || isExistsUsername)
            return res.status(400).send({
                message: "Username or email is already in use",
            });

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = {
            password: hashedPassword,
            username,
            email,
        };

        const user = await User.create({ ...newUser });
        return res.status(201).send({
            message: `User ${user.username} was created`,
        });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }).select("password");
        if (!user)
            return res
                .status(401)
                .json({ message: "Invalid username or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res
                .status(401)
                .json({ message: "Invalid username or password" });

        const token = user.generateAuthToken();

        return res
            .status(200)
            .send({ message: "The user has successfully logged in", token });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
