This is the simple one to invoke it through the lambda console.

{
  "key3": "value3",
  "key2": "value2",
  "key1": "value1",
  "query": "{ShoppingPath(userId: \"user1\"){name}}"
}

If you are sending this request from the browser through a get it will be something like this
https://ebn2768gd0.execute-api.us-east-1.amazonaws.com/Stage/SyncGalaxy/ShoppingPaths?query={ShoppingPaths(userId: "user1"){name}}