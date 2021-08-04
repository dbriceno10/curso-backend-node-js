const { Transform } = require('stream')

const upperFirst = text => {
  return text.charAt(0)
    .toUpperCase()
    .concat(text.slice(1))
}

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const camelCase = 
    chunk
    .toString()
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      return index === 0 ? word : upperFirst(word)
    })
    .join('')
    this.push(camelCase)
    callback()
  }
})

process.stdin.pipe(transformStream)
.pipe(process.stdout)