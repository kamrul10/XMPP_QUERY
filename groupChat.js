const {
  Client
} = require('@xmpp/client')
const xml = require('@xmpp/xml')
const client = new Client()
const format = require('xml-formatter');

client.start('ws://13.67.110.231:5280/ws')

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
      .then(result => {
        //<history maxstanzas='20'/>
        return client.send(
          xml('presence', {
              from: "+8801900090001@13.67.110.231",
              to: "vendor@conference.13.67.110.231/+8801900090001"
            },
            xml('x', {
              xmlns: 'http://jabber.org/protocol/muc'
            },
            xml("history",{maxstanzas:"0"})
          )
          )

        )
      })
      // .then(result =>{
      //   xml('iq', {
      //     from: jid.toString(),
      //     id: new Date().getTime().toString(36),
      //    to: 'vendor@conference.192.168.1.103',
      //     type: 'set'
      //   },
      //   xml('query', {
      //       xmlns: 'http://jabber.org/protocol/muc#admin'
      //     },
      //     xml('item', {
      //         affiliation: 'member',
      //         jid: '+8801200020001@192.168.1.103',
      //         nick: '+880120002001'
      //      },
      //      xml('reason', {}, 'A worthy fella indeed!')
      //    )
      //   )
      //
      // )
      // })
      .then(result=>{
          return client.send(
            xml("iq",{type:'set',id:'juliet1',to:'vendor@conference.13.67.110.231'},
              xml("query",{xmlns:"urn:xmpp:mam:1"})
            )
            // xml("iq",{from:jid.toString(),id:new Date().getTime().toString(36),to:"chat@conference.192.168.1.103",type:"get"},
            //   xml("query",{xmlns:"http://jabber.org/protocol/disco#items"})
            // )
          )
      })
      // .then((result) => {
      //
      //   return client.send(
      //     xml('message', {
      //         to: 'vendor@conference.192.168.1.103',
      //         from: jid.toString(),
      //         id:new Date().getTime().toString(36),
      //         type: 'groupchat',
      //       },
      //       xml('body', {}, "this me! the 400 guy why i am always bad")
      //     )
      //   )
      // })
      // .then(result=>{
      //   return client.send(
      //     xml('iq',{type:"set",id:"juliet1",to:'chat@conference.192.168.1.103'},
      //       xml('query',{xmlns:'urn:xmpp:mam:0',queryid:'f27'}
      //       )
      //     )
      //   )
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
  return authenticate('+8801900090001', '+8801900090001@com.ekkbaz.app')
});
