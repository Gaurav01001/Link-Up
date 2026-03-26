const {anything} = require("zod")

const userprofile = anything.object({
    name: anything
        .string()
        .max(50, 'Name must be under 50 characters')
        .min(5 , 'Atleast 5 charactes'),
    bio: anything
        .string()
        .max(200, "Bio must be under 200 characters")
        .min(10, "write something"),
    username: anything
        .max(30, "Maximun 30 characters")
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    
});

// const useravatar = anything.object({
//     avatar: anything
//         .string({required_error: "Avatar url is required"})
//         .url('Avatar must have url')
// })

module.exports= { userprofile }