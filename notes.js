const fs = require('fs')
const chalk = require('chalk')
const log = console.log;

function addNote(title, body) {
  const notes = loadNotes()

  if (!notes.find(note => note.title === title)) {
    notes.push({
      title,
      body
    })

    saveNotes(notes)
    log(chalk.green.inverse('New note added.'))
  } else {
    log(chalk.red.inverse('Note already exists.'))
  }
}

function removeNote(title) {
  const notes = loadNotes()
  const updatedNotes = notes.filter(note => note.title !== title)

  if (notes.length !== updatedNotes.length) {
    log(chalk.green.inverse('Note removed.'))
  } else {
    log(chalk.red.inverse('No note found.'))
  }

  saveNotes(updatedNotes)
}

function listNotes() {
  const notes = loadNotes()

  log(chalk.green('My Notes:'))

  notes.forEach((note, idx) => {
    log(chalk.green(`Note ${idx + 1}: ${note.title}`))
  })
}

function readNote(title) {
  const notes = loadNotes()
  const match = notes.find(note => note.title === title)

  if (match) {
    log(chalk.green.inverse(match.title))
    log(match.body)
  } else {
    log(chalk.red('Note not found.'))
  }
}

function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJson = dataBuffer.toString()

    return JSON.parse(dataJson)
  } catch(e) {
    return []
  }
}

function saveNotes(notes) {
  const data = JSON.stringify(notes)

  fs.writeFileSync('notes.json', data)
}

module.exports = {
  addNote,
  removeNote,
  readNote,
  listNotes
}
