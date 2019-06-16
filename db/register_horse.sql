INSERT INTO horse
(name, age, breed, discipline, past_injuries, 
        behavioral_issues, gender, pregnant, expected_pregnancy_date, client_id)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning *;