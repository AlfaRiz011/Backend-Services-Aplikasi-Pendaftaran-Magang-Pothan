const multer = require('multer');
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) { 
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
    
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else { 
      cb(new Error('Hanya file PDF dan gambar yang diperbolehkan.'), false);
    }
  };
   
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }  
  });
  
  module.exports = {
    uploadSingle: upload.single('document')
  };
  