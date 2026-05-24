const {searchUsers} = require("../services/search.service")

const searchUsersController = async(req, res)=> {
    try{
        const query = req.query.q;
        const currentUserId = req.user.id;
        if(!query){
            return res.status(400).json({message: 
                "Search query required"
            })
        }
        const users = await searchUsers(query, currentUserId);
        res.status(200).json({
            success: true,
            data: users
        })
    }catch(err){
        res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {
    searchUsersController
}