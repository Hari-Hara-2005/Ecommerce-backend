const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'dlahzfpmk',
    api_key: '734567775688883',
    api_secret: '5ox8XvHVTYKyGuzcmzy6giXQnzI'
});
module.exports = cloudinary;