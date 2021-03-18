**We are P.C.S.D. (Pet Caring System Developer) currently developing PetidCare.**

## API Lists
- User ("/user")
    - GET ("/")
    - POST ("/")
    - GET ("/userinfo")
    - GET ("/emails")
    - POST ("/email")
    - GET ("/account/:id")
    - POST ("/register")
    - POST ("/caretaker")
    - POST ("/caretaker/find")
    - GET ("/caretaker")
    - DELETE ("account/:id")
    - GET ("/pet")
    - POST ("/pet")
    - DELETE ("/pet")
    - POST ("/edit")
    - POST ("/edit/caretaker")
    - POST ("/topup")
    - POST ("/transfer")
    - GET ("transfer")
    - POST ("/porfilepic")

---

- editUser in UserController
    - Receive changes in request body, send back bad request if user is not found or new username is taken 
    - Not accounted for empty input yet and something feels off

- transfer in UserController
    - Receive senderId, receiverId, and amount in request body, send back bad request if sender or receiver is not found or sender do not have enount balance

- Reserve_Caretaker.js in controllers [Need for verification]
    - This file is untested and has incredibly high chance of bugging