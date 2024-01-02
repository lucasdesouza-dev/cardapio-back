-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "confirmEmail" BOOLEAN NOT NULL DEFAULT false,
    "tenantUuid" TEXT NOT NULL,
    CONSTRAINT "User_tenantUuid_fkey" FOREIGN KEY ("tenantUuid") REFERENCES "Tenant" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tenant" (
    "uuid" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Categoria" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "categoria" TEXT NOT NULL,
    "tenantUuid" TEXT NOT NULL,
    CONSTRAINT "Categoria_tenantUuid_fkey" FOREIGN KEY ("tenantUuid") REFERENCES "Tenant" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_tenantUuid_key" ON "User"("tenantUuid");
