SELECT h.client_id, c.address, c.city, c.state, c.firstname, c.lastname, c.phoneNumber, c.email,
h.name, h.age, h.breed, h.discipline, h.behavioral_issues, 
h.past_injuries, h.gender, h.pregnant, h.expected_pregnancy_date, m.pending
FROM client c
INNER JOIN horse h
ON (c.id = h.client_id)
INNER JOIN meeting m
ON (m.client_id = c.id)
WHERE m.pending IS NULL
ORDER BY m.date ASC