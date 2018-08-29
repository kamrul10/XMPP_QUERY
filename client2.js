const {
  Client
} = require('@xmpp/client')
const {
  s
} = require('@xmpp/client-core');
const xml = require('@xmpp/xml')
const format = require('xml-formatter');

const recipient = 'firoz@localhost'
const days = ['Monday', 'Tuesday']


const client = new Client()

client.start('ws://localhost:5280/ws')

client.on('error', err => {
  console.error('❌', err.toString())
})

client.on('status', (status, value) => {
  console.log('🛈', status, value ? value.toString() : '')
})
// client.on('input', data => console.log('👈', data))
// Emitted for every outgoing fragment
// client.on('output', data => console.log('👉', data))

client.on('online', jid => {
  return client.send(
      xml('presence', {
          from: jid.toString()
        }
        // xml('priority', {},1)
      )
    ).then(result => {
      return client.send(
        xml('iq', {
            type: 'get',
            id: new Date().getTime().toString(36)
          },
          xml('offline', {
              xmlns: 'http://jabber.org/protocol/offline'
            },
            xml('fetch')
          )
        )
      )
    })
    .then(result => {
      return client.send(
        xml('iq', {
            from: jid.toString(),
            id: new Date().getTime().toString(36),
            to: 'trk1234@conference.localhost',
            type: 'get'
          },
          xml('query', {
            xmlns: 'jabber:iq:register'
          })
        )
      )
    })
    .catch(err => {
      console.log(err);
    })
  console.log('🗸', 'online as', jid.toString())
})

client.on('stanza', stanza => {
  var formattedXml = format(stanza.toString());
  console.log('⮈', formattedXml);
})

client.handle('authenticate', authenticate => {
  return authenticate('joy', '12345')
})
