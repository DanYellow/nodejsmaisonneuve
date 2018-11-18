console.log('Avant');
const user = getUser(42, user => {
  getAccounts(user.username, accounts => {
    getEmails(accounts, emails => {
      console.log(`${emails}`);
    });
  });
});

console.log('Après');

function getUser(id, callback) {
  console.log("Recuperation de l'utilisateur en cours");

  setTimeout(() => {
    console.log('Utilisateur récupéré');
    callback({ id, username: 'Rostom' });
  }, 2000);
}

function getAccounts(username, callback) {
  console.log('Recuperation des comptes en cours');

  setTimeout(() => {
    console.log('Utilisateur récupéré');
    callback(['Compte 1', 'Compte 2', 'Compte 3']);
  }, 2000);
}

function getEmails(id, callback) {
  console.log('Recuperation des mails en cours');

  setTimeout(() => {
    callback(['email@sfr.ca', 'email1@sfr.ca', 'email5@sfr.ca']);
  }, 2000);
}
