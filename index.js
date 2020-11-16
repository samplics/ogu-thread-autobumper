const axios = require('axios');
const stringify = require('qs-stringify');
const config = require('./config.js');

var reqBody = stringify({
    my_post_key: config.post_key,
    subject: `RE: ${config.thread_name}`,
    action: "do_newreply",
    method: "quickreply",
    message: "My services are available!",
    posthash: config.post_hash,
    tid: "673383"
});

console.log('[!!!] Starting autobumper...');
console.log('[!!] Next autobump going out in one hour.');

setInterval(()=>{
    axios({
        method: 'post',
        url: 'https://ogusers.com/newreply.php?ajax=1',
        headers: {
            "accept": "text/html, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": `ogusersloginattempts=1; ogusersmybbuser=${config.cookie.ogusersmybbuser}; oguserssid=${config.cookie.oguserssid}; ogusersupgrade56=${config.cookie.ogusersupgrade56};`
        },
        data: reqBody
    })
    .then((res)=>{
        if(res.data.data){
            console.log('[!] Thread Successfully autobumped');
            console.log('[!!] Next autobump going out in one hour.');
        } else console.log(res);
    })
    .catch(console.log)
}, 3600000);
