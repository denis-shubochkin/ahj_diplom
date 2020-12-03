import em from './emoji';

const organizer = document.querySelector('.organizer');
const input = document.querySelector('.input');
const messages = document.querySelector('.lenta');
const loadTenBut = document.querySelector('.loadTen');
const attBut = document.querySelector('.att-img');
const inputFile = document.querySelector('.input-file');
const emo = document.querySelector('.emo');
const emoBut = document.querySelector('.emo-img');
let messagesAr = document.querySelectorAll('.mess');
const sendObj = {};
let countMess = 0;
const ws = new WebSocket('wss://zippo1095.herokuapp.com:7070/ws');
ws.binaryType = 'blob';
const emojiArr = em();


input.addEventListener('click', () => {
  emo.style.display = 'none';
});

emoBut.addEventListener('click', () => {
  if (emo.style.display === 'block') {
    emo.style.display = 'none';
  } else {
    emo.style.display = 'block';
  }
});

emojiArr.forEach((el) => {
  const a = document.createElement('div');
  a.classList.add('emoji');
  a.textContent = String.fromCodePoint(el);
  emo.appendChild(a);
  a.addEventListener('click', (evt) => {
    input.value += evt.target.textContent;
    emo.style.display = 'none';
  });
});


// Создание сообщения в ленте чата

function addMess(prepend, send, type, cont, coordsRes, author, date, name) {
  if (type === 'text') {
    let dateInt;
    if (date === null) {
      dateInt = new Date().toLocaleString();
    } else {
      dateInt = date;
    }
    if (send === 1) {
      sendObj.type = 'text';
      sendObj.author = author;
      sendObj.content = cont;
      sendObj.date = dateInt;
    }

    const mess = document.createElement('div');
    mess.classList.add('mess');
    if (prepend === 1) {
      messages.prepend(mess);
    } else {
      messages.appendChild(mess);
    }
    const dateEl = document.createElement('div');
    dateEl.classList.add('date');
    if (author === 'You') {
      mess.classList.add('my');
      dateEl.textContent = `${dateInt}, Вы`;
    } else {
      dateEl.textContent = `${dateInt}, Бот`;
    }
    mess.appendChild(dateEl);
    const content = document.createElement('div');
    content.classList.add('content');
    mess.appendChild(content);
    const spl = cont.split(' ');
    spl.forEach((el) => {
      if (el.startsWith('http://') || el.startsWith('https://')) {
        const link = document.createElement('a');
        link.href = el;
        link.title = el;
        link.textContent = `${el} `;
        content.appendChild(link);
      } else {
        const p = document.createElement('span');
        p.textContent = `${el} `;
        content.appendChild(p);
      }
    });
    mess.appendChild(content);
    const coords = document.createElement('div');
    coords.classList.add('coords');
    if (coordsRes === 0) {
      coords.textContent = 'Местоположение неизвестно';
      if (send === 1) {
        sendObj.coords = 'Местоположение неизвестно';
      }
    } else {
      const c = `[${coordsRes.latitude.toFixed(5)}, ${coordsRes.longitude.toFixed(5)}]`;
      coords.textContent = c;
      if (send === 1) {
        sendObj.coords = {
          latitude: coordsRes.latitude,
          longitude: coordsRes.longitude,
        };
      }
    }
    mess.appendChild(coords);
    input.value = '';
  }
  if (type === 'img') {
    let dateInt;
    if (date === null) {
      dateInt = new Date().toLocaleString();
    } else {
      dateInt = date;
    }
    if (send === 1) {
      sendObj.type = 'img';
      sendObj.author = author;
      sendObj.content = cont;
      sendObj.date = dateInt;
    }

    const mess = document.createElement('div');
    mess.classList.add('mess');
    if (prepend === 1) {
      messages.prepend(mess);
    } else {
      messages.appendChild(mess);
    }
    const dateEl = document.createElement('div');
    dateEl.classList.add('date');
    if (author === 'You') {
      mess.classList.add('my');
      dateEl.textContent = `${dateInt}, Вы`;
    } else {
      dateEl.textContent = `${dateInt}, Бот`;
    }
    mess.appendChild(dateEl);
    const title = document.createElement('div');
    title.classList.add('media-title');
    title.textContent = name;
    mess.appendChild(title);
    const img = document.createElement('img');
    img.classList.add('img');
    mess.appendChild(img);
    const reader = new FileReader();
    reader.onload = (event) => {
      img.src = event.target.result;
    };
    try {
      reader.readAsDataURL(cont);
    } catch (e) {
      img.remove();
      return;
    }
    const dwnl = document.createElement('button');
    dwnl.classList.add('download');
    mess.appendChild(dwnl);
    dwnl.style.top = '20px';
    dwnl.style.left = '10px';
    img.addEventListener('mouseover', () => {
      dwnl.style.display = 'block';
    });
    img.addEventListener('mouseleave', () => {
      dwnl.style.display = 'none';
    });
    dwnl.addEventListener('mouseleave', () => {
      dwnl.style.display = 'none';
    });
    dwnl.addEventListener('mouseover', () => {
      img.dispatchEvent(new MouseEvent('mouseover'));
    });
    dwnl.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = img.src;
      a.download = 'image';
      a.click();
      a.remove();
    });
    const coords = document.createElement('div');
    coords.classList.add('coords');
    if (coordsRes === 0) {
      coords.textContent = 'Местоположение неизвестно';
      if (send === 1) {
        sendObj.coords = 'Местоположение неизвестно';
      }
    } else {
      const c = `[${coordsRes.latitude.toFixed(5)}, ${coordsRes.longitude.toFixed(5)}]`;
      coords.textContent = c;
      if (send === 1) {
        sendObj.coords = {
          latitude: coordsRes.latitude,
          longitude: coordsRes.longitude,
        };
      }
    }
    mess.appendChild(coords);
  }
  if (type === 'audio') {
    let dateInt;
    if (date === null) {
      dateInt = new Date().toLocaleString();
    } else {
      dateInt = date;
    }
    if (send === 1) {
      sendObj.type = 'audio';
      sendObj.author = author;
      sendObj.content = cont;
      sendObj.date = dateInt;
    }

    const mess = document.createElement('div');
    mess.classList.add('mess');
    if (prepend === 1) {
      messages.prepend(mess);
    } else {
      messages.appendChild(mess);
    }
    const dateEl = document.createElement('div');
    dateEl.classList.add('date');
    if (author === 'You') {
      mess.classList.add('my');
      dateEl.textContent = `${dateInt}, Вы`;
    } else {
      dateEl.textContent = `${dateInt}, Бот`;
    }
    mess.appendChild(dateEl);
    const title = document.createElement('div');
    title.classList.add('media-title');
    title.textContent = name;
    mess.appendChild(title);
    const audio = document.createElement('audio');
    audio.classList.add('audio');
    audio.controls = true;
    mess.appendChild(audio);
    const reader = new FileReader();
    reader.onload = (event) => {
      audio.src = event.target.result;
    };
    try {
      reader.readAsDataURL(cont);
    } catch (e) {
      audio.remove();
      return;
    }
    const coords = document.createElement('div');
    coords.classList.add('coords');
    if (coordsRes === 0) {
      coords.textContent = 'Местоположение неизвестно';
      if (send === 1) {
        sendObj.coords = 'Местоположение неизвестно';
      }
    } else {
      const c = `[${coordsRes.latitude.toFixed(5)}, ${coordsRes.longitude.toFixed(5)}]`;
      coords.textContent = c;
      if (send === 1) {
        sendObj.coords = {
          latitude: coordsRes.latitude,
          longitude: coordsRes.longitude,
        };
      }
    }
    console.log(cont.name);
    console.log(audio.audioTracks);
    mess.appendChild(coords);
  }
  if (type === 'video') {
    let dateInt;
    if (date === null) {
      dateInt = new Date().toLocaleString();
    } else {
      dateInt = date;
    }
    if (send === 1) {
      sendObj.type = 'video';
      sendObj.author = author;
      sendObj.content = cont;
      sendObj.date = dateInt;
    }

    const mess = document.createElement('div');
    mess.classList.add('mess');
    if (prepend === 1) {
      messages.prepend(mess);
    } else {
      messages.appendChild(mess);
    }
    const dateEl = document.createElement('div');
    dateEl.classList.add('date');
    if (author === 'You') {
      mess.classList.add('my');
      dateEl.textContent = `${dateInt}, Вы`;
    } else {
      dateEl.textContent = `${dateInt}, Бот`;
    }
    mess.appendChild(dateEl);
    const title = document.createElement('div');
    title.classList.add('media-title');
    title.textContent = name;
    mess.appendChild(title);
    const video = document.createElement('video');
    video.classList.add('video');
    video.controls = true;
    mess.appendChild(video);
    const reader = new FileReader();
    reader.onload = (event) => {
      video.src = event.target.result;
    };
    try {
      reader.readAsDataURL(cont);
    } catch (e) {
      video.remove();
      return;
    }
    const coords = document.createElement('div');
    coords.classList.add('coords');
    if (coordsRes === 0) {
      coords.textContent = 'Местоположение неизвестно';
      if (send === 1) {
        sendObj.coords = 'Местоположение неизвестно';
      }
    } else {
      const c = `[${coordsRes.latitude.toFixed(5)}, ${coordsRes.longitude.toFixed(5)}]`;
      coords.textContent = c;
      if (send === 1) {
        sendObj.coords = {
          latitude: coordsRes.latitude,
          longitude: coordsRes.longitude,
        };
      }
    }
    mess.appendChild(coords);
  }
}


// Функция загрузки вложения

function fileLoad(data) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
      data.forEach((el) => {
        const coordsRes = pos.coords;
        console.log(el);
        if (el.type.startsWith('image')) {
          addMess(0, 1, 'img', el, coordsRes, 'You', null, el.name);
        } else if (el.type.startsWith('audio')) {
          addMess(0, 1, 'audio', el, coordsRes, 'You', null, el.name);
        } else if (el.type.startsWith('video')) {
          addMess(0, 1, 'video', el, coordsRes, 'You', null, el.name);
        } else {
          alert('Данный формат не поддерживается');
          throw new Error('Wrong format');
        }
        countMess += 1;
        messages.scrollTop = messages.scrollHeight;
        messagesAr = document.querySelectorAll('.mess');
        if (messagesAr.length > 10) {
          loadTenBut.style.display = 'block';
          messagesAr[0].remove();
        }
        const params = new URLSearchParams();
        params.append('method', 'loadAtt');
        const formData = new FormData();
        formData.append('att', el);
        formData.append('date', sendObj.date);
        formData.append('coords', JSON.stringify(sendObj.coords));
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://zippo1095.herokuapp.com:7070/?${params}`);
        xhr.send(formData);
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const d = xhr.responseText;
              console.log(d);
              inputFile.value = '';
            } catch (e) {
              console.error(e);
            }
          }
        });
      });
    }, () => {
      data.forEach((el) => {
        const coordsRes = 0;
        if (el.type.startsWith('image')) {
          addMess(0, 1, 'img', el, coordsRes, 'You', null, el.name);
        } else if (el.type.startsWith('audio')) {
          addMess(0, 1, 'audio', el, coordsRes, 'You', null, el.name);
        } else if (el.type.startsWith('video')) {
          addMess(0, 1, 'video', el, coordsRes, 'You', null, el.name);
        }
        countMess += 1;
        messages.scrollTop = messages.scrollHeight;
        messagesAr = document.querySelectorAll('.mess');
        if (messagesAr.length > 10) {
          loadTenBut.style.display = 'block';
          messagesAr[0].remove();
        }
        const params = new URLSearchParams();
        params.append('method', 'loadAtt');
        const formData = new FormData();
        formData.append('att', el);
        formData.append('date', sendObj.date);
        formData.append('coords', JSON.stringify(sendObj.coords));
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `https://zippo1095.herokuapp.com:7070/?${params}`);
        xhr.send(formData);
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const d = xhr.responseText;
              console.log(d);
              inputFile.value = '';
            } catch (e) {
              console.error(e);
            }
          }
        });
      });
    });
  }
}

// Обработчик загрузки вложения

inputFile.addEventListener('change', (evt) => {
  const data = evt.target.files;
  fileLoad(data);
});

// drag and drop вложения файлов

organizer.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});

organizer.addEventListener('drop', (evt) => {
  evt.preventDefault();
  const files = Array.from(evt.dataTransfer.files);
  fileLoad(files);
});


// функция подгрузки первой десятки сообщений

function getTen() {
  const loading = document.createElement('div');
  loading.classList.add('loading');
  loading.textContent = 'Загружаю...';
  messages.appendChild(loading);
  const xhr = new XMLHttpRequest();
  const params = new URLSearchParams();
  params.append('method', 'firstTen');
  xhr.open('GET', `https://zippo1095.herokuapp.com:7070/?${params}`);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        loading.remove();
        if (xhr.responseText) {
          const d = JSON.parse(xhr.responseText);
          const data = d.arr;
          countMess = d.len;
          for (let i = data.length - 1; i >= 0; i--) {
            if (data[i].type === 'img') {
              const str = new Uint8Array(data[i].file.data);
              const blob = new Blob([str], { type: 'image/png' });
              addMess(
                0,
                0,
                data[i].type,
                blob, data[i].coords,
                data[i].author,
                data[i].date,
                data[i].name,
              );
            } else if (data[i].type === 'audio') {
              const str = new Uint8Array(data[i].file.data);
              const blob = new Blob([str], { type: 'audio/mpeg' });
              addMess(
                0,
                0,
                data[i].type,
                blob,
                data[i].coords,
                data[i].author,
                data[i].date,
                data[i].name,
              );
            } else if (data[i].type === 'video') {
              const str = new Uint8Array(data[i].file.data);
              const blob = new Blob([str], { type: 'video/mp4' });
              addMess(
                0,
                0,
                data[i].type,
                blob, data[i].coords,
                data[i].author,
                data[i].date,
                data[i].name,
              );
            } else {
              addMess(
                0,
                0,
                data[i].type,
                data[i].content,
                data[i].coords,
                data[i].author,
                data[i].date,
                0,
              );
            }
          }
          messagesAr = document.querySelectorAll('.mess');
          if (messagesAr.length < countMess) {
            loadTenBut.style.display = 'block';
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  });
}


// функция подгрузки десяти сообщений

function moreTen() {
  loadTenBut.textContent = 'Загружаю...';
  messagesAr = document.querySelectorAll('.mess');
  const xhr = new XMLHttpRequest();
  const params = new URLSearchParams();
  params.append('method', 'moreTen');
  params.append('ct', messagesAr.length);
  xhr.open('GET', `https://zippo1095.herokuapp.com:7070/?${params}`);
  xhr.send();
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        if (xhr.responseText) {
          const data = JSON.parse(xhr.responseText);
          for (let i = 0; i <= data.length - 1; i++) {
            if (data[i].type === 'img') {
              const str = new Uint8Array(data[i].file.data);
              const blob = new Blob([str], { type: 'image/png' });
              addMess(
                1,
                0,
                data[i].type,
                blob,
                data[i].coords,
                data[i].author,
                data[i].date,
                data[i].name,
              );
            } else if (data[i].type === 'audio') {
              const str = new Uint8Array(data[i].file.data);
              const blob = new Blob([str], { type: 'audio/mpeg' });
              addMess(
                1,
                0,
                data[i].type,
                blob,
                data[i].coords,
                data[i].author,
                data[i].date,
                data[i].name,
              );
            } else if (data[i].type === 'video') {
              const str = new Uint8Array(data[i].file.data);
              const blob = new Blob([str], { type: 'video/mp4' });
              addMess(
                1,
                0,
                data[i].type,
                blob,
                data[i].coords,
                data[i].author,
                data[i].date,
                data[i].name,
              );
            } else {
              addMess(
                1,
                0,
                data[i].type,
                data[i].content,
                data[i].coords,
                data[i].author,
                0,
              );
            }
          }
          messagesAr = document.querySelectorAll('.mess');
          loadTenBut.textContent = 'Еще 10';
          if (messagesAr.length === countMess) {
            loadTenBut.style.display = 'none';
          } else {
            messages.insertBefore(loadTenBut, messagesAr[0]);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  });
}

// Инициализация первой десятки сообщений и активация обработчика подгрузки сообщения

getTen();

// Активация обработчика подгрузки 10 сообщений

loadTenBut.addEventListener('click', moreTen);

// обработка клика на кнопке вложения

attBut.addEventListener('click', () => {
  inputFile.dispatchEvent(new MouseEvent('click'));
});

// Активация websocket

ws.addEventListener('open', () => {
  console.log('connected');
});
ws.addEventListener('message', (evt) => {
  console.log(evt.data);
  if (evt.data.startsWith('@notification')) {
    if (!window.Notification) {
      alert('This browser does not support desktop notification');
      return;
    }
    const res = evt.data;
    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-unused-vars
      const notification = new Notification('Напоминание', {
        body: res.replace('@notification', ''),
      });
    } else {
      Notification.requestPermission((permission) => {
        if (permission === 'granted') {
          // eslint-disable-next-line no-unused-vars
          const notification = new Notification('Напоминание', {
            body: res.replace('@notification', ''),
          });
        }
      });
    }
  } else {
    let { data } = evt;
    if (data.includes('@weather')) {
      data = data.replace('@weather', '');
    } else if (data.includes('@traffic')) {
      data = data.replace('@traffic', '');
    } else if (data.includes('@corona')) {
      data = data.replace('@corona', '');
    } else if (data.includes('@currency')) {
      data = data.replace('@currency', '');
    } else if (data.includes('@petrol')) {
      data = data.replace('@petrol', '');
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coordsRes = pos.coords;
        addMess(0, 1, 'text', data, coordsRes, 'Bot', null, 0);
        countMess += 1;
        messages.scrollTop = messages.scrollHeight;
        messagesAr = document.querySelectorAll('.mess');
        if (messagesAr.length > 10) {
          loadTenBut.style.display = 'block';
          messagesAr[0].remove();
        }
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(sendObj));
        }
      }, () => {
        const coordsRes = 0;
        addMess(0, 1, 'text', data, coordsRes, 'Bot', null, 0);
        countMess += 1;
        messages.scrollTop = messages.scrollHeight;
        messagesAr = document.querySelectorAll('.mess');
        if (messagesAr.length > 10) {
          loadTenBut.style.display = 'block';
          messagesAr[0].remove();
        }
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(sendObj));
        }
      });
    }
  }
});

// Обработка ввода текста

input.addEventListener('keyup', (evt) => {
  if (evt.keyCode === 13 && evt.target.value !== '') {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        emo.style.display = 'none';
        const coordsRes = pos.coords;
        addMess(0, 1, 'text', evt.target.value, coordsRes, 'You', null, 0);
        countMess += 1;
        messages.scrollTop = messages.scrollHeight;
        messagesAr = document.querySelectorAll('.mess');
        if (messagesAr.length > 10) {
          loadTenBut.style.display = 'block';
          messagesAr[0].remove();
        }
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(sendObj));
        }
      }, () => {
        const coordsRes = 0;
        addMess(0, 1, 'text', evt.target.value, coordsRes, 'You', null, 0);
        countMess += 1;
        messages.scrollTop = messages.scrollHeight;
        messagesAr = document.querySelectorAll('.mess');
        if (messagesAr.length > 10) {
          loadTenBut.style.display = 'block';
          messagesAr[0].remove();
        }
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(sendObj));
        }
      });
    }
  }
});
