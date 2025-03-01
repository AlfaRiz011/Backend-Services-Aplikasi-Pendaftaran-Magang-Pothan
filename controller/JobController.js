const Lowongan = require('../models/Lowongan');
const PesertaAktif = require('../models/PesertaAktif');
const RegistrasiMagang = require('../models/RegistrasiMagang');
const Users = require('../models/Users'); 
const { sendSuccessResponse, sendErrorResponse } = require('../helper/ResponseHelper');

exports.getAllJob = async (req, res) => {
  try {
    const jobs = await Lowongan.findAll();
    return sendSuccessResponse(res, 200, 'Lowongan fetched successfully', jobs);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.getJobFull = async (req, res) => {
  try {
    const peserta = await PesertaAktif.findAll({
      include: [
        { model: Users },
        { model: Lowongan }
      ]
    });
    return sendSuccessResponse(res, 200, 'Peserta fetched successfully', peserta);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.getAllRequest = async (req, res) => {
  try {
    const registrasi = await RegistrasiMagang.findAll({
      where: { status: "pending" },
      include: [{ model: Users }, { model : Lowongan}]
    });

    return sendSuccessResponse(res, 200, 'Registrasi fetched successfully', registrasi);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.getAllJob = async (req, res) => {
  try {
    const jobs = await Lowongan.findAll();
    return sendSuccessResponse(res, 200, 'Lowongan fetched successfully', jobs);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.getJobById = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const job = await Lowongan.findByPk(jobId);

    if (!job) {
      return sendErrorResponse(res, 404, "Job not found");
    }

    return sendSuccessResponse(res, 200, "Job fetched successfully", job);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.getRegisJob = async (req, res) => {
  const userId = req.params.userId;
  try {
    const registrasi = await RegistrasiMagang.findAll({
      where: { user_id: userId },
      include: [{ model: Users }, { model : Lowongan}]
    });
    return sendSuccessResponse(res, 200, 'Registrasi fetched successfully', registrasi);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.getVerifRegis = async (req, res) => {
  const regisId = req.params.regisId;
  try {
    const registrasi = await RegistrasiMagang.findAll({
      where: { id: regisId },
      include: [
        { model: Users },
        { model: Lowongan }
      ]
    });
    if (!registrasi || registrasi.length === 0) {
      return sendErrorResponse(res, 404, "Registrasi tidak ditemukan");
    }
    return sendSuccessResponse(res, 200, 'Registrasi fetched successfully', registrasi);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.verifRegis = async (req, res) => {
  try {
    const regisId = req.params.regisId;
    const registrasi = await RegistrasiMagang.findByPk({
      where: { id: regisId },
      include: [
        { model: Users },
        { model: Lowongan }
      ]
    });

    if (!registrasi) {
      return sendErrorResponse(res, 404, "Registrasi tidak ditemukan");
    }
 
    registrasi.status = "disetujui";
    await registrasi.save();
 
    const user = await Users.findByPk(registrasi.user_id);
    if (user) {
      user.status = "aktif";
      await user.save();
    }
 
    const pesertaAktif = await PesertaAktif.create({
      user_id: registrasi.user_id,
      job_id: registrasi.job_id,
    });

    return sendSuccessResponse(res, 200, "Registrasi disetujui", registrasi);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

exports.tolakRegis = async (req, res) => {
  try {
    const regisId = req.params.regisId;
    const { alasan_penolakan } = req.body;
    const registrasi = await RegistrasiMagang.findByPkfindByPk({
      where: { id: regisId },
      include: [
        { model: Users },
        { model: Lowongan }
      ]
    });
    
    if (!registrasi) {
      return sendErrorResponse(res, 404, "Registrasi tidak ditemukan");
    }
   
    registrasi.status = "ditolak";
    registrasi.alasan_penolakan = alasan_penolakan || "Tidak ada alasan diberikan";
    await registrasi.save();

    return sendSuccessResponse(res, 200, "Registrasi ditolak", registrasi);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
}; 

exports.makeJob = async (req, res) => {
  try {
    const { posisi, jabatan, periode_magang, deskripsi, closed_at } = req.body;
 
    if (!posisi || !jabatan || !periode_magang || !deskripsi || !closed_at) {
      return sendErrorResponse(res, 400, "Semua field wajib diisi");
    }
 
    const newJob = await Lowongan.create({
      posisi,
      jabatan,
      periode_magang,
      deskripsi,
      closed_at 
    });

    return sendSuccessResponse(res, 201, "Lowongan berhasil dibuat", newJob);
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
  }
};

