This is how you invoke this in graphiql

mutation registerUser($userDetails: UserInput!) {
  registerUser(userDetails: $userDetails) {
    Id,
    firstName,
    lastName,
    email,
    __typename
  }
}

Variables section
{
  "userDetails": {
   "Id": "1",
    "firstName": "a",
    "lastName": "b",
    "email": "a@b"
  }
}