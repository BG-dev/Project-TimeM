const bcrypt = require('bcrypt');
const User = require('../models/User');
const ContactRequest = require('../models/ContactRequest');

exports.addAvatar = async (req, res) => {
    console.log('File: ', req.file);
    await User.findByIdAndUpdate('64fe30b7288586ed04bc7c4f', { avatar: req.file.filename }, {});
    return res.status(200).send({ message: 'Avatar was added' });
};

exports.getOne = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        return res.status(200).send({ user });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.getAll = async (req, res) => {
    const search = req.query.search;
    try {
        const users = await User.find({
            _id: { $ne: req.user.id, $nin: req.user.contacts },
            username: { $regex: search, $options: 'i' },
        });
        return res.status(200).send({ users });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const contacts = (
            await User.findById(req.user.id).select('contacts').populate('contacts', '_id username')
        ).contacts;
        return res.status(200).send({ contacts });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err });
    }
};

exports.isContact = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(req.user.id);
        const isContact = user.contacts.indexOf(userId) > -1;
        return res.status(200).send({ isContact });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: err });
    }
};

exports.deleteContact = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndUpdate(req.user.id, { $pull: { contacts: id } }, {});
        await User.findByIdAndUpdate(id, { $pull: { contacts: req.user.id } }, {});
        return res.status(200).send({
            message: 'The user has been successfully deleted from contacts',
        });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const requests = await ContactRequest.find({
            recipient: req.user.id,
        }).populate('sender');
        return res.status(200).send({ requests });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.sendRequest = async (req, res) => {
    const { recipientId } = req.body;
    const contactRequestData = {
        sender: req.user.id,
        recipient: recipientId,
    };
    try {
        await ContactRequest.create(contactRequestData);
        return res.status(200).send({ message: 'The request has been sent' });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.acceptRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        const contactRequest = await ContactRequest.findById(requestId);
        await User.findByIdAndUpdate(
            contactRequest.sender,
            {
                $push: {
                    contacts: contactRequest.recipient,
                },
            },
            {
                upsert: true,
            },
        );
        await User.findByIdAndUpdate(
            contactRequest.recipient,
            {
                $push: {
                    contacts: contactRequest.sender,
                },
            },
            {
                upsert: true,
            },
        );
        await ContactRequest.findByIdAndDelete(requestId);
        return res.status(200).send({ message: 'The request has been accepted' });
    } catch (err) {
        return res.status(500).send({ error: err });
    }
};

exports.denyRequest = async (req, res) => {
    const { requestId } = req.body;
    try {
        await ContactRequest.findByIdAndDelete(requestId);
        return res.status(200).send({ message: 'The request has been denied' });
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
                message: 'Username or email is already in use',
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
        const user = await User.findOne({ username }).select('password');
        if (!user) return res.status(401).json({ message: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });

        const token = user.generateAuthToken();

        return res.status(200).send({ message: 'The user has successfully logged in', token });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};
