SELECT
  /*%expand*/*
FROM
  package_detail
WHERE
  package_id = /* packageId */'a'
  AND
  detail_no = /* detailNo */'a'
FOR UPDATE NOWAIT