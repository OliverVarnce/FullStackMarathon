SELECT heroes.name FROM heroes JOIN powers ON heroes.id = powers.hero_id WHERE powers.points=(SELECT MAX(powers.points) FROM powers) GROUP BY heroes.id;

SELECT heroes.name FROM heroes JOIN powers ON heroes.id = powers.hero_id WHERE powers.type='defense'
                                                                           AND powers.points=(SELECT MIN(powers.points) FROM powers);

SELECT heroes.name FROM heroes JOIN powers ON heroes.id = powers.hero_id WHERE powers.points=(SUM(powers.points) GROUP BY powers.points;

SELECT heroes.name FROM heroes
                            JOIN powers ON heroes.id = powers.hero_id
                            JOIN teams ON heroes.id = teams.hero_id
WHERE powers.type='defense'
  AND powers.points=(SELECT MIN(powers.points) FROM powers)
  AND teams.name = 'avengers';