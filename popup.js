

InboxSDK.load('1.0', 'sdk_RorysExtension_1566b5062a').then(function(sdk){
  var PassPhrase = "The Moon is a Harsh Mistress."; 
  var bits = 1024;
  var roryRSA = cryptico.generateRSAKey(PassPhrase,bits);
  
  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler(function(composeView){
    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "ENCRYPT",
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/whsr-january-flaticon-set/512/lock.png',
      onClick: function(event) {
        var text = composeView.getTextContent();
        var roryPublic = cryptico.publicKeyString(roryRSA);
        var encrypted = cryptico.encrypt(text,roryPublic);
        event.composeView.setBodyText(encrypted.cipher);
        console.log(encrypted.status);
      },
    });

  });
  sdk.Conversations.registerThreadViewHandler((function(threadView){
    var messages= new Array();
    
    messages = threadView.getMessageViews();
    htmlBodies= new Array(messages.length);
    innerHTMLs = new Array(messages.length);
    for(i=0;i<messages.length;i++){
      htmlBodies[i]=messages[i].getBodyElement();
      innerHTMLs[i] = htmlBodies[i].innerHTML;
    }
    
    var top=0;
    var bottom;
    var text = new Array(messages.length); 
    var top;
    var bottom;
    for(i=0;i<messages.length;i++){
      top = innerHTMLs[i].indexOf("ltr")+5;
      text[i]=innerHTMLs[i].substr(top,innerHTMLs[i].substr(top,innerHTMLs[i].length).indexOf("</div"));
      text[i]=text[i].replace(/\<wbr>/g,'')
    }
    var DecryptionResult = cryptico.decrypt(text[0],roryRSA);
    console.log(text[0]);
    console.log(DecryptionResult.plaintext);

    
  })
  )

});