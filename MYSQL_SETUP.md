# Next.js MySQL Config (Prisma)

1. Install Prisma:
   cd growth-ring && npm install prisma --save-dev && npx prisma init

2. Update `prisma/schema.prisma`:
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }

3. Update `.env` (isi URL MySQL dari hosting):
   DATABASE_URL="mysql://user:password@localhost:3306/db_name"

4. Lanjut migrasi (npx prisma migrate dev).
