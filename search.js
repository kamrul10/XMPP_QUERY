const {
    Client
  } = require('@xmpp/client')
  const xml = require('@xmpp/xml')
  const client = new Client()
  const format = require('xml-formatter');
  
  client.start('ws://chatt.ekkbaz.com:5280/ws')
  
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
        //  .then(result=>{
        //   return client.send(
        //     xml("presence",{from:jid.toString(), to: "+8801000700070@chatt.ekkbaz.com",type:"subscribe"})
        //   )
        // })
        // .then(result=>{
        //     return client.send(
        //       xml("presence",{from:jid.toString(), to: "+8801000700070@chatt.ekkbaz.com",type:"subscribed"})
        //     )
        //   })
        .then(result=>{
            return client.send(
                xml('iq', {
                    from: jid.toString(),
                    id:new Date().getTime().toString(36),
                    type:"get"
                    },
                    xml('query',{
                        xmlns:"jabber:iq:roster",
                        ver:"ver14"
                    },
                    xml('set',{xmlns:"http://jabber.org/protocol/rsm"},
                    xml('max',{},5)
                )
                )
                )
            );
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
    return authenticate('+8801200020001', '+8801200020001@com.ekkbaz.app')
  });
  