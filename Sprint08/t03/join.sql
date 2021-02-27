SELECT heroes.name, teams.name FROM heroes JOIN teams ON heroes.id = teams.hero_id OR teams.name IS NULL;


SELECT heroes.name, powers.name, teams.name FROM heroes
                                                     JOIN teams ON heroes.id = teams.hero_id
                                                     JOIN powers ON heroes.id = powers.hero_id;



SELECT heroes.name, powers.name, teams.name FROM heroes
       JOIN teams ON heroes.id = teams.hero_id AND teams.name IS NOT NULL
       JOIN powers ON heroes.id = powers.hero_id AND powers.points > 0;