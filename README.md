# cross-destruct
A simple function to destructure data

# Why? JS has object destrucutring built in, right?
Picture this: Your server is storing a huge object full of data. As the client you only need part of that data. It would be a total waste to fetch the whole object and then only use the parts you need. Wouldn't it be better to destrucutre on the server-side? Short answer: **yes**. But. You need a way to tell the server what to destructure. JSON doesn't have destructuring built in, and moving the server to a more advanced query language like GraphQL (don't get me wrong, I :heart: GraphQL) would require huge buyin both from the frontent and backend teams. **Cross-destruct** provides a very simple syntax to destructure objects, using objects.

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
    tweets: {
        "0": {
            author: "*"
        }
    }
}

console.log(destruct(lotsOfData, template));
// Output:
// {
//    tweets: [
//        {
//            author: 'jake'
//        }
//    ]
// }
```