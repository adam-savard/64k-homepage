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
    const pageSize = Buffer.byteLength(html, 'utf8');
    if(pageSize > 4096) return  `${TLD}/page:rejected`;
    await newDoc.save().then(() =>{
        console.log(`Saved new doc ${url} with creatorKey ${creatorKey}`);
    });
    return `${TLD}/page:${url}?creatorKey=${creatorKey}`;
}

module.exports = {
    createNewDoc
}