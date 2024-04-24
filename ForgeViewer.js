var viewer;

launchViewer();

function launchViewer() {
  var options = {
    env: "AutodeskProduction",
    language: 'de-ch',
    useAdp: true,
    accessToken:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY0RE9XMnJoOE9tbjNpdk1NU0xlNGQ2VHEwUV9SUzI1NiIsInBpLmF0bSI6ImFzc2MifQ.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6cmVhZCIsImJ1Y2tldDpkZWxldGUiLCJidWNrZXQ6dXBkYXRlIiwiYnVja2V0OmNyZWF0ZSJdLCJjbGllbnRfaWQiOiJyR20wbU85alZTc0QyeUJFRGs5TVJ0WFFUd3NhNjF5MCIsImlzcyI6Imh0dHBzOi8vZGV2ZWxvcGVyLmFwaS5hdXRvZGVzay5jb20iLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbSIsImp0aSI6InBtVGxyWTZMR1VTaWEwaHRKUzZMTGJMeENHdjVMU3NvTjlhZ2RreGJEMEJLdTRTTUtqc25qUnBKMXBuYTh4RXciLCJleHAiOjE3MTM5MDMzNzV9.aH6MO53XonXyZeo7Kk6cbxgGHIKztEdNKfP-brH47r0wnJPo5M6FYWzVA959k9_801hp7mcOsCah5_qhlX8FC-t_o1KBwhrk_wDmLRmVbkyg2JHHR-nzln3dfmdjS3gNC_-vPaT4MSK3ewE7jmB5NMibMPkkzQVQOLxV41iI10-KlgYWZjK8sMdSiwXgcmPzfMqgKtPmeJsU7epFDEDxNdsrmodE7BBLx6srnmuFPZG-Y6RXWwyEVJR2hvWRv0DJoDhWdpEVEG6HqI2sNFa2DS83tZ4Kk2l1XxYl6ZkP_U_hKqtC0vST-NFZfM2E58il5_sUbvdi1_glqHuxdxk4VQ",
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(
      document.getElementById("forgeViewer"),
      {}
    );

    viewer.start();

    let urn =
      "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YWRhbV9kd2cvVXRpbGl0eSUyMEtuaWZlJTIwRHJhd2luZyUyMHYyLmR3Zw";
    Autodesk.Viewing.Document.load("urn:" + urn, async (doc) => {
      // model path looks something like this: urn:adsk.viewing:fs.file:.../output/.../primaryGraphics.f2d
      let sheets = doc.getRoot().search({ type: "geometry", role: "2d" });

      // Load 2 sheet
      let model1 = await viewer.loadDocumentNode(doc, sheets[0], {
        keepCurrentModels: true,
      });
      let model2 = await viewer.loadDocumentNode(doc, sheets[1], {
        keepCurrentModels: true,
      });

      // Compare them
      const cpExt = await viewer.loadExtension(
        "Autodesk.Viewing.PixelCompare"
      );
      cpExt.compareTwoModels(model1, model2);
    });
  });
}
