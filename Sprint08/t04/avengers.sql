SELECT heroes.name, SUM(powers.points) FROM powers
       JOIN heroes ON(heroes.id = powers.hero_id) GROUP BY heroes.id
       ORDER BY SUM(powers.points) DESC, heroes.id
       LIMIT 1;

SELECT heroes.name, SUM(powers.points) from heroes
        JOIN powers ON (heroes.id = powers.hero_id)
        WHERE powers.type = 'defense'
        GROUP BY heroes.id
        ORDER BY SUM(powers.points), heroes.id
        LIMIT 1;

SELECT heroes.name FROM heroes JOIN powers ON heroes.id = powers.hero_id WHERE powers.points=(SUM(powers.points) GROUP BY powers.points;

SELECT heroes.name FROM heroes
                            JOIN powers ON heroes.id = powers.hero_id
                            JOIN teams ON heroes.id = teams.hero_id
WHERE powers.type='defense'
  AND powers.points=(SELECT MIN(powers.points) FROM powers)
  AND teams.name = 'avengers';