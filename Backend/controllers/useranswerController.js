const useranswerModel = require("../models/useranswerModel")

exports.Showuseranswers = async () => {
    let data;
    await useranswerModel.find()
        .then((d) => {
            data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.ShowuseranswersByQuestion = async (question_id) => {
    let data = {};
    try {
        const result = await useranswerModel.aggregate([
            {
                $match: { question_id: question_id }
            },
            {
                $addFields: {
                    userObjectId: { $toObjectId: "$user_id" }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userObjectId",
                    foreignField: "_id",
                    as: "user_data"
                }
            },
            {
                $unwind: "$user_data"
            },
            {
                $project: {
                    _id: 1,
                    question_id: 1,
                    answer: 1,
                    postdate: 1,
                    user_id: "$user_data._id",
                    user_name: "$user_data.name",
                    email: "$user_data.email"
                }
            }
        ]);

        data = result;
    } catch (err) {
        console.error("Aggregation error:", err);
        data = { msg: "Internal Server Error" };
    }
    return data;
};


exports.InseruserAnswer = async (o) => {
    let data = {};
    let newAnswer = useranswerModel({
        user_id: o.user_id,
        question_id: o.question_id,
        answer: o.answer
    })
    await newAnswer.save()
        .then((d) => {
            data.msg = "Answer Saved";
            data.data = d;
            
        })
        .catch((err) => {
            data = err
        })
    return data
}

exports.DeleteuserAnswer = async (id) => {
    let data = {};
    await useranswerModel.findByIdAndDelete(id)
        .then((d) => {
            data.msg = "record deleted"
            data.data = d
        })
        .catch((err) => {
            data = err
        })
    return data
}