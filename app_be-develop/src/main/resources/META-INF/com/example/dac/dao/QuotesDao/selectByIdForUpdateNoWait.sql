SELECT
  /*%expand*/*
FROM
  quotes
WHERE
  quotes_id = /* quotesId */'a'
FOR UPDATE NOWAIT