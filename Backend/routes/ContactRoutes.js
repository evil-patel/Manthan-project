const express = require("express")
const contactController = require("../controllers/ContactController")
const router = express.Router()


router.get("/", async (req, res) => {
    let data = await contactController.showcontacts()
    res.send(data)
})

router.post("/", async (req, res) => {
    let obj = { name: req.body.name, email: req.body.email, message: req.body.message }
    let d = await contactController.Insertcontactdetails(obj)
    res.send(d)
})

router.delete("/:id", async (req, res) => {
    let id = req.params.id
    let data = await contactController.DeleteContactinfoById(id)
    res.send(data)
})

module.exports = router