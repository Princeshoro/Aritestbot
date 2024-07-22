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
  require("./AiriSystem");
  const {
    default: _0xaf1917,
    useMultiFileAuthState: _0x32a72d,
    makeInMemoryStore: _0x21999a,
    makeCacheableSignalKeyStore: _0x40e8b3,
    makeWALegacySocket: _0x20497e,
    DisconnectReason: _0x17722e,
    fetchLatestBaileysVersion: _0x1a5aca,
    PHONENUMBER_MCC: _0x2b5be2,
    getAggregateVotesInPollMessage: _0xbabfb4
  } = require("@whiskeysockets/baileys");
  const _0x3956ff = require("path");
  const _0x1d8885 = require("pino");
  const _0x24cea7 = require("pino");
  const _0x119e55 = require('fs');
  const _0xff37c7 = require("readline");
  const _0x504d39 = require("node-cache");
  const _0xd225ec = require("yargs/yargs");
  const _0x3376a7 = require("child_process");
  const {
    promisify: _0x36469e
  } = require("util");
  const _0xdde20e = _0x36469e(_0x3376a7.exec).bind(_0x3376a7);
  const _0x295b1d = require("lodash");
  const _0x4f13f6 = require("syntax-error");
  const _0x43ef24 = require('os');
  const _0x5c33c2 = require("chalk");
  let _0x23d5ed = require("./function/simple");
  var _0x1b2693;
  try {
    _0x1b2693 = require("lowdb");
  } catch (_0x112eee) {
    _0x1b2693 = require("./function/lowdb");
  }
  const {
    Low: _0x5caeaa,
    JSONFile: _0x510965
  } = _0x1b2693;
  const _0x1b28ed = require("./function/mongoDB");
  API = (_0x5d90a3, _0x362259 = '/', _0x5301cf = {}, _0x2d7d54) => (_0x5d90a3 in APIs ? APIs[_0x5d90a3] : _0x5d90a3) + _0x362259 + (_0x5301cf || _0x2d7d54 ? '?' + new URLSearchParams(Object.entries({
    ..._0x5301cf,
    ...(_0x2d7d54 ? {
      [_0x2d7d54]: APIKeys[_0x5d90a3 in APIs ? APIs[_0x5d90a3] : _0x5d90a3]
    } : {})
  })) : '');
  timestamp = {
    'start': new Date()
  };
  const _0x5e4971 = process.env.PORT || 0xbb8;
  global.opts = new Object(_0xd225ec(process.argv.slice(0x2)).exitProcess(false).parse());
  global.prefix = new RegExp('^[' + (opts.prefix || "â€ŽxzXZ/i!#$%+Â£Â¢â‚¬Â¥^Â°=Â¶âˆ†Ã—Ã·Ï€âˆšâœ“Â©Â®:;?&.\\-").replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + ']');
  db = new _0x5caeaa(/https?:\/\//.test(opts.db || '') ? new cloudDBAdapter(opts.db) : /mongodb/i.test(opts.db) ? new _0x1b28ed(opts.db) : new _0x510965((opts._[0x0] ? opts._[0x0] + '_' : '') + "database.json"));
  DATABASE = db;
  loadDatabase = async function _0x59bc0d() {
    if (db.READ) {
      return new Promise(_0xc11792 => setInterval(function () {
        if (!db.READ) {
          clearInterval(this);
          _0xc11792(db.data == null ? _0x59bc0d() : db.data);
        } else {
          null;
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
    db.chain = _0x295b1d.chain(db.data);
  };
  loadDatabase();
  global.authFile = 'AiriSessi';
  const {
    state: _0x3f470b,
    saveState: _0xcb718b,
    saveCreds: _0xbd6235
  } = await _0x32a72d(global.authFile);
  const _0xab74e0 = _0x57d5d0 => {};
  const _0x36364f = new _0x504d39();
  const _0xe700fc = _0xff37c7.createInterface({
    'input': process.stdin,
    'output': process.stdout
  });
  const _0x2425a4 = _0x5b2186 => new Promise(_0x50ca7e => _0xe700fc.question(_0x5b2186, _0x50ca7e));
  const _0x2aa8b5 = {
    'logger': _0x1d8885({
      'level': "silent"
    }),
    'printQRInTerminal': false,
    'browser': ["Ubuntu", 'Edge', "110.0.1587.56"],
    'auth': {
      'creds': _0x3f470b.creds,
      'keys': _0x40e8b3(_0x3f470b.keys, _0x24cea7({
        'level': 'fatal'
      }).child({
        'level': "fatal"
      }))
    },
    'markOnlineOnConnect': true,
    'generateHighQualityLinkPreview': true,
    'getMessage': async _0x49733d => {
      let _0x2ad949 = jidNormalizedUser(_0x49733d.remoteJid);
      let _0x5d72d8 = await store.loadMessage(_0x2ad949, _0x49733d.id);
      return _0x5d72d8?.["message"] || '';
    },
    'msgRetryCounterCache': _0x36364f,
    'msgRetryCounterMap': _0xab74e0,
    'defaultQueryTimeoutMs': undefined
  };
  global.conn = _0x23d5ed.makeWASocket(_0x2aa8b5);
  if (true && !conn.authState.creds.registered) {
    const _0x415f60 = await _0x2425a4(_0x5c33c2.green.underline("Masukkan Nomor WeaBot Milikmu:\n"));
    const _0x17d128 = await conn.requestPairingCode(_0x415f60);
    setTimeout(async () => {
      console.log(_0x5c33c2.green.bold("Nih Kodenya: " + _0x17d128));
    }, 0xbb8);
  }
  conn.isInit = false;
  if (!opts.test) {
    if (db) {
      setInterval(async () => {
        if (global.db.data) {
          await db.write();
        }
        if (opts.autocleartmp && (support || {}).find) {
          tmp = [_0x43ef24.tmpdir(), "tmp"];
          tmp.forEach(_0x49f7da => _0x3376a7.spawn("find", [_0x49f7da, "-amin", '3', '-type', 'f', "-delete"]));
        }
      }, 30000);
    }
  }
  if (opts.server) {
    require("./server")(conn, _0x5e4971);
  }
  setInterval(async () => {
    await _0xdde20e("rm -rf ./tmp/*");
  }, 3600000);
  async function _0x56075f(_0x494fe7) {
    if (store) {
      const _0x32297c = await store.loadMessage(_0x494fe7.remoteJid, _0x494fe7.id);
      return _0x32297c?.["message"];
    }
    return {
      'conversation': "Airink Is Running!"
    };
  }
  conn.ev.on("message.update", async _0x18520c => {
    for (const {
      key: _0x15fdd5,
      update: _0x1e9362
    } of _0x18520c) {
      if (_0x1e9362.pollUpdate && _0x15fdd5.fromMe) {
        const _0x3d7e50 = await _0x56075f(_0x15fdd5);
        if (_0x3d7e50) {
          const _0x3b5bea = await _0xbabfb4({
            'message': _0x3d7e50,
            'pollUpdates': _0x1e9362.pollUpdates
          });
          var _0x1d1643 = _0x3b5bea.filter(_0x1f45dd => _0x1f45dd.voters.length !== 0x0)[0x0]?.["name"];
          if (_0x1d1643 == undefined) {
            return;
          }
          var _0x2b69c8 = prefix + _0x1d1643;
          conn.appenTextMessage(_0x2b69c8, _0x18520c);
        }
      }
    }
  });
  async function _0x55c092(_0x456d85) {
    const {
      connection: _0x470c4d,
      lastDisconnect: _0x4236ef,
      isNewLogin: _0x177052
    } = _0x456d85;
    global.stopped = _0x470c4d;
    if (_0x177052) {
      conn.isInit = true;
    }
    const _0x83a919 = _0x4236ef?.["error"]?.["output"]?.["statusCode"] || _0x4236ef?.["error"]?.["output"]?.["payload"]?.["statusCode"];
    if (_0x83a919 && _0x83a919 !== _0x17722e.loggedOut && conn?.['ws']['socket'] == null) {
      console.log(reloadHandler(true));
      global.timestamp.connect = new Date();
    }
    if (global.db.data == null) {
      loadDatabase();
    }
    if (_0x470c4d == "open") {
      console.log(_0x5c33c2.green.underline("Success Connect to whatsApp web"));
    }
    if (_0x470c4d === "close") {
      console.log(_0x5c33c2.red.underline("Connection Close"));
    }
    if (_0x456d85.receivedPendingNotifications) {
      console.log("Bot on le 🔥");
    }
  }
  process.on("uncaughtException", console.error);
  let _0x105501 = true;
  let _0x42364e = require("./handler");
  reloadHandler = function (_0x51eddf) {
    let _0x2db528 = require("./handler");
    if (Object.keys(_0x2db528 || {}).length) {
      _0x42364e = _0x2db528;
    }
    if (_0x51eddf) {
      try {
        conn.ws.close();
      } catch {}
      conn = {
        ...conn,
        ..._0x23d5ed.makeWASocket(_0x2aa8b5)
      };
    }
    if (!_0x105501) {
      conn.ev.off('messages.upsert', conn.handler);
      conn.ev.off("group-participants.update", conn.onParticipantsUpdate);
      conn.ev.off("connection.update", conn.connectionUpdate);
      conn.ev.off("creds.update", conn.credsUpdate);
    }
    conn.welcome = "Welcome to *@subject* @user\nSemoga betah Dan jangan lupa baca deskripsi\n@desc";
    conn.bye = "Goodbye @user,\nSemoga tenang di alam sana.";
    conn.spromote = "@user telah naik jabatan";
    conn.sdemote = "@user telah turun jabatan";
    conn.handler = _0x42364e.handler.bind(conn);
    conn.onParticipantsUpdate = _0x42364e.participantsUpdate.bind(conn);
    conn.connectionUpdate = _0x55c092.bind(conn);
    conn.credsUpdate = _0xbd6235.bind(conn);
    conn.ev.on("messages.upsert", conn.handler);
    conn.ev.on("group-participants.update", conn.onParticipantsUpdate);
    conn.ev.on("connection.update", conn.connectionUpdate);
    conn.ev.on("creds.update", conn.credsUpdate);
    _0x105501 = false;
    return true;
  };
  let _0x30ecd8 = _0x3956ff.join(__dirname, "features");
  let _0x282d63 = _0xe2fbd0 => /\.js$/.test(_0xe2fbd0);
  features = {};
  for (let _0x55f34c of _0x119e55.readdirSync(_0x30ecd8).filter(_0x282d63)) {
    try {
      features[_0x55f34c] = require(_0x3956ff.join(_0x30ecd8, _0x55f34c));
    } catch (_0x3958a9) {
      conn.logger.error(_0x3958a9);
      delete features[_0x55f34c];
    }
  }
  reload = (_0x4fe663, _0x5dd4d2) => {
    if (/\.js$/.test(_0x5dd4d2)) {
      let _0x210815 = _0x3956ff.join(_0x30ecd8, _0x5dd4d2);
      if (_0x210815 in require.cache) {
        delete require.cache[_0x210815];
        if (_0x119e55.existsSync(_0x210815)) {
          conn.logger.info("re - require plugin '" + _0x5dd4d2 + "'");
        } else {
          conn.logger.warn("deleted plugin '" + _0x5dd4d2 + "'");
          return delete features[_0x5dd4d2];
        }
      } else {
        conn.logger.info("requiring new plugin '" + _0x5dd4d2 + "'");
      }
      let _0x3b8396 = _0x4f13f6(_0x119e55.readFileSync(_0x210815), _0x5dd4d2);
      if (_0x3b8396) {
        conn.logger.error("syntax error while loading '" + _0x5dd4d2 + "'\n" + _0x3b8396);
      } else {
        try {
          features[_0x5dd4d2] = require(_0x210815);
        } catch (_0x4c4615) {
          conn.logger.error("error require plugin '" + _0x5dd4d2 + "\n" + _0x4c4615 + "'");
        } finally {
          features = Object.fromEntries(Object.entries(features).sort(([_0x5f2c43], [_0x5d1f59]) => _0x5f2c43.localeCompare(_0x5d1f59)));
        }
      }
    }
  };
  Object.freeze(reload);
  _0x119e55.watch(_0x3956ff.join(__dirname, 'features'), reload);
  reloadHandler();
  async function _0x1c6bae() {
    let _0x88b752 = await Promise.all([_0x3376a7.spawn('ffmpeg'), _0x3376a7.spawn('ffprobe'), _0x3376a7.spawn('ffmpeg', ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", '1', '-f', "webp", '-']), _0x3376a7.spawn("convert"), _0x3376a7.spawn('magick'), _0x3376a7.spawn('gm'), _0x3376a7.spawn("find", ["--version"])].map(_0x2cd060 => {
      return Promise.race([new Promise(_0x1a3aa8 => {
        _0x2cd060.on("close", _0x474f27 => {
          _0x1a3aa8(_0x474f27 !== 0x7f);
        });
      }), new Promise(_0x5680cd => {
        _0x2cd060.on("error", _0x3eb1a9 => _0x5680cd(false));
      })]);
    }));
    let [_0x34f575, _0x5dad87, _0x4f92fb, _0x435b3a, _0x4d5cc0, _0x541c4a, _0x336253] = _0x88b752;
    console.log(_0x88b752);
    let _0x1191b6 = support = {
      'ffmpeg': _0x34f575,
      'ffprobe': _0x5dad87,
      'ffmpegWebp': _0x4f92fb,
      'convert': _0x435b3a,
      'magick': _0x4d5cc0,
      'gm': _0x541c4a,
      'find': _0x336253
    };
    Object.freeze(support);
    if (!_0x1191b6.ffmpeg) {
      conn.loggconsole.log(_0x5c33c2.yellow.bolder.warn("Please install ffmpeg for sending videos (pkg install ffmpeg)"));
    }
    if (_0x1191b6.ffmpeg && !_0x1191b6.ffmpegWebp) {
      console.log(_0x5c33c2.yellow.bold("Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)"));
    }
    if (!_0x1191b6.convert && !_0x1191b6.magick && !_0x1191b6.gm) {
      console.log(_0x5c33c2.yellow.bold("⚠️ Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)"));
    }
  }
  _0x1c6bae().then(() => console.log(_0x5c33c2.green.bold("✅ Quick Test Done")))["catch"](console.error);
})();
function pickRandom(_0x620478) {
  return _0x620478[Math.floor(Math.random() * _0x620478.length)];
}
