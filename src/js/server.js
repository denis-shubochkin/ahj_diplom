
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');
const WS = require('ws');
const Router = require('koa-router');


const publicPath = path.join(__dirname, '/public');
const app = new Koa();
const router = new Router();

let messL;
const messages = [];
const notifications = [];

function genWeather() {
  const n = Math.floor(Math.random() * 101);
  if (n < 20) {
    return 'Погода хорошая, без осадков';
  }
  if (n > 20 && n <= 40) {
    return 'Погода солнечная, жара';
  }
  if (n > 40 && n <= 60) {
    return 'Погода пасмурная, возьмите зонт';
  }
  if (n > 60 && n <= 80) {
    return 'Погода дождливая, обязательно возьмите зонт';
  }
  if (n > 80) {
    return 'Штормовое предупреждение, лучше не выходить из дома';
  }

  return '1';
}

function genTraffic() {
  const n = Math.floor(Math.random() * 101);
  if (n < 25) {
    return 'На дорогах свободно';
  }
  if (n > 25 && n <= 50) {
    return 'Небольшие заторы';
  }
  if (n > 50 && n <= 75) {
    return 'Очень плотное движение';
  }
  if (n > 75) {
    return 'Город стоит';
  }
  return '1';
}

function genCorona() {
  const n = Math.floor(Math.random() * 101);
  if (n < 25) {
    return 'Заболевших в вашем городе 1000 человек';
  }
  if (n > 25 && n <= 50) {
    return 'Заболевших в вашем городе 2000 человек';
  }
  if (n > 50 && n <= 75) {
    return 'Заболевших в вашем городе 5000 человек. Лучше оставайтесь дома.';
  }
  if (n > 75) {
    return 'Заболевших в вашем городе 10000 человек. Сидите дома!';
  }
  return '1';
}

function genCurrency() {
  const n = Math.floor(Math.random() * 101);
  if (n < 25) {
    return 'USD:78.00 EUR: 85.00';
  }
  if (n > 25 && n <= 50) {
    return 'USD:79.00 EUR: 86.00';
  }
  if (n > 50 && n <= 75) {
    return 'USD:77.00 EUR: 84.00';
  }
  if (n > 75) {
    return 'USD:80.00 EUR: 90.00';
  }
  return '1';
}

function genPetrol() {
  const n = Math.floor(Math.random() * 101);
  if (n < 25) {
    return 'Цена за баррель: 40.38';
  }
  if (n > 25 && n <= 50) {
    return 'Цена за баррель: 45.32';
  }
  if (n > 50 && n <= 75) {
    return 'Цена за баррель: 58.98';
  }
  if (n > 75) {
    return 'Цена за баррель: 43.77';
  }
  return '1';
}


// app.use(koaStatic(publicF));
app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));


// eslint-disable-next-line consistent-return
app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    // eslint-disable-next-line no-return-await
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Allow-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Allow-Control-Request-Headers'));
    }
    ctx.response.status = 204;
  }
});


app.use(async (ctx) => {
  let c = 0;
  const resArr = [];
  let req;
  switch (ctx.request.query.method) {
    case 'firstTen':
      if (messages === []) {
        ctx.response.body = '';
        return;
      }
      for (let i = messages.length - 1; i >= 0; i--) {
        if (c === 10) {
          c = 0;
          break;
        }
        if (messages[i].type === 'img' || messages[i].type === 'audio' || messages[i].type === 'video') {
          resArr.push(messages[i]);
          resArr[resArr.length - 1].file = fs.readFileSync(resArr[resArr.length - 1].content);
          c += 1;
        } else {
          resArr.push(messages[i]);
          c += 1;
        }
      }
      messL = messages.length;
      req = {
        arr: resArr,
        len: messL,
      };
      ctx.response.body = req;
      return;
    case 'moreTen':

      for (let i = messages.length - 1 - ctx.request.query.ct; i >= 0; i--) {
        if (c === 10) {
          c = 0;
          break;
        }
        if (messages[i].type === 'img' || messages[i].type === 'audio' || messages[i].type === 'video') {
          resArr.push(messages[i]);
          resArr[resArr.length - 1].file = fs.readFileSync(resArr[resArr.length - 1].content);
          c += 1;
        } else {
          resArr.push(messages[i]);
          c += 1;
        }
      }
      ctx.response.body = JSON.stringify(resArr);
      return;
    case 'loadAtt':
      if (ctx.request.files.att.size > 0) {
        const reader = fs.createReadStream(ctx.request.files.att.path);
        let dest;
        if (ctx.request.files.att.type.startsWith('image')) {
          dest = path.join(publicPath, `${ctx.request.files.att.size}.png`);
          messages.push({
            type: 'img',
            author: 'You',
            name: ctx.request.files.att.name,
            content: dest,
            date: ctx.request.body.date,
            coords: JSON.parse(ctx.request.body.coords),
          });
        } else if (ctx.request.files.att.type.startsWith('audio')) {
          dest = path.join(publicPath, `${ctx.request.files.att.size}.mp3`);
          messages.push({
            type: 'audio',
            author: 'You',
            name: ctx.request.files.att.name,
            content: dest,
            date: ctx.request.body.date,
            coords: JSON.parse(ctx.request.body.coords),
          });
        } else if (ctx.request.files.att.type.startsWith('video')) {
          dest = path.join(publicPath, `${ctx.request.files.att.size}.mp4`);
          messages.push({
            type: 'video',
            author: 'You',
            name: ctx.request.files.att.name,
            content: dest,
            date: ctx.request.body.date,
            coords: JSON.parse(ctx.request.body.coords),
          });
        }
        const stream = fs.createWriteStream(dest);
        reader.pipe(stream);
      }
      ctx.response.body = 'ok';
      return;
    default:
      ctx.response.body = 'error';
      ctx.response.status = 404;
  }
});


// eslint-disable-next-line no-unused-vars
const port = process.env.PORT || 7070;
// eslint-disable-next-line no-unused-vars
const server = http.createServer(app.callback()).listen(port);
const wsServer = new WS.Server({ server });


wsServer.on('connection', (ws) => {
  notifications.forEach((el, i) => {
    if (el.resend === 1) {
      ws.send(`@notification ${el.text}`);
      notifications.splice(i, 1);
    }
  });
  const errCallback = (err) => {
    if (err) {
      console.log('error');
    }
  };

  setInterval(() => {
    const date = new Date();
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const year = date.getFullYear();
    const fullDate = `${day}.${month}.${year}`;
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const time = `${hours}:${minutes}`;
    notifications.forEach((el, i) => {
      if (el.time === time && el.date === fullDate) {
        if (ws.readyState === 1) {
          ws.send(`@notification ${el.text}`, errCallback);
          notifications.splice(i, 1);
        } else notifications[i].resend = 1;
      }
    });
  }, 10000);


  ws.on('message', (msg) => {
    const obj = JSON.parse(msg);
    if (obj.type === 'text') {
      if (obj.content.startsWith('@schedule:')) {
        const arr = obj.content.split(' ');

        if (!arr[1] || !arr[2] || !arr[1].includes(':') || !arr[2].includes('.')) {
          ws.send('Введите дату и время напоминания в формате @schedule: 18:04 31.08.2019 "Текст напоминания"');
          messages.push(obj);
          return;
        }

        let n = '';
        arr.forEach((el, i) => {
          if (i >= 3) {
            n = `${n + el} `;
          }
        });
        const o = {
          time: arr[1].trim(),
          date: arr[2].trim(),
          text: n.trim(),
          resend: 0,
        };
        notifications.push(o);
        ws.send('Напоминание создано');
      } else if (obj.content.startsWith('@weather')) {
        ws.send(`@weather${genWeather()}`);
      }
      else if (obj.content.startsWith('@traffic')) {
        ws.send(`@traffic${genTraffic()}`);
      }
      else if (obj.content.startsWith('@corona')) {
        ws.send(`@corona${genCorona()}`);
      }
      else if (obj.content.startsWith('@currency')) {
        ws.send(`@currency${genCurrency()}`);
      }
      else if (obj.content.startsWith('@petrol')) {
        ws.send(`@petrol${genPetrol()}`);
      }
      messages.push(obj);
    }
  });
  ws.on('close', (msg) => {
    console.log(msg);
    Array.from(wsServer.clients)
      .filter((o) => o.readyState === WS.OPEN)
      .forEach((o) => o.send(msg, errCallback));
  });
  // ws.send('welcome', errCallback);
});


app.use(router.routes()).use(router.allowedMethods());
