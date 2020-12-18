

const ajaxRequest: (url, success, fail) => void = (url: string, success: (res: unknown) =>
{}, fail: (err?: unknown) => void) => {
  const client: XMLHttpRequest = new XMLHttpRequest();
  client.open("GET", url);
  client.onreadystatechange = function () {
    if(this.readyState !== 4) return;
    if(this.status === 200) {
      success(this.response)
    } else {
      fail(new Error(this.statusText));
    };
  }
  client.send();
}

// ajaxRequest('/ajax.json', function() {console.log('成功')}, function() {console.log('失败')});

const ajaxRequestPromise: (url: string) => Promise<unknown> = (url) => new Promise((resolve, reject) => {
  const client: XMLHttpRequest = new XMLHttpRequest();
  client.open("GET", url);
  client.onreadystatechange = function () {
    if(this.readyState !== 4) return;
    if(this.status === 200) {
      resolve(this.response);
    } else {
      reject(new Error(this.statusText));
    };
  };

  client.send();
})

ajaxRequestPromise('./ajax.json')
  .then(() => console.log('success'),() => console.log('fail'))
