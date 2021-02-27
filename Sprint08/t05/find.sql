SELECT heroes.name races FROM heroes
                                  JOIN teams t on heroes.id = t.hero_id
                                  JOIN races on heroes.id = races.hero_id
                                  JOIN powers p on heroes.id = p.hero_id
WHERE t.hero_id HAVING COUNT(*) > 1
    AND races.name = 'human'
    AND heroes.class_role = 'tankman' OR heroes.class_role = 'healer'
    AND heroes.name LIKE '%a%';