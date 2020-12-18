const promsie1 = () => new Promise((resolve, reject) => {
  const client = new XMLHttpRequest();
  console.log('>>>>>this>>', this)
})


function ajaxAsync(url) {
  return new Promise(function(resolve,reject) {
    var client = new XMLHttpRequest();
    client.open("GET", url);
     client.onreadystatechange = function() {
        if (this.readyState !== 4) return;
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
    };
client.send(); });
};

promsie1()
promsie2()