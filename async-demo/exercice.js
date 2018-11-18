const delayTime = 2000;
function getClient(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Votre nom',
        isGold: true,
        email: 'courriel',
      });
    }, delayTime);
  });
}

function getTopMusics(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,

        name: 'Votre nom',
        isGold: true,
        email: 'courriel',
      });
    }, delayTime);
  });
}

function sendEmail(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: 'Votre nom',
        isGold: true,
        email: 'courriel',
      });
    }, delayTime);
  });
}

getClient(1)
  .then(_ => getTopMusics())
  .then(_ => sendEmail())
  .then(result => console.log(result));

const displayClient = async () => {
  const client = await getClient(1);
  const music = await getTopMusics(1);
  const email = await sendEmail(1);
  console.log(`async - email`, email);
};

displayClient();
