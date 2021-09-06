const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comments');

User.hasMany(Blogpost, {
  foreignKey: 'user_id',
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id'
});

Blogpost.hasMany(Comment, {
  foreignKey: 'post_id'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
});




module.exports = { User, Blogpost, Comment };
