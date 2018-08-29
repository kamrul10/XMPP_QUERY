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
      xml('iq', {
          type: 'get',
          id: new Date().getTime().toString(36)
        },
        xml('query', {
          xmlns: 'http://jabber.org/protocol/disco#info',
          node: 'http://jabber.org/protocol/offline'
        })
      )
    )
    .then(result => {

      return client.send(

        xml('presence', {
            from: jid.toString()
          }
          // xml('priority', {}, 2)
        )

      )
    })
    // .then(result => {
    //   return client.send(
    //     // xml('iq', {
    //     //     type: 'get',
    //     //     id: new Date().getTime().toString(36)
    //     //   },
    //     //   xml('offline', {
    //     //       xmlns: 'http://jabber.org/protocol/offline'
    //     //     },
    //     //     xml('fetch')
    //     //   )
    //     // )
    //     //   xml('message', {
    //     //       to: 'admin@localhost',
    //     //       from: jid.toString(),
    //     //       type: 'chat',
    //     //     },
    //     //     xml('body', {}, 'hello..')
    //     //   )
    //     /** get affliations of the pubsub node **/
    //     xml('iq', {
    //         type: 'get',
    //         from: jid.toString(),
    //         to: 'pubsub.localhost',
    //         id: new Date().getTime()
    //       },
    //       xml('pubsub', {
    //           xmlns: 'http://jabber.org/protocol/pubsub'
    //         },
    //         xml('affiliations', {}))
    //     )
    //   )
    // })
    // .then(result => {
    //   return client.send(
    //     xml('presence', {
    //         from: jid.toString()
    //       },
    //       xml('status', {}, 'Highway to  Hell')
    //     )
    //   )
    //
    // }).then(result => {
    //   return client.send(
    //
    //     xml('iq', {
    //         type: 'set',
    //         id: new Date().getTime()
    //       },
    //       xml('enable', {
    //         xmlns: 'urn:xmpp:push:0',
    //         jid: jid.toString(),
    //         node: 'yxs32uqsflafdk3iuqo'
    //       })
    //     )
    //   )
    //   // client.send(
    //   //   xml('iq', {
    //   //       from: jid.toString(),
    //   //       type: 'set',
    //   //       id: new Date().getTime().toString(36)
    //   //     },
    //   //     xml('pubsub', {
    //   //         xmlns: 'http://jabber.org/protocol/pubsub'
    //   //       },
    //   //       xml('publish', {
    //   //           node: 'presence'
    //   //         },
    //   //         xml('item',
    //   //           xml('presence', {
    //   //               from: jid.toString(),
    //   //               xmlns: 'jabber:client'
    //   //             },
    //   //             xml('status', {}, "Hell .... Yeah")
    //   //           )
    //   //         )
    //   //       )
    //   //     )
    //   //   )
    //   // )
    // }).then(result => {
    //   //return client.send(
    //   // xml('iq', {
    //   //     from: jid.toString(),
    //   //     to: 'admin@localhost',
    //   //     id: new Date().getTime(),
    //   //     type: 'get'
    //   //   },
    //   //   xml('query', {
    //   //     xmlns: 'http://jabber.org/protocol/disco#info'
    //   //   })
    //   // )
    //   //)
    // }).then(result => {
    //   //pubsub notification publish
    //   return client.send(
    //     xml('iq', {
    //         type: 'set',
    //         from: jid.toString(),
    //         to: 'pubsub.192.168.1.103',
    //         id: new Date().getTime()
    //       },
    //       xml('pubsub', {
    //           xmlns: 'http://jabber.org/protocol/pubsub'
    //         },
    //         xml('publish', {
    //             node: 'vanhelsing'
    //           },
    //           xml('item', {},
    //             xml('notification', {
    //                 xmlns: 'urn:xmpp:push:0'
    //               },
    //               xml('x', {
    //                   xmlns: 'jabber:x:data'
    //                 },
    //                 xml('field', {
    //                     var: 'FORM_TYPE'
    //                   },
    //                   xml('value', {}, 'urn:xmpp:push:summary')), xml('field', {
    //                   var: 'message-count'
    //                 }, xml('value', {}, 1)), xml('field', {
    //                   var: 'last-message-sender'
    //                 }, xml('value', {}, jid.toString())), xml('field', {
    //                   var: 'last-message-body'
    //                 }, xml('value', {}, 'Wherefore art thou, Romeo?'))
    //               ),
    //               xml('additional', {
    //                 xmlns: 'http://example.com/custom'
    //               }, 'Additional custom elements')
    //             )
    //           )
    //         )
    //       )
    //     )
    //   )
    // }).then(result => {
    //
    //   return client.send(
    //     //discovering node info
    //     // xml('iq', {
    //     //     type: 'get',
    //     //     from: jid.toString(),
    //     //     to: 'pubsub.localhost',
    //     //     id: new Date().getTime()
    //     //   },
    //     //   xml('query', {
    //     //     xmlns: 'http://jabber.org/protocol/disco#items',
    //     //     node: 'venhelsing'
    //     //   })
    //     // )
    //     /** discovering support for file upload **/
    //     // xml('iq', {
    //     //     from: jid.toString(),
    //     //     id: new Date().getTime(),
    //     //     to: 'upload.localhost',
    //     //     type: 'get'
    //     //   },
    //     //   xml('query', {
    //     //     xmlns: 'http://jabber.org/protocol/disco#info'
    //     //   })
    //     // )
    //     // xml('iq', {
    //     //     type: 'set',
    //     //     from: jid.toString(),
    //     //     to: 'pubsub.localhost',
    //     //     id: new Date().getTime()
    //     //   },
    //     //   xml('pubsub', {
    //     //       xmlns: 'http://jabber.org/protocol/pubsub'
    //     //     },
    //     //     xml('subscribe', {
    //     //       node: 'kattegart',
    //     //       jid: jid.toString()
    //     //     })
    //     //   )
    //     // )
    //     /** set a roaster **/
    //     // xml('iq',{from:jid.toString(),id:new Date().getTime().toString(36),type:'set'},
    //     //   xml('query',{xmlns:'jabber:iq:roster'},
    //     //     xml('item',{jid:'+8801300930093@localhost'})
    //     //   )
    //     // )
    //     // xml('iq', {
    //     //     from: jid.toString(),
    //     //     type: 'get',
    //     //     id: new Date().getTime().toString(36)
    //     //   },
    //     //   xml('query', {
    //     //       xmlns: 'jabber:iq:privacy'
    //     //     },
    //     //     xml('list', {
    //     //       name: 'private'
    //     //     })
    //     //   )
    //     // )
    //     xml('message', {
    //         to: '+8801919303002@192.168.1.103',
    //         from: jid.toString(),
    //         type: 'chat',
    //       },
    //       xml('body', {}, 'hello from hell')
    //     )
    //   )
    // })
     .then(result => {
       return client.send(
         xml('presence', {
             from: jid.toString(),
             to: "chat@conference.localhost/+8801200020001"
           },
           xml('x', {
             xmlns: 'http://jabber.org/protocol/muc'
           })
         )

       )
     })
  .then(result=>{
    // //
      return client.send(
        xml("iq",{from:jid.toString(),id:new Date().getTime().toString(36),to:"chat@conference.192.168.1.103",type:"get"},
          xml("query",{xmlns:"http://jabber.org/protocol/disco#items"})
        )


    // // //
    // //     xml('presence', {
    // //         from: jid.toString()
    // //       }
    // //       // xml('priority', {},1)
    // //     )
    // //
    // //   )
    // //   .then(result => {
    // //     /** querying the member affliations**/
    // //     return client.send(
    // //       xml('iq', {
    // //           from: jid.toString(),
    // //           id: new Date().getTime().toString(36),
    // //           to: 'trk1234@conference.localhost',
    // //           type: 'get'
    // //         },
    // //         xml('query', {
    // //             xmlns: 'http://jabber.org/protocol/muc#admin'
    // //           },
    // //           xml('item', {
    // //             affiliation: 'member'
    // //           })
    // //         )
    // //       )
        )
       })
      .then((result) => {

        return client.send(
          xml('message', {
              to: 'chat@conference.192.168.1.103',
              from: jid.toString(),
              id:new Date().getTime().toString(36),
              type: 'groupchat',
            },
            xml('body', {}, "Harpier cries its time.")
          )
          // xml('iq',{type:"set",id:"juliet1",to:'chat@conference.192.168.1.103'},
          //   xml('query',{xmlns:'urn:xmpp:mam:0',queryid:'f27'}
          //   )
          // )
        )
      })
    //   .then(result => {
    //     console.log("Offline messages retrieved succesfully");
    //   })
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
