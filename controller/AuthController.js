const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users'); 
const { sendSuccessResponse, sendSuccessResponseLogin, sendErrorResponse } = require('../helper/ResponseHelper');
const dotenv = require('dotenv');
dotenv.config();

exports.checkUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return sendErrorResponse(res, 400, 'Email dan password wajib diisi');
        }

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return sendErrorResponse(res, 400, 'User sudah terdaftar', { email, password });
        }

        return sendSuccessResponse(res, 200, 'User siap dibuat', { email, password });

    } catch (error) {
        return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, ...otherData} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            email,
            password: hashedPassword,
            ...otherData
        });

        sendSuccessResponse(res, 201, "Berhasil membuat User", newUser);
    } catch (error) {
        return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email } });

        const account = user;

        if (!account) {
            return sendErrorResponse(res, 401, 'No account found');
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return sendErrorResponse(res, 401, 'Password Invalid');
        }

        const id = account.id
        const token = jwt.sign(
            { id, email: account.email, }
            , process.env.JWT_SECRET
            ,{ expiresIn: '100h' }
        );
        
        sendSuccessResponseLogin(res, 200, 'Login successful', token, account);
    } catch (error) {
        return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
    }
};
