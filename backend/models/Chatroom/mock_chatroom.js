chatrooms_data = [
    {
        id: 1,
        members: [5, 7], // member's id
        messages: [
            {
                id: 123124124,
                sentTime: 12415884 ,// timestamp
                sender: 5,
                content: 'Hello number 7'
            },
            {
                id: 1251255125,
                sentTime: 12312425 ,
                sender: 6,
                content: 'Hi, number 5'
            },
        ]
    },
    {
        id: 2,
        members: [1, 2], // member's id
        messages: [
            {
                id: 123124124,
                sentTime: 12415884 ,// timestamp
                sender: 2,
                content: 'Hello number 1'
            },
            {
                id: 1251255125,
                sentTime: 12312425 ,
                sender: 1,
                content: 'Hoo rayyyyyy'
            },
        ]
    },
]

module.exports = {
    chatrooms: chatrooms_data,
};