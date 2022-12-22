## Node JS CLI Password Manager

### To install this on your system, follow these steps:

1.  clone the repository.
2.  If you are using a mac/ Linux system, then it will cause errors.
    *   replace the command "var proc = require('child\_process').spawn('_**clip**_');"
    *   to -> "var proc = require('child\_process').spawn('_**pbcopy**_');"
3.  Open the repo in your system within the PWD.
4.  On CMD, "npm install -g".
5.  In CMD with any path, trigger the app with the "passmanager" command.