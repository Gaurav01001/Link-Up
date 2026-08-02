const {
  sendMessage: sendMessageService,
  getConversation,
  getConversations: getConversationsService
} = require("../services/message.service");

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    //🔹 senderId
    //Comes from authenticated JWT user.

    const { receiverId, content } = req.body;
    const message = await sendMessageService(senderId, receiverId, content);
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

const getConversationMessages =
  async (req, res) => {

    try {

      // logged-in user
      const userId = req.user.id;

      // person we are chatting with
      const targetUserId =
        req.params.userId;

      const messages =
        await getConversation(
          userId,
          targetUserId
        );

      res.status(200).json({
        success: true,
        data: messages,
      });

    } catch (error) {

      res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  };

const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const conversations = await getConversationsService(userId);
    return res.status(200).json({
      success: true,
      message: "conversation fetched successfully",
      data: conversations
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })

  }
}
module.exports = {
  sendMessage,
  getConversationMessages,
  getConversations
}