'use strict';
const fs = require('fs').promises
const getQuote = require("randoquoter")
const codeUniq = require('../helper/codeUniq')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let authors = []
    let quotes = []

    for (let i = 1; i <= 5; i++) {
        let newQuote = getQuote.getRandomQuote()

        let author = newQuote.author
        let quote = newQuote.text

        let createdAt = new Date()
        let updatedAt = new Date()

        const uniq = codeUniq()
        const randomEx = Math.floor(Math.random() * 30) + 1

        authors.push({ authorName: author, codeUniq: uniq, experience: randomEx, createdAt, updatedAt })
        quotes.push({ quote, AuthorId: i, createdAt, updatedAt })
    }

    console.log(authors)
    console.log(quotes)
    await queryInterface.bulkInsert('Authors', authors , {})
    await queryInterface.bulkInsert('Quotes', quotes , {})

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null , {})
    await queryInterface.bulkDelete('Quotes', null , {})
    
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
