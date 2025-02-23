const Users = require('../models/Users'); 
const Lowongan = require('../models/Lowongan'); 
const RegistrasiMagang = require('../models/RegistrasiMagang'); 
const DokumenPeserta = require('../models/DokumenPeserta');
const { sendSuccessResponse, sendErrorResponse } = require('../helper/ResponseHelper');

exports.getUser = async(req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findByPk(userId);

    if (!user) {
      return sendErrorResponse(res, 404, "User tidak ditemukan");
    }

    return sendSuccessResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.upload = async(req, res) => {
  try {
    const { userId } = req.params;
 
    const user = await Users.findByPk(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "User tidak ditemukan");
    }
 
    if (!req.file) {
      return sendErrorResponse(res, 400, "Tidak ada file yang diunggah");
    }
 
    const { jenis_dokumen } = req.body;
    if (!jenis_dokumen) {
      return sendErrorResponse(res, 400, "Jenis dokumen harus disediakan");
    }
 
    const dokumen = await DokumenPeserta.create({
      user_id: userId,
      jenis_dokumen,
      file_path: req.file.path,
    });

    return sendSuccessResponse(res, 200, "Upload successfully", dokumen);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.applyJob = async (req,res)=>{
  try {
    const userId = req.params.userId;
    const jobId = req.query.jobId;   

    if (!jobId) {
      return sendErrorResponse(res, 400, "Job id harus disediakan sebagai query parameter");
    } 
 
    const user = await Users.findByPk(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "User tidak ditemukan");
    }
 
    const job = await Lowongan.findByPk(jobId);
    if (!job) {
      return sendErrorResponse(res, 404, "Lowongan tidak ditemukan");
    }
 
    const registration = await RegistrasiMagang.create({
      user_id: userId,
      job_id: jobId, 
      status: "pending"
    });

    return sendSuccessResponse(res, 201, "Registrasi magang berhasil dibuat", registration);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error.message);
  }
};