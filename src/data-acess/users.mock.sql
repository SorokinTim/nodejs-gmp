CREATE TABLE IF NOT EXISTS users (
    "id" UUID NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "age" INTEGER NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

insert into users (id, login, password, age, "createdAt", "updatedAt") values ('7db0c881-255b-492f-874d-face2ba17cd4', 'mshiril0', '1r887b', 38, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('d01ab483-d12e-46c7-92b1-508f91fc3bdf', 'bhewell1', 'CD3U3b', 18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('2ed06a8b-9484-4a19-b367-7598ca3888db', 'lromayne2', 'xR2ZfStjmnff', 42, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('e79a8093-8876-4b51-9420-842f2e9586a2', 'ajanovsky3', 'W9wtUxH17NUs', 43, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('705911d7-000f-49ec-b704-4cbe9a61e8e0', 'eive4', 'JRUhoO', 36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('c9a7c937-49db-4a09-b199-a28e56a1543d', 'lfriedank5', 'EODhDP', 31, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('51ddad86-4c28-4f5c-af90-063329be37b1', 'ctrayte6', 'wiEfOHxa', 35, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('7d5db49b-83a4-4ad2-a0a4-0c3bdbfb1f61', 'jbrockman7', 'WyOBIJHIH', 35, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('ecbd6863-c61c-4cc8-af0c-647b5c395b7d', 'sbeaves8', 'vZuFuV', 35, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into users (id, login, password, age, "createdAt", "updatedAt") values ('90f90936-6463-4e7f-a6f5-2352f1bb062b', 'tmckee9', 'G0n2bAYNZ', 28, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
