SELECT
  /*%expand*/*
FROM
  quotes_detail
WHERE
  quotes_id = /* quotesId */'a'
  AND
  detail_no = /* detailNo */'a'
FOR UPDATE NOWAIT