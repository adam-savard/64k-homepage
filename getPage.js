const htmlDoc = require('./schemas').htmlDoc;

const getPage = async function(url){
    if(url.includes('rejected')) return 'rejected';
    let doc = await htmlDoc.findOne({
        url : url.replace(":", "")
    });
    doc.html += `
    <script>
    function getQueryStringValue (key) {  
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
      }  

    if(getQueryStringValue("creatorKey")){
        var param = getQueryStringValue("creatorKey");
        alert("Your creator key is |     " + param + "     |; write that down!");
    }
    </script>
    `
    return doc.html;
}

module.exports = {
    getPage
}