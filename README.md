<div align="start"> 
  <h1 align="center"> Capstone Project - Direktorat Jenderal Potensi Pertahanan </h1>
  <h2 align="center">Penerimaan Mahasiswa Magang Berbasis Android</h2>
  <p align="center">Universitas Pembangunan Nasional Veteran Jakarta</p>
</div>

<br/>

## BACKEND SERVICE DOCUMENTATION

## API URL 🔗

[Backend API]

```http://localhost:5000/```

## Cara untuk menjalankan di server lokal 💻

If you want to run this API Server on your local machine, you need to do this steps:

- Pertama, clone repository ini. git clone `https://github.com/AlfaRiz011/Backend-Services-Aplikasi-Pendaftaran-Magang-Pothan.git`

- Kedua, buka terminal dan arahkan ke direktori root proyek ini.

- Ketiga, jalankan XAMPP.

- Keempat, buat database dengan nama `penerimaan-magang`. 

- Kelima, donwload package dengan `npm install`

- Keenam, jalankan perintah `npm run dev` lalu tekan Enter.

- Terakhir, server akan berjalan pada alamat: `http://localhost:5000`.

# API Endpoints

## Auth 

### Check User

```POST /auth/check``` 

Endpoint untuk memeriksa apakah user dengan email tertentu sudah terdaftar sebelum proses registrasi.

#### Request Body
| Parameter   | Type     | Description            |
|------------|----------|-----------------------|
| `email`    | `string` | **Required**. Email yang akan diperiksa |
| `password` | `string` | **Required**. Password yang akan digunakan |

#### Responses
##### Success
**Status Code**: `200 OK`

**Response Body**:
```json
{
    "status": "success",
    "message": "User siap dibuat",
    "data": {
        "email": "example@gmail.com",
        "password": "securepassword"
    }
}
```

### Register

```POST /auth/register```

Endpoint untuk mendaftarkan user baru.

#### Request Body
| Parameter        | Type     | Description             |
|----------------|----------|------------------------|
| `nama`         | `string` | **Required**. Nama pengguna |
| `nim`          | `string` | **Required**. Nomor Induk Mahasiswa |
| `email`        | `string` | **Required**. Email pengguna |
| `password`     | `string` | **Required**. Password pengguna |
| `universitas`  | `string` | **Required**. Universitas pengguna |
| `no_telp`      | `string` | **Required**. Nomor telepon pengguna |
| `tanggal_lahir`| `string` | **Required**. Tanggal lahir pengguna (format: YYYY-MM-DD) |
| `alamat`       | `string` | **Required**. Alamat pengguna |
| `status`       | `string` | **Required**. Status pengguna (default: nonaktif) |

#### Responses
##### Success
**Status Code**: `201 Created`

**Response Body**:
```json
{
    "status": "success",
    "message": "Berhasil membuat User",
    "data": {
        "created_at": "2025-02-20",
        "id": 1,
        "email": "example@gmail.com",
        "password": "$2b$10$jQs0iN",
        "nama": "John Doe",
        "nim": "123456789",
        "universitas": "Universitas A",
        "no_telp": "08123456789",
        "tanggal_lahir": "1990-01-01",
        "alamat": "Jl. Contoh No. 1",
        "status": "nonaktif"
    }
}
```

### Login

```POST /auth/login```

Endpoint untuk login user dan mendapatkan token JWT.

#### Request Body
| Parameter   | Type     | Description             |
|------------|----------|------------------------|
| `email`    | `string` | **Required**. Email pengguna |
| `password` | `string` | **Required**. Password pengguna |

#### Responses
##### Success
**Status Code**: `200 OK`

**Response Body**:
```json
{
    "status": "success",
    "message": "Login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cC",
        "user": {
            "id": 1,
            "nama": "John Doe",
            "nim": "123456789",
            "email": "example@gmail.com",
            "password": "$2b$10$jQs0iN",
            "universitas": "Universitas A",
            "no_telp": "08123456789",
            "tanggal_lahir": "1990-01-01",
            "alamat": "Jl. Contoh No. 1",
            "status": "nonaktif",
            "created_at": "2025-02-20"
        }
    }
}
```

##User

### Get User

```GET /user/:userId```

Mendapatkan data user berdasarkan ID pengguna.

#### Parameters
| Parameter | Type     | Description       |
|-----------|----------|----------------|
| `userId`  | `string` | **Required**. ID pengguna yang akan dicari |

#### Response
```json
{
  "status": "success",
  "message": "User fetched successfully",
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-03-06"
  }
}
```

---

### Upload Document

```POST /user/upload/:userId?jenis_dokumen=ktp```

Mengunggah dokumen pengguna berdasarkan jenis dokumen.

#### Parameters
| Parameter       | Type     | Description                    |
|----------------|----------|--------------------------------|
| `userId`       | `string` | **Required**. ID pengguna       |
| `jenis_dokumen`| `string` | **Required**. Jenis dokumen (query parameter) |
| `file`         | `file`   | **Required**. File dokumen     |

#### Response
```json
{
  "status": "success",
  "message": "Upload successfully",
  "data": {
    "id": 1,
    "user_id": "123",
    "jenis_dokumen": "ktp",
    "file_path": "uploads/file.pdf",
    "created_at": "2025-03-06"
  }
}
```

---

### Apply Job

```POST /user/apply/:userId?jobId=456```

Mendaftarkan user ke lowongan magang.

#### Parameters
| Parameter | Type     | Description                        |
|-----------|----------|-----------------------------------|
| `userId`  | `string` | **Required**. ID pengguna        |
| `jobId`   | `string` | **Required**. ID lowongan (query parameter) |

#### Response
```json
{
  "status": "success",
  "message": "Registrasi magang berhasil dibuat",
  "data": {
    "id": 10,
    "user_id": "123",
    "job_id": "456",
    "status": "pending",
    "created_at": "2025-03-06"
  }
}
```

## Document

### Get User Documents

```GET document/:userId```

Ambil seluruh dokumen yang ada di user.

#### Parameters
| Parameter | Type     | Description      |
|-----------|----------|----------------|
| `userId` | `string` | **Required**. User ID to fetch documents |

#### Response
```json
{
  "status": "success",
  "message": "User Document fetched successfully",
  "data": [
    {
      "id": 1,
      "user_id": "123",
      "file_path": "uploads/file.pdf",
      "status": "pending",
      "created_at": "2025-03-06"
    }
  ]
}
```

### Get All Pending Documents

```GET document/```

ambil seluruh dokumen dengan status  `pending`.

#### Response
```json
{
  "status": "success",
  "message": "User Document fetched successfully",
  "data": [
    {
      "id": 1,
      "user_id": "123",
      "file_path": "uploads/file.pdf",
      "status": "pending",
      "created_at": "2025-03-06",
      "User": {
        "id": "123",
        "nama": "John Doe"
      }
    }
  ]
}
```

### Get Verified Document by ID

```GET document/dokum/:dokumId```

Ambil dokumen dengan ID dokumen.

#### Parameters
| Parameter | Type     | Description         |
|-----------|----------|-------------------|
| `dokumId` | `string` | **Required**. Document ID to fetch |

#### Response
```json
{
  "status": "success",
  "message": "Document fetched successfully",
  "data": {
    "id": 1,
    "user_id": "123",
    "file_path": "uploads/file.pdf",
    "status": "pending",
    "created_at": "2025-03-06",
    "User": {
      "id": "123",
      "nama": "John Doe"
    }
  }
}
```

### Verify Document

```PUT document/verif/dokum/:dokumId```

Menyetujui dengan mengubah status dokumen `diterima`.

#### Parameters
| Parameter | Type     | Description       |
|-----------|----------|----------------|
| `dokumId` | `string` | **Required**. Document ID to verify |

#### Response
```json
{
  "status": "success",
  "message": "Document accepted",
  "data": {
    "id": 1,
    "user_id": "123",
    "file_path": "uploads/file.pdf",
    "status": "diterima",
    "created_at": "2025-03-06"
  }
}
```

### Reject Document

```PUT document/tolak/dokum/:dokumId```

Menolak dokumen dengan memberikan status `ditolak`, dan hapus di server.

#### Parameters
| Parameter | Type     | Description       |
|-----------|----------|----------------|
| `dokumId` | `string` | **Required**. Document ID to reject |

#### Response
```json
{
  "status": "success",
  "message": "Document rejected",
  "data": {
    "id": 1,
    "user_id": "123",
    "file_path": "uploads/file.pdf",
    "status": "ditolak",
    "created_at": "2025-03-06"
  }
}
```

## Jobs

### Get All Jobs

```GET /job/```  
Mendapatkan semua lowongan pekerjaan.

#### Response
```json
{
  "status": "success",
  "message": "Lowongan fetched successfully",
  "data": [
    {
      "id": 1,
      "posisi": "Frontend Developer",
      "jabatan": "Internship",
      "periode_magang": "3 bulan",
      "deskripsi": "Membantu pengembangan aplikasi web",
      "closed_at": "2025-04-01"
    }
  ]
}
```

### Get Job By ID

```GET /job/:jobId```  
Mendapatkan informasi lowongan berdasarkan ID.

#### Parameters
| Parameter | Type     | Description       |
|-----------|----------|----------------|
| `jobId`   | `string` | **Required**. ID Lowongan |

#### Response
```json
{
  "status": "success",
  "message": "Job fetched successfully",
  "data": {
    "id": 1,
    "posisi": "Frontend Developer",
    "jabatan": "Internship",
    "periode_magang": "3 bulan",
    "deskripsi": "Membantu pengembangan aplikasi web",
    "closed_at": "2025-04-01"
  }
}
```

### Get Registration by User ID

```GET /job/regis/:userId```  
Mendapatkan daftar registrasi magang berdasarkan User ID.

#### Parameters
| Parameter | Type     | Description       |
|-----------|----------|----------------|
| `userId`  | `string` | **Required**. User ID |

#### Response
```json
{
  "status": "success",
  "message": "Registrasi fetched successfully",
  "data": [
    {
      "id": 101,
      "user_id": "123",
      "job_id": "1",
      "status": "pending",
      "created_at": "2025-03-06"
    }
  ]
}
```

### Verify Registration

```PUT /job/verif/regis/:regisId```  
Verifikasi pendaftaran magang dan mengubah status menjadi `diterima`.

#### Parameters
| Parameter | Type     | Description       |
|-----------|----------|----------------|
| `regisId` | `string` | **Required**. Registration ID |

#### Response
```json
{
  "status": "success",
  "message": "Registrasi disetujui",
  "data": {
    "id": 101,
    "user_id": "123",
    "job_id": "1",
    "status": "diterima",
    "created_at": "2025-03-06"
  }
}
```

### Reject Registration

```PUT /job/tolak/regis/:regisId```  
Menolak pendaftaran magang dengan memberikan alasan.

#### Parameters
| Parameter        | Type     | Description              |
|----------------|----------|-----------------------|
| `regisId`      | `string` | **Required**. Registration ID |
| `alasan_penolakan` | `string` | Reason for rejection |

#### Response
```json
{
  "status": "success",
  "message": "Registrasi ditolak",
  "data": {
    "id": 101,
    "user_id": "123",
    "job_id": "1",
    "status": "ditolak",
    "alasan_penolakan": "Dokumen tidak lengkap",
    "created_at": "2025-03-06"
  }
}
```

### Create Job

```POST /job/make```  
Membuat lowongan magang baru.

#### Parameters
| Parameter       | Type     | Description           |
|----------------|----------|-------------------|
| `posisi`       | `string` | **Required**. Nama posisi |
| `jabatan`      | `string` | **Required**. Jabatan |
| `periode_magang` | `string` | **Required**. Periode magang |
| `deskripsi`    | `string` | **Required**. Deskripsi pekerjaan |
| `closed_at`    | `string` | **Required**. Tanggal penutupan |

#### Response
```json
{
  "status": "success",
  "message": "Lowongan berhasil dibuat",
  "data": {
    "id": 2,
    "posisi": "Backend Developer",
    "jabatan": "Internship",
    "periode_magang": "3 bulan",
    "deskripsi": "Membantu pengembangan API",
    "closed_at": "2025-05-01"
  }
}
```

## 📌 Author
Developer dan Dokumentasi oleh [Alfa Rizqi](https://www.linkedin.com/in/alfa-rizqi)   
Universitas Pembangunan Nasional Veteran Jakarta  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Profile-blue?logo=linkedin)](https://www.linkedin.com/in/alfa-rizqi)


