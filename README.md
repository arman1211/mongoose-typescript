# Execute this application locally:

- clone the code from github

```git
   git clone https://github.com/arman1211/mongoose-typescript
```

- Then install the packages with `npm install`
- Run the application in development Environment : `start:dev` or `ts-node-dev --respawn --transpile-only src\\server.ts`
- Run the application in production Environment : `start:prod` or `node dist\\server.js`
- Build the Application with `npm run build`

# Used Technologies for the application:

- TypeScript
- Express
- Mongoose
- Cors
- Dotenv
- Bcrypt
- Eslint
- Prettier
- Joi

# Api End points to run this application properly :

- ## Create new User:

  - method: `POST`
  - route: `/api/users`

  # sample data

```json
{
  "userId": "number",
  "username": "string",
  "password": "string",
  "fullName": {
    "firstName": "string",
    "lastName": "string"
  },
  "age": "number",
  "email": "string",
  "isActive": "boolean",
  "hobbies": ["string", "string"],
  "address": {
    "street": "string",
    "city": "string",
    "country": "string"
  }
}
```

# sample response

```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    }
  }
}
```

- ## Get All Users:

  - method: `GET`
  - route: `/api/users`

- ## Get Single User By `userId`:

  - method: `GET`,
  - route: `/api/users/:userId`,
  - params: pass `userId` as params

- ## Delete User with `userId`:

  - method: `delete`,
  - route: `/api/users/:userId/`
  - params: pass `userId` as params

- ## Create an order on user object By `userId`:

  - method: `POST`,
  - route: `/api/users/:userId/orders`
  - params: pass `userId` as params

- ## Get user all orders by `userId`:

  - method: `GET`
  - route: `/api/users/:userId/orders/`
  - params: pass `userId` as params

## github link

```git
   https://github.com/arman1211/mongoose-typescript
```

## vercel link

```
    https://assignment-mongoose.vercel.app/
```
