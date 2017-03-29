InboxSDK.load('1.0', 'sdk_RorysExtension_1566b5062a').then(function(sdk){

  // the SDK has been loaded, now do something with it!
  sdk.Compose.registerComposeViewHandler(function(composeView){

    // a compose view has come into existence, do something with it!
    composeView.addButton({
      title: "ENCRYPT",
      iconUrl: 'https://cdn4.iconfinder.com/data/icons/whsr-january-flaticon-set/512/lock.png',
      onClick: function(event) {
        event.composeView.insertTextIntoBodyAtCursor('Hello World!');
      },
    });

  });

});