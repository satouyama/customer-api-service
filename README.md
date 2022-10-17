## Architecture
[![N|Solid](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)](https://nodesource.com/products/nsolid)
Architecture is based in the clean architecture concepts adapted to our environment and necessities.

if you’re not familiar with this architecture, the best study source is the article by Robert C. Martin (aka Uncle Bob).
# Domain layer
Responsible for all business entities and system interfaces.
We group the entities, enums and interfaces/protocols

 - domain
     - entities
     - enums
     - interfaces


# Application layer
Responsible for having all the business rules of the application. Classes must be pure, without implementing frameworks or libs. The idea that it's 
easy to use and easy to test.

 - app
   - usecases
     - user-example.usecase

# Use-Cases
Every business implementation will be here, any kind of action for other services or in the database, for example, create, edit, list.
The names of the use-cases should always initiate with a verb (Get, List, Create, Delete, Update, Approve, etc), and also have the suffix U
seCase, example: GetActiveUserUseCaseRequest

# Frameworks layer
Responsible for containing everything that is external to the application such as frameworks and libs, for example, database, http requests, 
encryptors, cache and loggers.


## Installation
# Set up locally

Install dependencies:

```
npm install
```

Create your own env file:

```
cp .env.example .env
```


Spin up local environment (hot reloading included):

```
# for nest app
npm run start:dev

# for docker
docker compose up
```

after docker is ready, you can use API in http://localhost:3000.
