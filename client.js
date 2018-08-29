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
const builder = require('xmlbuilder');


const client = new Client()

client.start('ws://192.168.1.103:5280/ws')

client.on('error', err => {
  console.error('❌', err.toString())
})

client.on('status', (status, value) => {
  console.log('🛈', status, value ? value.toString() : '')
})


client.on('online', jid => {

  /** add a user to the chatroom **/
  return client.send(
      xml('presence', {
          from: jid.toString()
        }
        xml('priority', {},1)
      )

    )
    .then(result => {

      /**getting all subscription **/
      return client.send(

        xml('presence', {
            from: jid.toString(),
            to: "vik@conference.192.168.1.103/thwch"
          },
          xml('x', {
            xmlns: 'http://jabber.org/protocol/muc'
          })
        )
      )

    })
    .then(result=>{
      return client.send(

        xml('iq', {
            from: jid.toString(),
            id: "Get-room-info",
            to: "vik@conference.192.168.1.103/thwch",
            type: 'get'
          },
          xml('query', {
            xmlns: 'http://jabber.org/protocol/disco#info'
          }
            )
          )
        )
    })
    .then(result => {
      return client.send(

      xml('message', {
          to: '+8801200020001@192.168.1.103',
          from: jid.toString(),
          type: 'chat',
        },
        xml('body', {}, "welcome to bosify.com")
      )
    )
    }).catch(err => {
      console.log(err);
    })

  console.log('🗸', 'online as', jid.toString())
})

client.on('stanza', stanza => {
  let message = (stanza);
  var formattedXml = format(stanza.toString());
  console.log('⮈', formattedXml);


})

function getValue(message) {
}

client.handle('authenticate', authenticate => {
  return authenticate('+8801900090001', '+8801900090001@com.ekkbaz.app')
})
