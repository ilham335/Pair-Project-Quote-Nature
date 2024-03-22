const { User, Author, Quote, Reward } = require('../models/index');
const bcrypt = require('bcryptjs');
const getCodeUniq = require('../helper/codeUniq')
const getQuote = require("randoquoter")

class Controller {
    static async landingPage(req, res) {
        try {
            let quote = getQuote.getRandomQuote()

            res.render('landingPage', {quote})
        } catch (error) {
            res.send(error)
        }
    }

    static async regist(req, res) {
        let { error } = req.query
        res.render('register', { error });
    }

    static async handlerRegist(req, res) {
        const { userName, email, password } = req.body;
        try {
            await User.create({ userName, email, password, role: "visitor" });
            res.redirect('/login');
        } catch (error) {
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                const errors = error.errors.map(err => err.message);
                console.log(errors);
                res.redirect(`/regist/?error=${errors}`)
            } else {
                res.redirect(`/regist/?error=internal-server-error`)
            }
        }
    }

    static async registAuthor(req, res) {
        const { userId } = req.params
        const { error } = req.query
        res.render('registAuthor', { userId, error });
    }

    static async handlerRegistAuthor(req, res) {
        try {
            const { userId } = req.params
            let { authorName, codeUniq, experience } = req.body;
            if (codeUniq.length < 4) {
                codeUniq = getCodeUniq()
            }

            codeUniq = codeUniq.toUpperCase()
            let author = await Author.create({ authorName, codeUniq, experience });
            await User.update({ role: "author", AuthorId: author.id }, { where: { id: userId } })

            req.session.isAuthor = true
            res.redirect(`/authors/${author.id}`);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                const errors = error.errors.map(err => err.message);
                res.redirect(`/registAuthor/?error=${errors}`)
            } else {
                res.redirect(`/registAuthor/?error=internal-server-error`)
            }
        }
    }

    static async loginAuthor(req, res) {
        const { userId } = req.params
        const { error } = req.query
        res.render('loginAuthor', { userId, error });
    }

    static async handlerLoginAuthor(req, res) {
        const { userId } = req.params;
        try {
            let { authorName, codeUniq } = req.body;
            const author = await Author.findOne({ where: { authorName } });

            codeUniq = codeUniq.toUpperCase()

            if (!author || author.codeUniq !== codeUniq) {
                const error = "Invalid name / Code Uniq";
                return res.redirect(`/users/${userId}/loginAuthor/?error=${error}`);
            }

            req.session.authorId = author.id;
            res.redirect(`/authors/${author.id}`);
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                const errors = error.errors.map(err => err.message);
                res.redirect(`/users/${userId}/loginAuthor/?error=${errors}`);
            } else {
                res.redirect(`/users/${userId}/loginAuthor/?error=internal-server-error`);
            }
        }
    }


    //render
    static async login(req, res) {
        const { error } = req.query;
        res.render('login', { error });
    }

    //handle login
    static async handlerLogin(req, res) {
        try {
            const { userName, password } = req.body;
            const user = await User.findOne({ where: { userName } });
            if (!user || !bcrypt.compareSync(password, user.password)) {
                const error = "Invalid username / password";
                return res.redirect(`/login/?error=${error}`);
            }

            req.session.userId = user.id
            res.redirect(`/users/${user.id}`);
        } catch (error) {
            res.send(error);
        }
    }

    static async main(req, res) {
        try {
            const { userId } = req.params
            const { error, search } = req.query
            const quotes = await Quote.getQuoteByName(search)
            // const quotes = await Quote.findAll({ include: Author });
            res.render('mainPage', { quotes, userId, error });
        } catch (error) {
            res.send(error);
        }
    }

    static async authorDetail(req, res) {
        try {
            const { authorId } = req.params

            let authors = await Author.findByPk(authorId, { include: Quote })

            res.render('detailAuthor', { authors })
        } catch (error) {
            res.send(error);
        }
    }

    static async addQuote(req, res) {
        const { authorId } = req.params
        res.render('addQuote', { authorId, path: "" });
    }

    static async handlerAddQoute(req, res) {
        try {
            const { authorId } = req.params
            const { quote } = req.body;

            await Quote.create({ quote, AuthorId: authorId });

            res.redirect(`/authors/${authorId}`);
        } catch (error) {
            res.send(error)
        }
    }

    static async author(req, res) {
        try {
            let authors = await Author.findAll()

            res.render('author', { authors })
        } catch (error) {
            res.send(error)
        }
    }

    static async authorRewards(req, res) {
        try {
            const { authorId } = req.params;
            const author = await Author.findByPk(authorId, { include: Reward });
            res.render('authorRewards', { author });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }

    static async getLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err)
            } else {
                res.redirect('/login')
            }
        })
    }

    static async deleteQuote(req, res) {
        const { authorId, quoteId } = req.params

        await Quote.destroy({ where: { id: quoteId } })

        res.redirect(`/authors/${authorId}/?error="Success delete quote"`)
    }

    static async editQuote(req, res) {
        const { authorId, quoteId } = req.params

        const quote = await Quote.findByPk(quoteId)

        res.render("addQuote", { quote, authorId, quoteId, path: "edit" })
    }

    static async handlerEditQuote(req, res) {
        const { authorId, quoteId } = req.params
        const { quote } = req.body

        await Quote.update({ quote, AuthorId: authorId }, { where: { id: quoteId } })

        res.redirect(`/authors/${authorId}`)
    }

    static async user(req, res) {
    }
}

module.exports = Controller;
