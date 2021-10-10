/* The script is deployed as a web app and renders the form */
function doGet(e) {
    return HtmlService.createHtmlOutputFromFile('form.html')
              .setSandboxMode(HtmlService.SandboxMode.NATIVE);
    // This is important as file upload fail in IFRAME Sandbox mode.
  }
  
  /* This function will process the submitted form */
  function uploadFiles(form) {
  
    try {
  
      /* Name of the Drive folder where the files should be saved */
      var dropbox = "Test Form Submissions";
      var folder, folders = DriveApp.getFoldersByName(dropbox);
  
      /* Find the folder, create if the folder does not exist */
      if (folders.hasNext()) {
        folder = folders.next();
      } else {
        folder = DriveApp.createFolder(dropbox);
      } 
  
      /* Get the file uploaded though the form as a blob */
      var blob = form.myFile;
      var file = folder.createFile(blob);
  
      //Allocate variables for submissions in sheet
      var namerecord = form.myName;
      var emailrecord = form.myEmail;
  
      /* Set the file description as the name of the uploader */
      file.setDescription("Uploaded by " + form.myName);
  
      /* Return the download URL of the file once its on Google Drive */
      return "File uploaded successfully " + file.getUrl();
  
      var uploadURL = file.getUrl();
  
  
    //
  
    } catch (error) {
  
      /* If there's an error, show the error message */
      return error.toString();
    }
  
    var googsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1PbOi6PVjSWYFvjIYQXB5PbazvHXC8FrBL4M4Sj0uuRQ/edit?usp=sharing');
    Logger.log(googsheet.getName());
  
    var sheet = googsheet.getSheets()[0];
    sheet.appendRow(["James", "jim", "abc"]);
  }