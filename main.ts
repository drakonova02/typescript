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
};

type ExternalUser = {
  oauthToken: string;
};

function isAdmin(entity: unknown): entity is Admin {
  return typeof entity === "object" && entity !== null && "role" in entity;
}

function isUser(entity: unknown): entity is User {
  return typeof entity === "object" && entity !== null && "username" in entity && "password" in entity;
}

function isGuest(entity: unknown): entity is Guest {
  return typeof entity === "object" && entity !== null && "sessionId" in entity;
}

function isExternalUser(entity: unknown): entity is ExternalUser {
  return typeof entity === "object" && entity !== null && "oauthToken" in entity;
}

function login(entity: User | Guest | Admin | ExternalUser): void {
  if (isAdmin(entity)) {
    console.log(`Авторизація адміністратора: ${entity.username} з правами ${entity.role}`);
  } else if (isUser(entity)) {
    console.log(`Авторизація користувача: ${entity.username}`);
  } else if (isGuest(entity)) {
    console.log(`Авторизація гостя: сесія ${entity.sessionId}`);
  } else if (isExternalUser(entity)) {
    console.log(`Авторизація зовнішнього користувача за токеном ${entity.oauthToken}`);
  } else {
    console.log("Невідомий тип користувача");
  }
}
