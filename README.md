# cross-destruct
A simple function to destructure data

# Why? JS has object destrucutring built in, right?
Picture this: Your server is storing a huge object full of data. As the client you only need part of that data. It would be a total waste to fetch the whole object and then only use the parts you need. Wouldn't it be better to destrucutre on the server-side? Short answer: **yes**. But. You need a way to tell the server what to destructure. JSON doesn't have destructuring built in, and moving the server to a more advanced query language like GraphQL (don't get me wrong, I :heart: GraphQL) would require huge buyin both from the frontent and backend teams. **Cross-destruct** provides a very simple syntax to destructure objects, using objects.

# Syntax
Cross-destruct uses a syntax called **template objects**. Think of a template object like a javascript object with only keys, no values. Cross-destruct will populate those keys with values. Here's an example
```javascript
// Include the library
const destruct = require('cross-destruct');

// A bunch of data
const lotsOfData = {
    tweets: [
        {
            author: 'user1',
            text: 'hello world! foo bar baz'
        },
        {
            author: 'user2',
            text: 'Lorem ipsum'
        }
    ],
    users: {
        'user1': {
            fullName: 'Jake',
            tweets: 1
        },
        'user2': {
            fullName: 'Joe',
            tweets: 1,
        }
    }
}

// We only want the first tweet's author
const template = {
    // Of the tweets key, ...
    tweets: {
        // we want only the item with the key 0, ...
        "0": {
            // of which we want only the `author` key ...
            author: "*" // The "*" (wildcard) means we want the full value of the key, no further destructuring...
        }
    }
}

console.log(destruct(lotsOfData, template));
// Output:
// {
//    tweets: [
//        {
//            author: 'user1'
//        }
//    ]
// }
```
Let's break this down: ```lotsOfData``` just stores a bunch of data that we need to destructure. The template object is a bit more interesting:
We create a javascript object with the key ```tweets```. This means that only the data's ```tweets``` key is relevant to us. Since we want data from the **first** tweet, the value to the key is another template object. **Note that eventhough ```tweets``` is an array, we still pass a template _object_**. The key ```"0"``` is self-explanatory. It retrives the first post from the list. Since we don't want the full post, we pass another template as the value, and continue destructuring. Of the first tweet, we want the author. To signify that we do not wish to destrucutre even deeper, we set the value to ```"*"```. This * is refered to as the ```widcard```. That means that no matter what type the value on the actual data is, we want to get the whole thing, as-is and destructure no more.