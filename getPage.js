const htmlDoc = require('./schemas').htmlDoc;

const getPage = async function(url){
    let doc = await htmlDoc.findOne({
        url : url.replace(":", "")
    });

    return doc.html;
}

module.exports = {
    getPage
}