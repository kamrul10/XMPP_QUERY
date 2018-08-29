const {
  Client
} = require('@xmpp/client')
const xml = require('@xmpp/xml')
const client = new Client()
const format = require('xml-formatter');

client.start('ws://192.168.1.103:5280/ws')

client.on('error', err => {
  console.error('❌', err.toString())
})

client.on('status', (status, value) => {
  console.log('🛈', status, value ? value.toString() : '')
})
// client.on('input', data => console.log('👈', data))
//   // Emitted for every outgoing fragment
// client.on('output', data => console.log('👉', data))

client.on('online', jid => {
  console.log('🗸', 'online as', jid.toString());
    client.send(

        xml('presence', {
            from: jid.toString()
          }
        )
      )
      .then(res=>{
         return client.send(
           xml("iq",{type:"get",from:jid.toString(),to:"muc.192.168.1.103",id: new Date().getTime().toString(36)},
            xml("query",{xmlns:"http://jabber.org/protocol/disco#info"})
          )
         )
      })
      .catch(err => {
        console.log(err);
      })
});

client.on('stanza', stanza => {
  var formattedXml = format(stanza.toString());
  console.log('⮈', formattedXml);
});
client.handle('authenticate', authenticate => {
  return authenticate('+8801900090001', '+8801900090001@com.ekkbaz.app')
});
