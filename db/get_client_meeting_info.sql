SELECT c.address, c.city, c.state, c.firstname, c.lastname, c.phoneNumber, c.email,
h.name, h.client_id, h.age, h.breed, h.discipline, h.behavioral_issues, h.past_injuries, h.gender, h.pregnant, h.expected_pregnancy_date
FROM client c
INNER JOIN horse h 
ON (c.id = h.client_id)