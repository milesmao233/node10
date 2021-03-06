const Model = require('./main')
// const Comment = require('./comment')
const User = require('./user')
const Comment = require('./comment')

const { log } = require('../utils')


class Weibo extends Model {
    constructor(form={}, userId=-1) {
        super(form)
        this.content = form.content || ''
        // 和别的数据关联的方式, 用 userId 表明拥有它的 user 实例
        this.userId = Number('userId' in form ? form.userId : userId)
    }

    isOwner(id) {
        return this.userId === id
    }

    user() {
        const u = User.get(this.userId)
        return u
    }

    static update(form) {
        const id = Number(form.id)
        const w = this.get(id)

        const validNames = [
            'content',
        ]

        Object.keys(form).forEach(k => {
            if (validNames.includes(k)) {
                w[k] = form[k]
            }
        })

        w.updated_time = Date.now()
        w.save()
        return w
    }

    comments() {
        return Comment.findAll('weiboId', this.id)
    }
}

module.exports = Weibo
