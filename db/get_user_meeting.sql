SELECT * FROM meeting
WHERE client_id = $1
ORDER BY date ASC;
