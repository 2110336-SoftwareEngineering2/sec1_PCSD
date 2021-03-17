**We are P.C.S.D. (Pet Caring System Developer) currently developing PetidCare.**

- editUser in UserController
    - Receive changes in request body, send back bad request if user is not found or new username is taken 
    - Not accounted for empty input yet and something feels off

- transfer in UserController
    - Receive senderId, receiverId, and amount in request body, send back bad request if sender or receiver is not found or sender do not have enount balance

- Reserve_Caretaker.js in controllers [Need for verification]
    - This file is untested and has incredibly high chance of bugging