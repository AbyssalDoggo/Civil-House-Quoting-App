SELECT
  /*%expand*/*
FROM
  news
WHERE
  news_id = /* newsId */'a'
FOR UPDATE NOWAIT