const htmlDoc = require('./schemas').htmlDoc;

const update = async function(docProps){

    let stripped = processHTMLString(docProps.html);
    const pageSize = Buffer.byteLength(stripped, 'utf8');
    if(pageSize > 4096) return  `Your page is too large (${pageSize} bytes). Try again.`;

    await htmlDoc.findOneAndUpdate({
        creatorKey : docProps.creatorKey
    }, {
        html: stripped
    });

    return `Updated ${docProps.creatorKey}; it had a page size of ${pageSize} bytes.`;
}

const deleteDoc = async function(docProps){
    let res = await htmlDoc.findOneAndDelete({
        creatorKey : docProps.creatorKey
    });

    return "Submitted request for deletion.";
}

module.exports = {
    update,
    deleteDoc
}