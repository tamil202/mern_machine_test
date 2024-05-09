const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const UserDetails = require("../model/userDetails");

const {
  getServer,
  register,
  loginuser,
  details,
  getAllDetails,
  deletedetail,
  updateDetails,
} = require("../controller/controller");

router.get("/", getServer);
router.post("/register", register);
router.post("/loginuser", loginuser);
router.get("/getAllDeatils", getAllDetails);
router.delete("/deletedetail/:userId", deletedetail);


////////////////////////////////////////////////////////////
// image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "upload";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
let value = "";
router.post("/image", upload.single("file"), (req, res) => {
  value = req.file;
  console.log(req.file);
});
// create user details user
router.post("/upload", async (req, res) => {
  const data = new Date();
  const year = data.getFullYear();
  const date = data.getDate();
  const month = data.getMonth();

  const { Name, Email, MobileNo, Designation, Gender, Course, image } =
    req.body;
  try {
    const finduser = await UserDetails.findOne({ Email: Email });
    if (finduser) {
      return res
        .status(400)
        .json({ status: 400, message: "Already Email exits" });
    } else {
      let data = {
        userId: Math.floor(10000 + Math.random() * 10000),
        Name: Name,
        Email: Email,
        MobileNo: MobileNo,
        Designation: Designation,
        Gender: Gender,
        Course: Course,
        createdAt: `${date}-${month}-${year}`,
        image: {
          imagename: value.originalname,
          data:fs.readFileSync(value.path),
          content: value.mimetype,
          size: value.size,
        },
      };
      console.log(data);
      await UserDetails.create(data);
      return res.status(201).json({ message: "Created" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
//  update
router.put("/update", async (req, res) => {
  let data = {
    userId: req.body.userId,
    Name: req.body.Name,
    Email: req.body.Email,
    MobileNo: req.body.MobileNo,
    Designation: req.body.Designation,
    Gender: req.body.Gender,
    Course: req.body.Course,
  };
  console.log(data);
  try {
    const getdetail = await UserDetails.findOne({
      userId: data.userId,
    });
    if (!getdetail) {
      return res.status(404).json({ message: "No data found" });
    }
    await UserDetails.updateMany(
      {
        userId: data.userId,
      },
      {
        $set: {
          Name: req.body.Name,
          Email: req.body.Email,
          MobileNo: req.body.MobileNo,
          Designation: req.body.Designation,
          Gender: req.body.Gender,
          Course: req.body.Course,
          image: {
            imagename: value.originalname,
            data: fs.readFileSync(value.path),
            content: value.mimetype,
            size: value.size,
          },
        },
      }
    );
    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
