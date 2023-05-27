const router = require("express").Router()
const Student= require("../models/students");
const student = require("../data/students.json")

router.get("/students" , async (req,res) => {
    try{
        const page = parseInt(req.query.page) -1 || 0;
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "" ;
        let sort = req.query.sort || "marks"  ;
        let result = req.query.result || "All";
        
        const resultOptions = [
            "passed" ,
            "failed" 
        ];

        result === "All"
        ? (result = [...resultOptions])
         : (result = req.query.result.split(","));
         req.query.sort ? (sort = req.query.sort.split(",")) : (sort =[sort]);

         let sortBy = {};
         if(sort[1]){
            sortBy[sort[0]] = sort[1];
         } else {
            sortBy[sort[0]] = "asc"
         }

         const students = await  Student.find({name : {$regex: search, $options: "i"}})
         .where("result")
         .in([...result])
         .sort(sortBy)
         .skip(page * limit)
         .limit(limit);

         const total = await Student.countDocuments({
            result: { $in: [...result]},
            name: { $regex:search, $options: "i"},
         });

         const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            result: resultOptions,
            students,
         }
         res.status(200).json(response);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "internal server error"})
    }
})

// this code is used to inser student.json data into our database 

// const insertStudents = async () => {
//     try{
//         const data = await Student.insertMany(student);
//         return Promise.resolve(data)
//     } catch(err){
//         console.log(err);
//     }
// }
// insertStudents()
// .then((data) => console.log(data))
// .catch((err) => console.log(err))

module.exports = router