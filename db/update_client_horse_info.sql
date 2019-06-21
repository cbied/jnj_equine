UPDATE horse SET
name = $2, 
age = $3,
breed = $4,
discipline = $5, 
past_injuries = $6,
behavioral_issues = $7,
gender = $8,
pregnant = $9,
expected_pregnancy_date = $10
WHERE client_id = $1 AND horse_id = $11;