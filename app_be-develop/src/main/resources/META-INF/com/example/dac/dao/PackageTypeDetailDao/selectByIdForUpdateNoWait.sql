SELECT
  /*%expand*/*
FROM
  package_type_detail
WHERE
  package_type_id = /* packageTypeId */'a'
  AND
  detail_no = /* detailNo */'a'
FOR UPDATE NOWAIT