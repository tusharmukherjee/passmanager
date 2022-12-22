## Node JS CLI Password Manager

### To install this on your system, follow these steps:

1.  clone the repository.
2.  If you are using a mac/ Linux system, then it will cause errors.
    *   replace the command "var proc = require('child\_process').spawn('_**clip**_');"
    *   to -> "var proc = require('child\_process').spawn('_**pbcopy**_');"
3.  Open the repo in your system within the PWD.
4.  On CMD, "npm install -g".
5.  In CMD with any path, trigger the app with the "passmanager" command.

##### NO THIRD-PARTY PACKAGE IS USED!

> #### Password Generator Length(16)
![](https://i.imgur.com/FhQzZLd.jpg)
> #### Find Password & Copy to Clipboard  
![](https://i.imgur.com/B7Fz2Tk.jpg)
> #### Save new password
![](https://i.imgur.com/Enbk87V.jpg)

> NOTE: Don't delete it, wherever you clone the folder. After installing globally through npm, it will create the shortcut to the node_modules repository inside the "home" repo, which actually links to program folder.