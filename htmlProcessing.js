const stripJS = require('strip-js');
const TLD = "http://localhost:3000";
const nanoid = require('nanoid').nanoid;
const htmlDoc = require('./schemas').htmlDoc;

const processHTMLString = function(html){
    
    //using the above library, we strip out all script tags
    //an actual function is here for later on if I need to add to it
    return stripJS(html);

}

const createNewDoc = async function(html){
    let stripped = processHTMLString(html);
    let url = Date.now();
    let creatorKey = nanoid();

    const newDoc = new htmlDoc({
        html : stripped,
        url: url,
        creatorKey : creatorKey
    });

    await newDoc.save().then(() =>{
        console.log(`Saved new doc ${url} with creatorKey ${creatorKey}`);
    });
    Buffer.byteLength(html, 'utf8')
    return `${TLD}/page:${url}?creatorKey=${creatorKey}`;
}

module.exports = {
    createNewDoc
}