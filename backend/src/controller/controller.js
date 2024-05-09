const bcrypt = require("bcrypt");
const User = require("../model/dbs");
const UserDetails = require("../model/userDetails");

module.exports.getServer = (req, res) => {
  res.status(200).json({ message: "welcome from server" });
};

// user create
module.exports.register = async (req, res) => {
  let userRegisterDataObj = {
    userId: Math.floor(10000 + Math.random() * 10000),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    createdAt: new Date(),
  };
  try {
    const finduser = await User.findOne({ email: userRegisterDataObj.email });
    if (finduser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(
        userRegisterDataObj.password,
        10
      );
      userRegisterDataObj.password = hashedPassword;
      await User.create(userRegisterDataObj);
      return res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login user
module.exports.loginuser = async (req, res) => {
  let userlogindata = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const finduser = await User.findOne({ email: userlogindata.email });
    if (finduser) {
      const isPasswordMatch = await bcrypt.compare(
        userlogindata.password,
        finduser.password
      );
      if (isPasswordMatch) {
        const { password, ...result } = finduser;
        console.log(result);
        return res
          .status(200)
          .json({ message: "Login successful", user: result });
      } else {
        return res.status(400).json({ message: "Invalid email or password" });
      }
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get user details
module.exports.getAllDetails = async (req, res) => {
  try {
    const allDetails = await UserDetails.find({});
    if (!allDetails || allDetails.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    return res.status(200).json({ message: allDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// delete by id
module.exports.deletedetail = async (req, res) => {
  const userId = req.params.userId;
  try {
    const getdetail = await UserDetails.findOne({
      userId: userId,
    });
    if (!getdetail) {
      return res.status(404).json({ message: "No data found" });
    }
    await UserDetails.deleteOne({
      userId: userId,
    });
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

