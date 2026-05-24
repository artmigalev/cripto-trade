// Вместо БД — простой массив в памяти
const users = [
  { id: 1, email: 'test@test.com', password: 'hashed_password' }
]

export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
