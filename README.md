**We are P.C.S.D. (Pet Caring System Developer) currently developing PetidCare.**

## API Lists
- User Route `/user`
    - Get all users: `GET /`
    - Get user by email: `POST /`
    - Get all user's email: `GET /emails`
    - Get user by email: `POST /email`
    - Get user by id: `GET /account/:id`
    - Register new user: `POST /register`
    - Add new caretaker's info: `POST /caretaker`
    - Get caretaker's info: `POST /caretaker/find`
    - Delete user by id: `DELETE account/:id`
    - Get all pets: `GET /pet`
    - Add new pet: `POST /pet`
    - Delete pet by pet id: `DELETE /pet`
    - Edit general user info: `POST /edit`
    - Edit caretaker's info: `POST /edit/caretaker`
    - Add amount to user's balance: `POST /topup`
    - Transfer amount from one user to another: `POST /transfer`
    - Storing profile picture: `POST /porfilepic`

---

- editUser in UserController
    - Receive changes in request body, send back bad request if user is not found or new username is taken 
    - Not accounted for empty input yet and something feels off

- transfer in UserController
    - Receive senderId, receiverId, and amount in request body, send back bad request if sender or receiver is not found or sender do not have enount balance

- Reserve_Caretaker.js in controllers [Need for verification]
    - This file is untested and has incredibly high chance of bugging