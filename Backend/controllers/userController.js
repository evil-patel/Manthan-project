const UserModel = require("../models/userModel")
const sendVerificationEmail = require("./emailverification")
const sendForgetPasswordEmail = require("./forgetpasswordemail")
exports.Showusers = async () => {
    let data;
    await UserModel.find()
        .then((d) => {
            data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.Loginuser = async (o) => {
    let data = {};
    await UserModel.find({ email: o.email, password: o.password, verification: true })
        .then((d) => {
            if (d.length > 0) {
                data.msg = "success"
                data.data = d[0]
            }
            else {
                data.msg = "Fail"
            }
        })
    return data;
}

exports.Changepassword = async (o) => {
    let data = {};
    await UserModel.findOneAndUpdate({ email: o.email, password: o.oldpassword },
        { $set: { password: o.newpassword } })
        .then(() => {
            data.msg = "Password changed successfully!"
        })
        .catch(() => {
            data.msg = "Fail to change the password!"
        })
    return data;
}

exports.Forgetpassword = async (o) => {
    let data = {};
    const email = o.email;
    const user = await UserModel.findOne({ email });

    if (!user) {
        data.msg = "Email not found.";
    }
    else {
        const otp = Math.floor(1000 + Math.random() * 9000);
        user.otp = otp;
        await user.save();

        await sendForgetPasswordEmail(user.email, user._id, otp);
        data.msg = "OTP sent to registered email.";
    }
    return data;
};


exports.Inseruser = async (o) => {
    let data = {};
    let checkemail = await UserModel.find({ email: o.email })
    const otp = Math.floor(1000 + Math.random() * 9000);
    if (checkemail.length === 0) {
        let newUser = UserModel({
            name: o.name,
            address: o.address,
            email: (o.email).toLowerCase(),
            password: o.password,
            contact: o.contact,
            otp: otp,
            verification: false

        })
        let saved = await newUser.save()
        await sendVerificationEmail(saved.email, saved.id, saved.otp)
            .then(() => {
                data.msg = "record saved and email send for verifaction."
                data.id = saved._id;
            })
            .catch((err) => {
                data = err
            })
    }
    else {
        data.msg = "email alredy present!"
    }
    return data
}

exports.Updateuser = async (id, newdata) => {
    let data = {};
    await UserModel.findByIdAndUpdate(id, newdata)
        .then(() => {
            data.msg = "record updated"
        })
        .catch((err) => {
            data = err
        })
    return data
}
exports.setProfile = async (condition, newdata) => {
    let data = {}
    // console.log(condition,newdata)
    await UserModel.findOneAndUpdate(condition, newdata, { returnDocument: 'after' })
        .then((d) => {
            console.log("sdf" + d)
            data.msg = "Profile Updated"
            data.data = d
        })
        .catch((err) => {
            data = err;
            console.log(err)
        })
    return data
}

exports.setProfileimage = async (condition, newdata) => {
    let data = {}
    console.log(newdata)
    // console.log(condition,newdata)
    await UserModel.findOneAndUpdate(condition, newdata, { returnDocument: 'after' })
        .then((d) => {
            console.log("sdf" + d)
            data.msg = "Image updated"
            data.data = d
        })
        .catch((err) => {
            data = err;
            console.log(err)
        })
    return data
}


exports.UpdateuserPasswordByEmail = async (condition, newdata) => {
    let data = {};
    await UserModel.findOneAndUpdate(condition, { $set: newdata })
        .then((d) => {

            data.msg = "record updated"
            data.data = d
        })
        .catch((err) => {
            data = err;

        })
    return data
}

exports.Showuserbyemail = async (email) => {
    let data;
    await UserModel.find({ email: email })
        .then((d) => {
            data = d[0]
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.getUser = async (obj) => {
    let data = {};
    await UserModel.findById(obj)
        .then((d) => {
            data.msg = "record send"
            data.data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.DeleteUserById = async (id) => {
    let data = {};
    await UserModel.findByIdAndDelete(id)
        .then((d) => {
            data.msg = "record deleted"
            data.data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}