INSERT INTO client
(username, hash, isAdmin, firstName, lastName, address, city, state, phoneNumber, email)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *;