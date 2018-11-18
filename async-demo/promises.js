const fetch = require('node-fetch');

const delayTime = 1000;

const getUser = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, username: 'Rostom' });
    }, delayTime);
  });
};

const getAccounts = username => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['Compte 1', 'Compte 2', 'Compte 3']);
    }, delayTime);
  });
};

const getEmails = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const createError = Math.random() > 0.5;
      if (createError) {
        resolve(['email@sfr.ca', 'email1@sfr.ca', 'email5@sfr.ca']);
      } else {
        reject(new Error(`error rejected !`));
      }
    }, delayTime);
  });
};

// getUser(45)
//   .then(user => getAccounts(user))
//   .then(accounts => {
//     return getEmails(accounts);
//   })
//   .then(emails => {
//     console.log(emails);
//   })
//   .catch(error => console.log(`error`, error));

const getProducts = params => {
  // return fetch(`https://xkcd.com/info.0.json`)
  return fetch(`https://danyellow.net/hello.json`)
    .then(response => {
      return response.json();
    })
    .catch(e => console.log(`error 1`, e));
};

const getProductsFail = params => {
  return fetch(`https://danyellow.net/heello.json`)
    .then(response => {
      return response.text();
    })
    .catch(e => console.log(`error 2`, e));
};

Promise.all([getProducts(), getProductsFail()])
  .then(result => {
    console.log(`result`, result);
  })
  .catch(error => {
    console.log(error);
  });

// async function displayEmails() {
//   try {
//     const user = await getUser();
//     const accounts = await getAccounts(user);
//     const emails = await getEmails(accounts);
//     console.log(emails);
//   } catch (e) {
//     console.log(`error`, e);
//   }
// }

// displayEmails();
