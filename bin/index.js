#!/usr/bin/env node
const readline = require('readline');
const fs = require('fs/promises');
const fscallb = require('fs');
var proc = require('child_process').spawn('clip');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const home = () => {
    rl.question("Please choose an action:\n"
        + "a) Password Generator\n"
        + "b) Find Password\n"
        + "c) Save New Password\n"
        + "d) Exit\n"
        , line => {    
            switch (line) {
                case "a":
                    console.log("\x1b[41m%s\x1b[0m","Password Generator •••••••••")
                    // passwdGen(); // PASSWDGEN
                    generatePassword();
                    break;
                case "b":
                    console.log("\x1b[41m%s\x1b[0m","Find Password •••••••••")
                    findPasswd(); // FIND PASSWD
                    // return rl.close();
                    break;
                case "c":
                    console.log("\x1b[41m%s\x1b[0m","Save Password •••••••••")
                    savePasswd(); // FIND PASSWD
                    // return rl.close();
                    break;
                case "d":
                    // rl.close();
                    process.exit();
                default:
                    console.log("No such action. Please try again...");
            }
            home();
        });
};

// PASSWORD GENERTOR ---------------------------------------

function generatePassword(length = 16) {
    const chars = '+_)(*&^%$#@!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let passwordd = '';
  
    // Generate a random passwordd by selecting a random character from the chars string
    for (let i = 0; i < length; i++) {
      passwordd += chars[Math.floor(Math.random() * chars.length)];
    }
    proc.stdin.write(passwordd); proc.stdin.end();
    console.log("\x1b[34m%s\x1b[0m","PASSWORD GENERATED AND COPIED TO CLIPBOARD");
    home();
}

// FIND LIST IDENTIFIER-------------------------------------

const findPasswd = () => {

    rl.question("Please choose an action:\n"
        + "a) Password List\n"
        + "b) Get Password\n"
        + "c) Home\n"
        , line => {    
            switch (line) {
                case "a":
                    // LIST FUNCTION
                    if (!fscallb.existsSync('./passcssv.csv')) {
                        console.log("file created, and it is empty")
                        fs.writeFile('./passcssv.csv','')
                    }
                    else{
                    fs.readFile('./passcssv.csv','utf-8').then((data)=>{
                        // readata = data;
                        // console.log(data);
                        return data;
                    }).then((res)=>{
                        if(res.length ==0 ){
                            throw "FILE IS EMPTY, NO PASSWORD"
                        }
                        let newarr = [];
                        res.split('\n').map((el)=>{
                            newarr.push(el.split(','));
                        })
                        return newarr;
                    }).then((res)=>{
                        let newobj = [];
                        res.map((el)=>{
                            let singleobj = {
                                Name: el[0],
                                Password: el[1]
                            }
                            newobj.push(singleobj);
                        });
                        return newobj;
                    }).then((res)=>{
                        console.log("\x1b[34m%s\x1b[0m","List Here •••••••••");
                        res.map((el,index)=>{
                            console.log("\x1b[32m%s\x1b[0m",`${index+1 + "->" + el.Name}`);
                        });
                        findPasswd();
                        // return "success";
                    })
                    .catch((err)=>{
                        console.log("\x1b[31m%s\x1b[0m",err);
                        home();
                    })
                    break;
                }
                case "b":
                    console.log("\x1b[41m%s\x1b[0m","Get Password •••••••••");
                    findPassinList(); // FIND PASSWD
                    break;
                case "c":
                    home(); // FIND PASSWD
                    // return rl.close();
                    break;
                default:
                    console.log("No such action. Please try againfp...");
                    findPasswd();
            }
            // findPasswd();
        });
    
};

// GET PASSWORD ---------------------------------------------

const findPassinList=()=>{

    rl.question("Please choose an action:\n"
    + "a) password from INDEX\n"
    + "b) password by inputting identifiers\n"
    + "c) home\n"
    , line => {    
        switch (line) {
            case "a":
                console.log("find password from INDEX •••••••••")
                
                rl.question("INDEX: ", index => {
                    fs.readFile('./passcssv.csv','utf8').then((data)=>{
                        return data;
                    })
                    .then((res)=>{
                        if(res.length == 0){
                            throw "FILE IS EMPTY";
                        }
                        let newarr = [];
                        res.split('\n').map((el)=>{
                            newarr.push(el.split(','));
                        })
                        return newarr;
                    }).then((res)=>{
                        let newobj = [];
                        res.map((el)=>{
                            let singleobj = {
                                Name: el[0],
                                Password: el[1]
                            }
                            newobj.push(singleobj);
                        });
                        return newobj;
                    }).then((res)=>{
                        if(res[index-1] !== undefined){
                           console.log("\x1b[44m%s\x1b[0m",`${res[index-1].Password}`); 
                           proc.stdin.write(res[index-1].Password); proc.stdin.end();
                           console.log("\x1b[34m%s\x1b[0m","PASSWORD FOUND AND COPIED TO CLIPBOARD");
                        }
                        else{
                            console.log("\x1b[31m%s\x1b[0m","PASSWORD NOT FOUND");
                        }
                        findPassinList();
                    })
                    .catch((err)=>{
                        console.log("\x1b[31m%s\x1b[0m",err);
                        home();
                    })
                })

                break;
            case "b":
                console.log("find password by inputting identifiers •••••••••")
                findPasswdInp(); // FIND PASSWD
                // return rl.close();
                break;
            case "c":
                console.log("\x1b[41m%s\x1b[0m","HOME •••••••••");
                home(); // FIND PASSWD
                // return rl.close();
                break;
            default:
                console.log("No such action. Please try again...");
        }
        findPassinList();
    });

}



const findPasswdInp = () =>{
    rl.question("ENTER IDENTIFIER: ", input =>{
        fs.readFile('./passcssv.csv','utf-8').then((data)=>{
            return data;
        }).then((res)=>{
            let newarr = [];
            res.split('\n').map((el)=>{
                newarr.push(el.split(','));
            })
            return newarr;
        }).then((res)=>{
            let newobj = [];
            res.map((el)=>{
                let singleobj = {
                    Name: el[0],
                    Password: el[1]
                }
                newobj.push(singleobj);
            });
            return newobj;
        }).then((res)=>{

            let found = false;
            for(let i = 0; i< res.length; i++){
                let test = Object.values(res[i]).find(val => val == input);
                if(test === input){
                    found = res[i].Password;
                    break;
                }
            }

            if(found!=false){
               console.log("\x1b[44m%s\x1b[0m",`${found}`);
               proc.stdin.write(found); proc.stdin.end();
               console.log("\x1b[34m%s\x1b[0m","PASSWORD FOUND AND COPIED TO CLIPBOARD");
            }
            else{
                console.log("\x1b[31m%s\x1b[0m",`No Identifier Found with the NAME: ${input}`); 
            }
            findPassinList();
        })
    })
}

// C SAVE PASSWORD ------------------------------------------

const savePasswd = () => {

    rl.question("Name to identify your password: "
        , line => {
            identName = line;

            fs.readFile('./passcssv.csv','utf-8').then((data)=>{
                return data;
            }).then((res)=>{
                let newarr = [];
                res.split('\n').map((el)=>{
                    newarr.push(el.split(','));
                })
                return newarr;
            }).then((res)=>{
                let newobj = [];
                res.map((el)=>{
                    let singleobj = {
                        Name: el[0],
                        Password: el[1]
                    }
                    newobj.push(singleobj);
                });
                return newobj;
            }).then((res)=>{
    
                let found = false;
                for(let i = 0; i< res.length; i++){
                    let test = Object.values(res[i]).find(val => val == identName);
                    if(test === identName){
                        found = res[i].Password;
                        console.log(found);
                        break;
                    }
                }
    
                if(found!=false){
                    console.log("\x1b[31m%s\x1b[0m",`Password with same NAME exist: ${identName}`); 
                    savePasswd();
                }
                else{
                    getPasswd();
                }
            })
        });
};

const getPasswd = () => {
    let prevPass;
    fs.readFile('./passcssv.csv','utf-8').then((data)=>{
        // readata = data;
        // console.log(data);  
        return data;
    }).then((res)=>{
        let newarr = [];
        if(res == ''){
            prevPass = newarr;
        }
        else{
            res.split('\r\n').map((el)=>{
                newarr.push(el);
            });
            prevPass = newarr;  
        }
        // return newarr;
    });
    rl.question("Enter your passwd: "
        , line => {
            // function to store passwd -----
            // function to push the password in csv ------
            password = line;
            if(line == ''){
                console.log("\x1b[31m%s\x1b[0m","Password must contain some characters!");
                getPasswd();
            }
            else{
            prevPass.push(`${identName},${password}`);
            if(prevPass.length == 0){
                fs.writeFile('./passcssv.csv',prevPass);
            }
            else{
                fs.writeFile('./passcssv.csv',prevPass.join('\n'));
            }
            console.log("\x1b[32m%s\x1b[0m","Password Saved!",);
            home();
        }
            // rl.close();
        });
};

home();