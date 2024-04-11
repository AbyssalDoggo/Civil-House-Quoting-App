SELECT
  /*%expand*/*
FROM
  package
WHERE
  package_id = /* packageId */'a'
FOR UPDATE NOWAIT