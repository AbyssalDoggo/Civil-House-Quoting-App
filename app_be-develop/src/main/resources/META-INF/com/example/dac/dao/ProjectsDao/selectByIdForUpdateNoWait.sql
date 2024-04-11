SELECT
  /*%expand*/*
FROM
  projects
WHERE
  projects_id = /* projectsId */'a'
FOR UPDATE NOWAIT