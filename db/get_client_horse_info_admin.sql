SELECT c.*, h.*
FROM client c 
JOIN horse h
ON c.id = h.client_id
ORDER BY c.lastname