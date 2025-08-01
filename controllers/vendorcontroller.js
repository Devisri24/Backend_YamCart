const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');
dotEnv.config();
const secretkey = process.env.WhatIsYourName;

// Vendor Registration
const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        });

        await newVendor.save();
        res.status(201).json({ message: "Vendor registered successfully" });
        console.log("Registered");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Vendor Login
const vendorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ email });
        console.log(vendor);

        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid username or password credentials" });
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretkey, { expiresIn: "1h" });

        res.status(200).json({success : "Login successful",token, vendorId:vendor._id})
        console.log(email,"this is token",token);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Internal server error" });

    }
}
//         const vendorId = vendor._id;
//         let firmId = null;
//         let firmName = null;

//         if (vendor.firm && vendor.firm[0]) {
//             firmId = vendor.firm[0]._id;
//             firmName = vendor.firm[0].firmName;
//         }

//         res.status(200).json({
//             message: "User logged in successfully",
//             token,
//             vendorId,
//             firmId,
//             firmName
//         });
//         console.log(email, token, vendorId, firmId, firmName);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// // Get All Vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('firm');
        res.json({ vendors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get Vendor By ID
const getVendorById = async (req, res) => {
    const vendorId = req.params.vendorId;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
//         let firmId = null;
//         if (vendor.firm && vendor.firm[0]) {
//             firmId = vendor.firm[0]._id;
//         }

         return res.status(200).json({ vendor});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorById };

