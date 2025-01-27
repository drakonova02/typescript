type CreateUserAction = {
  type: 'CREATE_USER';
  payload: {
    name: string;
    age: number;
  };
}

type DeleteUserAction = {
  type: 'DELETE_USER';
  payload: {
    userId: number;
  };
}

type UpdateUserAction = {
  type: 'UPDATE_USER';
  payload: {
    userId: number;
    name?: string;
    age?: number;
  };
}

type BlockUserAction = {
  type: 'BLOCK_USER';
  payload: {
    userId: number;
    reason: string;
  };
}

type Action = CreateUserAction | DeleteUserAction | UpdateUserAction | BlockUserAction;

function handleAction(action: Action): void {
  switch (action.type) {
    case 'CREATE_USER': {
      const { name, age } = action.payload;
      console.log(`Створено нового користувача: ім'я - ${name}, вік - ${age}`);
      break;
    }
    case 'DELETE_USER': {
      const { userId } = action.payload;
      console.log(`Користувача з ID ${userId} видалено.`);
      break;
    }
    case 'UPDATE_USER': {
      const { userId, name, age } = action.payload;
      console.log(`Оновлюємо дані користувача з ID ${userId}:`);
      if (name) console.log(`- нове ім'я: ${name}`);
      if (age) console.log(`- новий вік: ${age}`);
      break;
    }
    case 'BLOCK_USER': {
      const { userId, reason } = action.payload;
      console.log(`Користувача з ID ${userId} заблоковано. Причина: ${reason}`);
      break;
    }
    default: {
      throw new Error(`Необроблений тип дії: ${(action as Action).type}`);
    }
  }
}

handleAction({ type: 'CREATE_USER', payload: { name: 'Олексій', age: 25 } });
handleAction({ type: 'DELETE_USER', payload: { userId: 1 } });
handleAction({ type: 'UPDATE_USER', payload: { userId: 2, name: 'Марія' } });
handleAction({ type: 'BLOCK_USER', payload: { userId: 3, reason: 'Порушення правил' } });