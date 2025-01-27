type User = {
  username: string;
  password: string;
};

type Guest = {
  sessionId: string;
};

type Admin = {
  role: "admin";
  username: string;
  password: string;
}

type ExternalUser = {
  oauthToken: string;
}

function login(entity: User | Guest | Admin | ExternalUser): void {
  if ('role' in entity) {
    console.log(`Авторизація користувача: з правами ${entity.role}`);
  } else if ('username' in entity) {
    console.log(`Авторизація користувача: ${entity.username}`);
  } else if ('sessionId' in entity) {
    console.log(`Авторизація гостя: сесія ${entity.sessionId}`);
  } else if ('oauthToken:' in entity) {
    console.log(`Авторизація охоронця: за токеном ${entity.oauthToken}`);
  }
}