const fs = require('fs');

const wppconnect = require('@wppconnect-team/wppconnect');

let chromiumArgs = ['--disable-web-security', '--no-sandbox', '--disable-web-security', '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache', '--disable-offline-load-stale-cache', '--disk-cache-size=0', '--disable-background-networking', '--disable-default-apps', '--disable-extensions', '--disable-sync', '--disable-translate', '--hide-scrollbars', '--metrics-recording-only', '--mute-audio', '--no-first-run', '--safebrowsing-disable-auto-update', '--ignore-certificate-errors', '--ignore-ssl-errors', '--ignore-certificate-errors-spki-list'];


const axios = require('axios');


function capitalize(word) {
    try {
        var name = word[0].toUpperCase() + word.slice(1).toLowerCase();
        return name;
    } catch (error) {
        var name = word.substring(1);
        name = name[0].toUpperCase() + name.slice(1).toLowerCase();
        return name;
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

class botController {

    static async sendText2(req, res) {
        const data = req.body;
        //console.log(data)
        // formato esperado do req:
        // [
        // 	{
        // 		"msg": "Tenho  um Presente para vc!🎁 \n Se matriculando no curso de Cabeleireiro Profissional, vc ganha mais um curso completo de Especialização em Penteados. \n Corre se matricular e garantir um futuro brilhante❗ \n Quer mais informações me chama 💜",
        // 		"username": "douglas"
        // 	},
        // 	{
        // 		"nome": "DouGLAS Pivoto",
        // 		"tel": "45999322320"
        // 	},
        // 	{
        // 		"nome": "dOUGLAS LASASL LASAS",
        // 		"tel": "45999322320"
        // 	}
        // ]

        wppconnect
            .create({
                session: data[0].username,
                folderNameToken: 'tokens', //folder name when saving tokens
                mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
                headless: true, // Headless chrome
                devtools: false, // Open devtools by default
                useChrome: true, // If false will use Chromium instance
                debug: false, // Opens a debug session
                browserWS: '', // If u want to use browserWSEndpoint
                browserArgs: chromiumArgs,
                logQR: true, // Logs QR automatically in terminal                
                disableWelcome: true, // Will disable the welcoming message which appears in the beginning
                updatesLog: true, // Logs info updates automatically in terminal
                autoClose: 0, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)                
                createPathFileToken: true,
                waitForLogin: true
            })
            .then(async (client) => {
                await client.waitForLogin().then(async () => {
                    var blocklist = await client.getBlockList();
                    for (let i = 1; i < data.length; i++) {
                        const dado = data[i];
                        var numero = dado.tel1;
                        if (dado.nome.charAt(0) == ' ') {
                            dado.nome.substring(1);
                        }
                        var nome = dado.nome.split(' ');
                        if (Number.isInteger(numero)) {} else {
                            numero = numero.replace(/[^\d]/g, '');
                        }
                        try {
                            numero = String(numero)
                            if (numero.length === 11) {
                                numero = numero.slice(0, 2) + numero.slice(3, numero.length);
                            }
                            var verificablock = blocklist.includes('55' + numero + '@c.us');
                            if (verificablock === false) {
                                await client.sendText('55' + numero + '@c.us', capitalize(nome[0]) + ' ' + data[0].msg).then((result) => {
                                        console.log(result);
                                        if (result != false) {

                                        } else {

                                        }
                                    })
                                    .catch((erro) => {
                                        console.error('Error when sending: ', erro); //return object error
                                    });
                            } else {
                                console.log('ta bloqueado');
                            }
                        } catch (error) {
                            console.log('deu erro:', error);
                        }
                        await sleep(3000);
                    }
                }).catch((erro) => {
                    console.log('Erro no waitforlogin:', erro);
                })
            })
            .catch((erro) => {
                console.log('Ta caindo nessa merda:', erro);
            });
        res.status(200).json({
            status: 'ok2'
        });
    }

    static async sendImg(req, res) {
        const data = req.body;
        //console.log(data)
        // formato esperado do req:
        // [
        // 	{
        // 		"msg": "Tenho  um Presente para vc!🎁 \n Se matriculando no curso de Cabeleireiro Profissional, vc ganha mais um curso completo de Especialização em Penteados. \n Corre se matricular e garantir um futuro brilhante❗ \n Quer mais informações me chama 💜",
        // 		"username": "douglas"
        // 	},
        // 	{
        // 		"nome": "DouGLAS Pivoto",
        // 		"tel": "45999322320"
        // 	},
        // 	{
        // 		"nome": "dOUGLAS LASASL LASAS",
        // 		"tel": "45999322320"
        // 	}
        // ]

        wppconnect
            .create({
                session: data[0].username,
                folderNameToken: 'tokens', //folder name when saving tokens
                mkdirFolderToken: '', //folder directory tokens, just inside the folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
                headless: true, // Headless chrome
                devtools: false, // Open devtools by default
                useChrome: true, // If false will use Chromium instance
                debug: false, // Opens a debug session
                browserWS: '', // If u want to use browserWSEndpoint
                browserArgs: chromiumArgs,
                logQR: true, // Logs QR automatically in terminal                
                disableWelcome: true, // Will disable the welcoming message which appears in the beginning
                updatesLog: true, // Logs info updates automatically in terminal
                autoClose: 0, // Automatically closes the bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)                
                createPathFileToken: true,
                waitForLogin: true
            })
            .then(async (client) => {
                await client.waitForLogin().then(async () => {
                    for (let i = 1; i < data.length; i++) {
                        const dado = data[i];
                        //console.log(dado);
                        var numero = dado.tel1;
                        var nome = dado.nome.split(' ');
                        if (Number.isInteger(numero)) {

                        } else {
                            numero = numero.replace(/[^\d]/g, '');
                        }


                        await client.sendFile('55' + numero + '@c.us', 'img/vid1.mp4', 'vid1.mp4', capitalize(nome[0]) + ' ' + data[0].msg).then((result) => {
                                console.log(result);
                                if (result != false) {
                                    axios.post(site + '/loginwhats/msgenviada?erro=0', {
                                            msg: data[0].msg,
                                            tel1: dado.tel1,
                                            tel2: dado.tel2,
                                            tel3: dado.tel3
                                        })
                                        .then(function (response) {
                                            //console.log(response);
                                            console.log("erro=0");
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                            //console.log("Erro=0 erro")
                                        });
                                } else {
                                    axios.post(site + '/loginwhats/msgenviada?erro=1', {
                                            msg: data[0].msg,
                                            tel1: dado.tel1,
                                            tel2: dado.tel2,
                                            tel3: dado.tel3
                                        })
                                        .then(function (response) {
                                            //console.log(response);
                                            console.log("erro=1");
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                            //console.log("Erro=1 erro")
                                        });
                                }
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });

                        await sleep(3000);
                        //console.log('foi')
                    }
                    //console.log('fim');
                    //await client.close();
                }).catch((erro) => {
                    console.log('Erro no waitforlogin:', erro);
                })
            })
            .catch((erro) => {
                console.log('Ta caindo nessa merda:', erro);
            });
        res.status(200).json({
            status: 'ok2'
        });
    }

    static async verifyNumeroNaoExiste(req, res) {
        const data = req.body;

        // formato esperado do req:
        // [
        // 	{
        // 		"msg": "Tenho  um Presente para vc!🎁 \n Se matriculando no curso de Cabeleireiro Profissional, vc ganha mais um curso completo de Especialização em Penteados. \n Corre se matricular e garantir um futuro brilhante❗ \n Quer mais informações me chama 💜",
        // 		"username": "douglas"
        // 	},
        // 	{
        // 		"nome": "DouGLAS Pivoto",
        // 		"tel": "45999322320"
        // 	},
        // 	{
        // 		"nome": "dOUGLAS LASASL LASAS",
        // 		"tel": "45999322320"
        // 	}
        // ]

        wppconnect
            .create(
                data[0].username,
                undefined,
                undefined, {
                    folderNameToken: 'tokens', //folder name when saving tokens
                    mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
                    headless: true, // Headless chrome
                    devtools: false, // Open devtools by default
                    useChrome: false, // If false will use Chromium instance
                    debug: false, // Opens a debug session
                    browserWS: '', // If u want to use browserWSEndpoint
                    browserArgs: ['--disable-web-security', '--no-sandbox', '--disable-web-security',
                        '--aggressive-cache-discard', '--disable-cache', '--disable-application-cache',
                        '--disable-offline-load-stale-cache', '--disk-cache-size=0',
                        '--disable-background-networking', '--disable-default-apps', '--disable-extensions',
                        '--disable-sync', '--disable-translate', '--hide-scrollbars', '--metrics-recording-only',
                        '--mute-audio', '--no-first-run', '--safebrowsing-disable-auto-update',
                        '--ignore-certificate-errors', '--ignore-ssl-errors', '--ignore-certificate-errors-spki-list'
                    ], // Parameters to be added into the chrome browser instance
                    logQR: true, // Logs QR automatically in terminal                
                    disableWelcome: true, // Will disable the welcoming message which appears in the beginning
                    updatesLog: true, // Logs info updates automatically in terminal
                    autoClose: 0, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)                
                    createPathFileToken: true,
                    waitForLogin: true
                },
                null)
            .then(async (client) => {
                client.waitForLogin().then(async () => {
                    var contnum = 0;
                    for (let i = 1; i < data.length; i++) {
                        const dado = data[i];
                        var numero = dado.tel;

                        numero = numero.replace(/[^\d]/g, '');
                        try {
                            await client.checkNumberStatus('55' + numero + '@c.us').then((result) => {
                                    //console.log('Result: ', result); //return object success
                                    if (result.status == 404) {
                                        contnum += 1;
                                    }
                                })
                                .catch((erro) => {
                                    console.error('Error when sending: ', erro); //return object error
                                });
                        } catch (error) {

                        }


                        await sleep(1000);
                        //console.log('foi')
                    }
                    //console.log(contnum);
                    //console.log('fim');
                    //client.close();
                }).catch((erro) => {
                    console.log('Erro no waitforlogin:', erro);
                })
            })
            .catch((erro) => {
                console.log('Ta caindo nessa merda:', erro);
            });
        res.status(200).json('ok2');
    }

    static async sendImg2(req, res) {
        const data = req.body;

        // formato esperado do req:
        // [
        // 	{
        // 		"msg": "Tenho  um Presente para vc!🎁 \n Se matriculando no curso de Cabeleireiro Profissional, vc ganha mais um curso completo de Especialização em Penteados. \n Corre se matricular e garantir um futuro brilhante❗ \n Quer mais informações me chama 💜",
        // 		"username": "douglas"
        // 	},
        // 	{
        // 		"nome": "DouGLAS Pivoto",
        // 		"tel": "45999322320"
        // 	},
        // 	{
        // 		"nome": "dOUGLAS LASASL LASAS",
        // 		"tel": "45999322320"
        // 	}
        // ]

        wppconnect
            .create({
                session: data[0].username,
                folderNameToken: 'tokens', //folder name when saving tokens
                mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
                headless: true, // Headless chrome
                devtools: false, // Open devtools by default
                useChrome: false, // If false will use Chromium instance
                debug: false, // Opens a debug session
                browserWS: '', // If u want to use browserWSEndpoint
                browserArgs: chromiumArgs,
                logQR: true, // Logs QR automatically in terminal                
                disableWelcome: true, // Will disable the welcoming message which appears in the beginning
                updatesLog: true, // Logs info updates automatically in terminal
                autoClose: 0, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)                
                createPathFileToken: true,
                waitForLogin: true
            })
            .then(async (client) => {
                client.waitForLogin().then(async () => {
                    for (let i = 1; i < data.length; i++) {
                        const dado = data[i];
                        var numero = dado.tel;
                        var nome = dado.nome.split(' ');
                        numero = numero.replace(/[^\d]/g, '');

                        await client.sendFile('55' + numero + '@c.us', 'img/vid1.mp4', 'image', capitalize(nome[0]) + data[0].msg).then((result) => {
                                //console.log('Result: ', result); //return object success
                            })
                            .catch((erro) => {
                                console.error('Error when sending: ', erro); //return object error
                            });

                        await sleep(3000);
                        //console.log('foi')
                    }
                    //console.log('fim');
                    //client.close();
                })
            })
            .catch((erro) => {
                console.log(erro);
            });

        res.status(200).json('ok2');
    }

    static async loginSession(req, res) {
        const data = req.body
        console.log(data)
        wppconnect
            .create(data.username,
                (base64Qrimg, asciiQR, attempts, urlCode) => {
                    //console.log('base64 image string qrcode: ', base64Qrimg);
                    res.status(200).json({
                        img: base64Qrimg
                    })
                },
                undefined, {
                    folderNameToken: 'tokens', //folder name when saving tokens
                    mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
                    headless: true, // Headless chrome
                    devtools: false, // Open devtools by default
                    useChrome: false, // If false will use Chromium instance
                    debug: false, // Opens a debug session
                    browserWS: '', // If u want to use browserWSEndpoint
                    browserArgs: chromiumArgs,
                    logQR: true, // Logs QR automatically in terminal                
                    disableWelcome: true, // Will disable the welcoming message which appears in the beginning
                    updatesLog: true, // Logs info updates automatically in terminal
                    autoClose: 0, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)                
                    createPathFileToken: true,
                    waitForLogin: true
                }
            )
            .then(client => {
                res.status(200).json({
                    status: "ok"
                })
                //client.close()
            })
            .catch((erro) => {
                console.log(erro);
            })
    }

    static async verifySession(req, res) {
        const data = req.body
        //console.log(data)
        wppconnect
            .create(data.username)
            .then(client => {
                //console.log("ok")
                //client.close()
                res.status(200).json({
                    status: "ok"
                })
            })
            .catch((erro) => {
                console.log(erro);
            })
    }
}

module.exports = botController