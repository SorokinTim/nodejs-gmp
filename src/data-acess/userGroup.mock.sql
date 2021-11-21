CREATE TABLE IF NOT EXISTS "userGroups" (
    "userId" UUID  REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "groupId" UUID  REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("userId", "groupId")
);

INSERT INTO "userGroup" ("userId", "groupId") VALUES (
    (SELECT id FROM users WHERE id='7db0c881-255b-492f-874d-face2ba17cd4'),
    (SELECT id FROM groups WHERE id='f57e2e12-f4ee-4b82-b115-e5fcc203672c')
);
INSERT INTO "userGroup" ("userId", "groupId") VALUES (
    (SELECT id FROM users WHERE id='d01ab483-d12e-46c7-92b1-508f91fc3bdf'),
    (SELECT id FROM groups WHERE id='34c9c0a5-bd3c-4f9b-8df9-2af389ced8e6')
);
INSERT INTO "userGroup" ("userId", "groupId") VALUES (
    (SELECT id FROM users WHERE id='2ed06a8b-9484-4a19-b367-7598ca3888db'),
    (SELECT id FROM groups WHERE id='2d4c8989-d403-43b9-9e68-e8bfd9015d57')
);
INSERT INTO "userGroup" ("userId", "groupId") VALUES (
    (SELECT id FROM users WHERE id='e79a8093-8876-4b51-9420-842f2e9586a2'),
    (SELECT id FROM groups WHERE id='301ae400-3efe-4b10-baa3-7f3735e13a1a')
);
INSERT INTO "userGroup" ("userId", "groupId") VALUES (
    (SELECT id FROM users WHERE id='705911d7-000f-49ec-b704-4cbe9a61e8e0'),
    (SELECT id FROM groups WHERE id='ef0689f8-41b4-47ad-a12e-a0481b9ea9dd')
);


