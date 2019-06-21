UPDATE meeting SET
meeting_date = $2, 
meeting_time = $3,
price = $4,
pending = $5
WHERE id = $1;