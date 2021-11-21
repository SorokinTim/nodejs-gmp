CREATE TABLE IF NOT EXISTS groups (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "permissions" VARCHAR(50) ARRAY NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('f57e2e12-f4ee-4b82-b115-e5fcc203672c', 'Ooba', array['SHARE', 'DELETE', 'UPLOAD_FILES'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('34c9c0a5-bd3c-4f9b-8df9-2af389ced8e6', 'Vipe', array['READ'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('2d4c8989-d403-43b9-9e68-e8bfd9015d57', 'Babbleset', array['SHARE', 'READ', 'DELETE', 'UPLOAD_FILES'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('301ae400-3efe-4b10-baa3-7f3735e13a1a', 'Fliptune', array['SHARE', 'UPLOAD_FILES'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('ef0689f8-41b4-47ad-a12e-a0481b9ea9dd', 'Demizz', array['UPLOAD_FILES'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('02c43deb-f81a-4e62-97d1-7cc8fbb9bf87', 'Devshare', array['UPLOAD_FILES', 'WRITE', 'SHARE'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('a22d500f-4f83-40db-91c1-5e58d05ab439', 'Buzzster', array['UPLOAD_FILES'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('917f725d-2bac-40ab-b2e3-31aae7900256', 'Avaveo', array['UPLOAD_FILES', 'SHARE'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('abe63214-4f1a-4e32-9cee-33ce2398c8c7', 'Realbuzz', array['UPLOAD_FILES', 'READ', 'DELETE'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
insert into GROUPS (id, name, permissions, "createdAt", "updatedAt") values ('0a75a167-ca60-4ae6-99bc-042608dd4a85', 'Bluezoom', array['UPLOAD_FILES', 'SHARE'], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
