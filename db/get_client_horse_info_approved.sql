SELECT h.client_id, c.address, c.city, c.state, c.firstname, c.lastname, c.phoneNumber, c.email,
h.name, h.age, h.breed, h.discipline, h.behavioral_issues, 
h.past_injuries, h.gender, h.pregnant, h.expected_pregnancy_date, m.pending, m.meeting_date, m.id
FROM meeting m
INNER JOIN client c
ON (m.client_id = c.id)
INNER JOIN horse h
ON (c.id = h.client_id)
WHERE m.pending = true
ORDER BY m.meeting_date ASC