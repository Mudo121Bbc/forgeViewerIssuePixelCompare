var viewer;

launchViewer();


function loadModel(viewer, urn) {
  function onDocumentLoadSuccess(doc) {
      var bubble = doc.getRoot();
      var items = bubble.search({ type: 'geometry', role: '2d' });
      var options1 = {};
      var Rmat = new THREE.Matrix4();
      Rmat.makeRotationZ(90 * Math.PI / 180);
      options1.placementTransform = Rmat;
      options1.keepCurrentModels = true;
      var options2 = { };
      viewer.loadDocumentNode(doc, items[1], options2);
      viewer.loadDocumentNode(doc, items[0], options1);
  }
  function onDocumentLoadFailure(code, message) {
      alert('Could not load model. See the console for more details.');
      console.error(message);
  }
  Autodesk.Viewing.Document.load(urn, onDocumentLoadSuccess, onDocumentLoadFailure);
}



function launchViewer() {
  var options = {
    env: 'AutodeskProduction',
    language: 'de-ch',
    useAdp: true,
    accessToken: "*yourAccessToken*"
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById('forgeViewer'), {}
    );
    
    viewer.start(); 

    Autodesk.Viewing.Document.load('*base64EncodedFileUrn of the file with the first model*', (_ => {
      
      // model path looks something like this: urn:adsk.viewing:fs.file:.../output/.../primaryGraphics.f2d

      // Load 2 sheet
      viewer.loadModel('modelPath of the first model', {}, (model1) => {
        viewer.loadModel('modelPath of the second model', {}, async (model2) => {
          // Compare them 
          const cpExt = await viewer.loadExtension('Autodesk.Viewing.PixelCompare');
          cpExt.compareTwoModels(model1, model2);
        });
      });

    }))
s

  });
}

