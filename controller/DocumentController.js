const DokumenPeserta = require('../models/DokumenPeserta');
const { sendSuccessResponse, sendErrorResponse } = require('../helper/ResponseHelper');
 
exports.getUserDokum = async (req, res) => {
    try {
      const userId = req.params.userId;
      const dokumenList = await DokumenPeserta.findAll({
        where: { user_id: userId }
      });
  
      return sendSuccessResponse(res, 200, 'User Document fetched successfully', dokumenList);
    } catch (error) { 
      return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
    }
  };

exports.getVerifDokum = async (req, res) => {
    try {
        const dokumId = req.params.dokumId;
        const dokumen = await DokumenPeserta.findByPk(dokumId);
    
        if (!dokumen) {
          return sendErrorResponse(res, 404, "Dokumen tidak ditemukan");
        }

        return sendSuccessResponse(res, 200, 'Document fetched successfully', dokumen);
    } catch (error) { 
        return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
    }
};

exports.verifDokum = async (req, res) => {
    try {
        const dokumId = req.params.dokumId;
        const dokumen = await DokumenPeserta.findByPk(dokumId);
    
        if (!dokumen) {
          return res.status(404).json({ message: "Dokumen tidak ditemukan" });
        }
        
       dokumen.status = "diterima"; 
        await dokumen.save();

        return sendSuccessResponse(res, 200, 'Document accepted', dokumen);
    } catch (error) {
      return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
    }
};

exports.tolakDokum = async (req, res) =>{
    try {
        const dokumId = req.params.dokumId;
        const dokumen = await DokumenPeserta.findByPk(dokumId);
    
        if (!dokumen) {
          return sendErrorResponse(res, 404, "Dokumen tidak ditemukan");
        }
        
       dokumen.status = "ditolak"; 
        await dokumen.save();
    
        return sendSuccessResponse(res, 200, 'Document rejected', dokumen);
    } catch (error) {
      return sendErrorResponse(res, 500, "Terjadi kesalahan server", error);
    }
};

