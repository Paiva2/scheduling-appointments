# Scheduling Appointments

Projeto de conclusão do curso de ADS da Faculdade Impacta.

- Registro completo de usuário e doutor;
- Envio de e-mail para troca de senha;
- Listagem de doutores disponíveis para agendamento;
- Permitir agendar consulta com doutores disponíveis;
- Cancelar agendamentos ou remarcar;
- E outras funcionalidades

## Tecnologias

- Express
- VueJs
- Docker
- Postgres
- Redis (utilizado como fila)

## Iniciando o projeto localmente

### Inicializar projeto

- $ git clone https://github.com/Paiva2/scheduling-appointments.git

- $ cd ./

- $ cd frontend/cd backend

- $ npm install

- $ cd .. && touch.env

- $ docker compose up -d

- $ npm run dev

## Variáveis de ambiente

- SECRET - Utilizada como chave secreta para geração do token JWT
- MAIL_USERNAME - Usuário de acesso para envio de e-mail
- MAIL_APP_PASS - Senha do e-mail para enviar e-mails
- REDIS_HOST - Host do Redis
- REDIS_PASSWORD - Senha do redis