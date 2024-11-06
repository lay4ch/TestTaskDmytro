-- first task
SELECT *
FROM people
WHERE first_name LIKE 'J%';


-- second task
SELECT p.gender, COUNT(*) AS count
FROM people p
WHERE p.year > 2000 AND p.month IN (6, 7, 8)
GROUP BY gender;

-- third task
SELECT p.last_name, p.first_name, c.number
FROM people p
JOIN cards c ON p.id = c.people_id
ORDER BY p.last_name, p.first_name;

-- third task in case we should not duplicate people
SELECT p.last_name AS lastName, p.first_name AS firstName, GROUP_CONCAT(c.number) AS cardNumbers
FROM people p
JOIN cards c ON p.id = c.people_id
GROUP BY p.id
ORDER BY p.last_name, p.first_name;