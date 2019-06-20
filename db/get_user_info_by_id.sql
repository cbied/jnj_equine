SELECT firstname, lastname, phonenumber, address, city, state, email, phonenumber 
FROM client
WHERE id = $1;