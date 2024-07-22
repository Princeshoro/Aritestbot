/* 
 * Created By Shyro
 * MIT Licence
 * Copyright: 2023 - 2024
 * Thanks For Slemek And XYZ Team
 * Wea Bot || Airi Multidevice
 * Contact Support: +6287735348548
 * Buy the script to get all code ･⁠ ⁠〰⁠ ⁠･⁠ 
 */

(async () => {
  // Require the necessary modules
  require("./config");
  const {
    default: Baileys,
    useMultiFileAuthState,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    makeWASocket,
    DisconnectReason,
    fetchLatestBaileysVersion,
    PHONENUMBER_MCC,
    getAggregateVotesInPollMessage,
  } = require('@whiskeysockets/baileys');

  // Other required modules
  const path = require("path");
  const pino = require("pino");
  const fs = require('fs');
  const readline = require("readline");
  const NodeCache = require("node-cache");
  const yargs = require("yargs/yargs");
  const { promisify } = require("util");
  const exec = promisify(require("child_process").exec);
  const lodash = require("lodash");
  const syntaxError = require("syntax-error");
  const os = require('os');
  const chalk = require("chalk");

  // Custom modules and initialization
  let simpleFunction = require("./function/simple");
  var lowdb;
  try {
    lowdb = require("lowdb");
  } catch (err) {
    lowdb = require("./function/lowdb");
  }

  const {
    Low,
    JSONFile
  } = lowdb;
  const mongoDB = require("./function/mongoDB");

  // API utility function
  API = (name, path = '/', params = {}, key) => (name in APIs ? APIs[name] : name) + path + (params || key ? '?' + new URLSearchParams(Object.entries({
    ...params,
    ...key ? { [key]: APIKeys[name in APIs ? APIs[name] : name] } : {}
  })) : '');

  // Timestamps
  timestamp = {
    'start': new Date()
  };

  // Global options and configurations
  const PORT = process.env.PORT || 3000;
  global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
  global.prefix = new RegExp('^[' + (opts.prefix || "xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-").replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + ']');
  
  // Database setup
  db = new Low(/https?:\/\//.test(opts.db || '') ? new cloudDBAdapter(opts.db) : /mongodb/i.test(opts.db) ? new mongoDB(opts.db) : new JSONFile((opts._[0] ? opts._[0] + '_' : '') + "database.json"));
  DATABASE = db;
  loadDatabase = async function loadDatabase() {
    if (db.READ) {
      return new Promise(resolve => setInterval(function () {
        if (!db.READ) {
          clearInterval(this);
          resolve(db.data == null ? loadDatabase() : db.data);
        }
      }, 1000));
    }
    if (db.data !== null) {
      return;
    }
    db.READ = true;
    await db.read();
    db.READ = false;
    db.data = {
      'users': {},
      'chats': {},
      'stats': {},
      'msgs': {},
      'sticker': {},
      'settings': {},
      'respon': {},
      ...(db.data || {})
    };
    db.chain = lodash.chain(db.data);
  };
  loadDatabase();

  // Authentication setup
  global.authFile = 'AiriSessi';
  const {
    state,
    saveState,
    saveCreds
  } = await useMultiFileAuthState(global.authFile);

  // Socket and connection setup
  const msgRetryCounterCache = new NodeCache();
  const rl = readline.createInterface({
    'input': process.stdin,
    'output': process.stdout
  });
  const askQuestion = question => new Promise(resolve => rl.question(question, resolve));
  
  const socketConfig = {
    'logger': pino({ 'level': "silent" }),
    'printQRInTerminal': false,
    'browser': ["Ubuntu", 'Edge', "110.0.1587.56"],
    'auth': {
      'creds': state.creds,
      'keys': makeCacheableSignalKeyStore(state.keys, pino({ 'level': 'fatal' }).child({ 'level': "fatal" }))
    },
    'markOnlineOnConnect': true,
    'generateHighQualityLinkPreview': true,
    'getMessage': async key => {
      let jid = jidNormalizedUser(key.remoteJid);
      let message = await store.loadMessage(jid, key.id);
      return message?.["message"] || '';
    },
    'msgRetryCounterCache': msgRetryCounterCache,
    'msgRetryCounterMap': {},
    'defaultQueryTimeoutMs': undefined
  };

  global.conn = simpleFunction.makeWASocket(socketConfig);

  // Pairing and authentication handling
  if (true && !conn.authState.creds.registered) {
    const phoneNumber = await askQuestion(chalk.green.underline("Masukkan Nomor WeaBot Milikmu:\n"));
    const pairingCode = await conn.requestPairingCode(phoneNumber);
    setTimeout(async () => {
      console.log(chalk.green.bold("Nih Kodenya: " + pairingCode));
    }, 3000);
  }
  
  conn.isInit = false;
  
  if (!opts.test) {
    if (db) {
      setInterval(async () => {
        if (global.db.data) {
          await db.write();
        }
        if (opts.autocleartmp && (support || {}).find) {
          tmp = [os.tmpdir(), "tmp"];
          tmp.forEach(tmpPath => exec("find", [tmpPath, "-amin", '3', '-type', 'f', "-delete"]));
        }
      }, 30000);
    }
  }

  if (opts.server) {
    require("./server")(conn, PORT);
  }

  setInterval(async () => {
    await exec("rm -rf ./tmp/*");
  }, 3600000);

  async function getMessageContent(key) {
    if (store) {
      const message = await store.loadMessage(key.remoteJid, key.id);
      return message?.["message"];
    }
    return {
      'conversation': "Airink Is Running!"
    };
  }

  conn.ev.on("message.update", async updates => {
    for (const { key, update } of updates) {
      if (update.pollUpdate && key.fromMe) {
        const message = await getMessageContent(key);
        if (message) {
          const pollResults = await getAggregateVotesInPollMessage({
            'message': message,
            'pollUpdates': update.pollUpdates
          });
          var chosenOption = pollResults.filter(option => option.voters.length !== 0)[0]?.["name"];
          if (chosenOption == undefined) {
            return;
          }
          var command = prefix + chosenOption;
          conn.appendTextMessage(command, updates);
        }
      }
    }
  });

  async function connectionUpdate(update) {
    const {
      connection,
      lastDisconnect,
      isNewLogin
    } = update;
    global.stopped = connection;
    if (isNewLogin) {
      conn.isInit = true;
    }
    const statusCode = lastDisconnect?.["error"]?.["output"]?.["statusCode"] || lastDisconnect?.["error"]?.["output"]?.["payload"]?.["statusCode"];
    if (statusCode && statusCode !== DisconnectReason.loggedOut && conn?.['ws']['socket'] == null) {
      console.log(reloadHandler(true));
      global.timestamp.connect = new Date();
    }
    if (global.db.data == null) {
      loadDatabase();
    }
    if (connection == "open") {
      console.log(chalk.green.underline("Success Connect to WhatsApp Web"));
    }
    if (connection === "close") {
      console.log(chalk.red.underline("Connection Close"));
    }
    if (update.receivedPendingNotifications) {
      console.log("Bot on fire 🔥");
    }
  }

  process.on("uncaughtException", console.error);

  let handlerInitialized = true;
  let handler = require("./handler");
  
  reloadHandler = function (forceReload) {
    let newHandler = require("./handler");
    if (Object.keys(newHandler || {}).length) {
      handler = newHandler;
    }
    if (forceReload) {
      try {
        conn.ws.close();
      } catch {}
      conn = {
        ...conn,
        ...simpleFunction.makeWASocket(socketConfig)
      };
    }
if (!handlerInitialized) {
    const reloadHandler = function (initialize) {
        let handler = require("./handler");
        if (Object.keys(handler || {}).length) {
            connHandler = handler;
        }
        if (initialize) {
            try {
                conn.ws.close();
            } catch (e) { }
            conn = {
                ...conn,
                ...simple.makeWASocket(connOptions)
            };
        }
        if (!handlerInitialized) {
            conn.ev.off('messages.upsert', conn.handler);
            conn.ev.off("group-participants.update", conn.onParticipantsUpdate);
            conn.ev.off("connection.update", conn.connectionUpdate);
            conn.ev.off("creds.update", conn.credsUpdate);
        }
        conn.welcome = "Welcome to *@subject* @user\nHope you enjoy and don't forget to read the description\n@desc";
        conn.bye = "Goodbye @user,\nHope you find peace wherever you go.";
        conn.spromote = "@user has been promoted";
        conn.sdemote = "@user has been demoted";
        conn.handler = connHandler.handler.bind(conn);
        conn.onParticipantsUpdate = connHandler.participantsUpdate.bind(conn);
        conn.connectionUpdate = connectionUpdate.bind(conn);
        conn.credsUpdate = saveCreds.bind(conn);
        conn.ev.on("messages.upsert", conn.handler);
        conn.ev.on("group-participants.update", conn.onParticipantsUpdate);
        conn.ev.on("connection.update", conn.connectionUpdate);
        conn.ev.on("creds.update", conn.credsUpdate);
        handlerInitialized = false;
        return true;
    };
    let featuresDir = path.join(__dirname, "features");
    let isJavaScriptFile = fileName => /\.js$/.test(fileName);
    features = {};
    for (let featureFile of fs.readdirSync(featuresDir).filter(isJavaScriptFile)) {
        try {
            features[featureFile] = require(path.join(featuresDir, featureFile));
        } catch (e) {
            conn.logger.error(e);
            delete features[featureFile];
        }
    }
    const reloadFeature = (event, fileName) => {
        if (/\.js$/.test(fileName)) {
            let filePath = path.join(featuresDir, fileName);
            if (filePath in require.cache) {
                delete require.cache[filePath];
                if (fs.existsSync(filePath)) {
                    conn.logger.info("re-require plugin '" + fileName + "'");
                } else {
                    conn.logger.warn("deleted plugin '" + fileName + "'");
                    return delete features[fileName];
                }
            } else {
                conn.logger.info("requiring new plugin '" + fileName + "'");
            }
            let error = syntaxError(fs.readFileSync(filePath), fileName);
            if (error) {
                conn.logger.error("syntax error while loading '" + fileName + "'\n" + error);
            } else {
                try {
                    features[fileName] = require(filePath);
                } catch (e) {
                    conn.logger.error("error require plugin '" + fileName + "\n" + e + "'");
                } finally {
                    features = Object.fromEntries(Object.entries(features).sort((a, b) => a[0].localeCompare(b[0])));
                }
            }
        }
    };
    Object.freeze(reloadFeature);
    fs.watch(path.join(__dirname, 'features'), reloadFeature);
    reloadHandler();
    async function quickTest() {
        let tests = await Promise.all([
            childProcess.spawn('ffmpeg'),
            childProcess.spawn('ffprobe'),
            childProcess.spawn('ffmpeg', ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", '1', '-f', "webp", '-']),
            childProcess.spawn("convert"),
            childProcess.spawn('magick'),
            childProcess.spawn('gm'),
            childProcess.spawn("find", ["--version"])
        ].map(proc => {
            return Promise.race([new Promise(resolve => {
                proc.on("close", code => {
                    resolve(code !== 127);
                });
            }), new Promise(resolve => {
                proc.on("error", () => resolve(false));
            })]);
        }));
        let [
            ffmpegInstalled,
            ffprobeInstalled,
            ffmpegWebpInstalled,
            convertInstalled,
            magickInstalled,
            gmInstalled,
            findInstalled
        ] = tests;
        console.log(tests);
        let support = {
            ffmpeg: ffmpegInstalled,
            ffprobe: ffprobeInstalled,
            ffmpegWebp: ffmpegWebpInstalled,
            convert: convertInstalled,
            magick: magickInstalled,
            gm: gmInstalled,
            find: findInstalled
        };
        Object.freeze(support);
        if (!support.ffmpeg) {
            conn.logger.warn("Please install ffmpeg for sending videos (pkg install ffmpeg)");
        }
        if (support.ffmpeg && !support.ffmpegWebp) {
            console.log(chalk.yellow.bold("Stickers may not animate without libwebp on ffmpeg (--enable-libwebp while compiling ffmpeg)"));
        }
        if (!support.convert && !support.magick && !support.gm) {
            console.log(chalk.yellow.bold("⚠️ Stickers may not work without ImageMagick if libwebp on ffmpeg is not installed (pkg install imagemagick)"));
        }
    }
    quickTest().then(() => console.log(chalk.green.bold("✅ Quick Test Done"))).catch(console.error);
}
function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
