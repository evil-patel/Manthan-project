const contactModel = require("../models/contactModel")
exports.showcontacts = async () => {
    let data;
    await contactModel.find()
        .then((d) => {
            data = d;
        })
        .catch((err) => {
            data = err;
        })
    return data
}
exports.Insertcontactdetails = async (o) => {
    let data = {};
    let newcontactdata = contactModel({
        name: o.name,
        email: o.email,
        message: o.message
    })
    await newcontactdata.save()
        .then((d) => {
            data.msg = "contactData uploaded";
            data.data = d;
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.DeleteContactinfoById = async (id) => {
    let data = {};
    await contactModel.findByIdAndDelete(id)
        .then((d) => {
            data.msg = "contact deleted"
            data.data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}
