const {
  Client
} = require('@xmpp/client')
const xml = require('@xmpp/xml')
const client = new Client()
const format = require('xml-formatter');

client.start('http://13.76.135.215:5222')

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
      // .then(res=>{
      //    return client.send(
      //      xml("iq",{from:jid.toString(),id:new Date().getTime().toString(36),to:"drakula@muclight.192.168.1.103",type:"set"},
      //       xml("query",{xmlns:"urn:xmpp:muclight:0#create"},
      //         xml("configuration",{},
      //           xml("roomname",{},"A Dark Cave")
      //         ),
      //         xml("occupants",{},
      //           xml("user",{affiliation:"member"},"+8801200020001@192.168.1.103"),
      //           xml("user",{affiliation:"member"},"+8801500050001@192.168.1.103")
      //         )
      //       )
      //     )
      //    )
      // })
      .catch(err => {
        console.log(err);
      })
});

client.on('stanza', stanza => {
  var formattedXml = format(stanza.toString());
  console.log('⮈', formattedXml);
});
client.handle('authenticate', authenticate => {
  return authenticate('admin', 'qweqwe')
});
