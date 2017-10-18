const clone = require('clone')

let db = {}

const defaultData = {
  "b79e05bb-b2f6-4ce4-96b7-53ce962e5cd0": {
    id: 'b79e05bb-b2f6-4ce4-96b7-53ce962e5cd0',
    timestamp: 1467166872634,
    title: 'Watch SK Gaming tonight!',
    body: 'Hey guys! Are you gonna watch SK Gaming match tonight?',
    author: 'skbiggestfan',
    category: 'sk',
    voteScore: 10,
    deleted: false,
    commentCount: 2
  },
  "b79e05bb-b2f6-4ce4-96b7-53ce962e5cd7": {
    id: 'b79e05bb-b2f6-4ce4-96b7-53ce962e5cd7',
    timestamp: 1467166872634,
    title: "What a great matches we'll have tonight! GO SK!!!!",
    body: 'Hey guys! I think SK will trade maps... how about you?',
    author: 'skbiggestfan',
    category: 'sk',
    voteScore: 2,
    deleted: false,
    commentCount: 0
  },
  "a79e05bb-b2f6-4ce4-96b7-53ce962e5cd0": {
    id: 'a79e05bb-b2f6-4ce4-96b7-53ce962e5cd0',
    timestamp: 1467166872634,
    title: 'Watch Faze Clan tonight!',
    body: 'Hey guys! Are you gonna watch Faze Clan match tonight?',
    author: 'fazebiggestfan',
    category: 'faze',
    voteScore: 5,
    deleted: false,
    commentCount: 1
  },
  "c79e05bb-b2f6-4ce4-96b7-53ce962e5cd0": {
    id: 'c79e05bb-b2f6-4ce4-96b7-53ce962e5cd0',
    timestamp: 1467166872634,
    title: 'Watch Astralis tonight!',
    body: 'Hey guys! Are you gonna watch Astralis match tonight?',
    author: 'astralisbiggestfan',
    category: 'astralis',
    voteScore: 2,
    deleted: false,
    commentCount: 1
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)

    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false,
      commentCount: 0
    }

    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

function incrementCommentCounter(token, id, count) {
  const data = getData(token)
  if (data[id]) {
    data[id].commentCount += count
  }
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll,
  incrementCommentCounter
}
