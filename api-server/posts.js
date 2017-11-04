const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  },
  "2423kjdsa789asy": {
    id: '2423kjdsa789asy',
    timestamp: 1508575016940,
    title: 'Currying with JavaScript Functions',
    body: 'Donec egestas velit non eros ultricies auctor. Suspendisse potenti. Donec venenatis ultricies metus sit amet maximus. Morbi porta, massa nec dapibus lacinia, velit dui porttitor turpis, eget vestibulum risus quam a libero. Aenean nec metus eu lectus volutpat convallis. Mauris vestibulum lorem eget enim hendrerit lacinia. Nulla in vehicula justo. Cras sed urna id ligula tincidunt lobortis sit amet vitae mi. Pellentesque gravida velit sit amet pharetra cursus. Morbi tempor pellentesque suscipit. Proin lorem dolor, commodo vel dui ut, euismod posuere enim. Fusce risus risus, consequat ut felis a, elementum efficitur metus. Maecenas nisi nibh, efficitur pulvinar arcu at, mollis accumsan quam. Duis mattis lorem in tortor condimentum, non tincidunt eros tempor. Etiam sit amet commodo velit, lobortis cursus est. Suspendisse luctus bibendum tortor at maximus.',
    author: 'Harish Mathanan',
    category: 'javascript',
    voteScore: 5,
    deleted: false,
    commentCount: 0
  },
  "gas7862asd1sxa": {
    id: 'gas7862asd1sxa',
    timestamp: 1508574991822,
    title: 'CSS Design Tips for React Applications',
    body: 'Integer ultrices elit metus, vitae hendrerit massa tristique quis. Duis auctor lacinia viverra. Fusce sed euismod sapien, a finibus magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce quis dictum est, sed luctus nisi. Cras placerat ex id pulvinar placerat. Suspendisse tempor dapibus lorem et accumsan. Morbi sagittis, mi a consequat dignissim, libero tortor viverra enim, vel varius erat urna sed nisl. Pellentesque sodales tempus blandit. Curabitur dignissim porta ex ac laoreet. Proin pellentesque leo ut ante pharetra mollis. Phasellus vel leo nibh. Proin facilisis justo a pharetra interdum. Etiam est mi, dictum id purus a, scelerisque tempus mauris.',
    author: 'Misha Mathanan',
    category: 'react',
    voteScore: 9,
    deleted: false,
    commentCount: 0
  },
  "796dassffsdf87": {
    id: '796dassffsdf87',
    timestamp: 1508574971316,
    title: 'Writing good JavaScript with TypeScript',
    body: 'Donec pulvinar ullamcorper sem nec feugiat. Praesent a elementum lacus, in lacinia tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam mollis, urna id fringilla efficitur, nunc augue ullamcorper ipsum, eu condimentum enim massa et est. Curabitur placerat purus in justo faucibus tincidunt. Nunc interdum, tortor ac eleifend accumsan, turpis tellus interdum odio, sit amet ultricies elit mi euismod lectus. Morbi iaculis purus ac augue ornare, quis ullamcorper odio lacinia. Sed sodales ligula cursus porta posuere. Nulla ut molestie felis, eu rhoncus augue. Suspendisse vulputate lorem est, et faucibus neque malesuada nec. Pellentesque placerat et ex nec accumsan. Quisque sollicitudin tincidunt mauris, eget interdum nunc faucibus ac. Cras at sagittis lorem, nec fringilla mi. Sed malesuada orci eget fringilla interdum. Maecenas eget velit eget diam blandit faucibus.',
    author: 'Harish Mathanan',
    category: 'typescript',
    voteScore: 32,
    deleted: false,
    commentCount: 0
  },
  "856asbfas7t62a": {
    id: '856asbfas7t62a',
    timestamp: 1508574950735,
    title: 'Clean Components in React',
    body: 'Donec vel ultricies nisl, non eleifend arcu. Nunc ac enim augue. Donec ipsum nisi, commodo sed turpis id, congue mollis mi. Praesent eget tempus augue, pulvinar pretium est. Curabitur aliquet convallis arcu, malesuada vulputate dui maximus vitae. Fusce faucibus elit ac semper aliquet. Ut ultrices velit vitae felis pellentesque efficitur. Suspendisse lobortis condimentum malesuada. Nulla in volutpat leo. Suspendisse nisl tellus, rhoncus vel tellus non, tristique imperdiet neque. Nullam a hendrerit tortor. Morbi sit amet tristique nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed eros sit amet odio pretium euismod. Maecenas eget orci diam. Vestibulum euismod justo purus, nec luctus sem elementum in.',
    author: 'Angie Mathanan',
    category: 'react',
    voteScore: 7,
    deleted: false,
    commentCount: 0
  },
  "fadf96321sakhg": {
    id: 'fadf96321sakhg',
    timestamp: 1508574916181,
    title: 'Interfaces and Classes',
    body: 'Vestibulum fermentum nulla justo, at bibendum velit dictum vel. Duis blandit, libero id rutrum dignissim, massa nunc vulputate felis, nec sagittis ante ipsum a sapien. Aliquam pellentesque ut ex at auctor. Curabitur ante magna, venenatis sit amet diam eget, pharetra dictum ex. Quisque vel pretium risus. Integer a lacus quis ligula ornare vestibulum. Sed eget velit vitae nisi sodales pulvinar. Pellentesque semper ipsum est, non molestie enim congue interdum. Ut lobortis massa lectus, id hendrerit urna sagittis non. Nullam ullamcorper vitae nulla at hendrerit. Donec dignissim lacus id consequat rhoncus. Integer quis dictum ligula, ac mollis nulla. Donec vitae aliquet ante.',
    author: 'Angie Mathanan',
    category: 'typescript',
    voteScore: 17,
    deleted: false,
    commentCount: 0
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
