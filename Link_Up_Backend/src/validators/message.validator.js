const { z } = require("zod");

const sendMessageSchema = z.object({
    receiverId: z.string().uuid("Invalid Receiver Id"),
    content: z.string()
        .min(1, "message cannot be empty")
        .max(1000, "Message too long bro!"),
})
module.exports = {
    sendMessageSchema
}
