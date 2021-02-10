// Password for mock up only please use hash password
users_data = [
    {
        id: 1,
        fistname: 'CaoCao',
        lastname: 'Chuxing',
        password: 'passwordtest',
        email: 'caocaokung@pcsd.co.th',
        phone: '08123124',
        image: 'asdaslkfaslfa.jpg',
        citizenid: 123124125123512,
        gender: 'male',
        address: {
            city: 'Rama9',
            province: 'Bangkok',
            country: 'Thailand'
        },
        roleinfo: {
            rolename: 'Caretaker',
            jobinfo: {
                servicetype: ['House sitting', 'Boarding', 'Day Care'],
                rateperhour: 12000,
                servicearea: {
                    city: 'Rama9',
                    province: 'Bangkok',
                    country: 'Thailand',
                },
                pettype: ['Dog', 'Cat', 'Bird'],
                description: 'Contrary to popular belief, Lorem Ipsum is not simply random text.\
                 It has roots in a piece of classical Latin literature from 45 BC, \
                 making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, \
                 looked up one of the more obscure Latin words, consectetur, \
                 from a Lorem Ipsum passage, and going through the cites of the word in classical literature, \
                 discovered the undoubtable source.',
                 available: ['Mon', 'Tue', 'Wed', 'Sun']
            }
        }
    },
    {
        id: 2,
        fistname: 'Emily',
        lastname: 'Clinton',
        password: 'passwordtest',
        email: 'emily1234@pcsd.co.th',
        phone: '08123124',
        image: 'asdaslkfaslfa.jpg',
        citizenid: 4324234923752389,
        gender: 'female',
        address: {
            city: 'Rama9',
            province: 'Bangkok',
            country: 'Thailand'
        },
        roleinfo: {
            rolename: 'Pet Owner',
            pets: [
                {
                    id: 123124124,
                    image: 'asdasdjfjj.jpg',
                    pettype: 'Dog',
                    name: 'Muffin',
                    breed: 'Chihuahua',
                    age: '10 months',
                    gender: 'female'
                },
            ]
        }
    },
]

module.exports = {
    users: users_data
};