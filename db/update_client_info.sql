UPDATE client SET
firstName = $2, 
lastName = $3,
address = $4,
city = $5, 
state = $6,
phoneNumber = $7,
email = $8
WHERE id = $1;