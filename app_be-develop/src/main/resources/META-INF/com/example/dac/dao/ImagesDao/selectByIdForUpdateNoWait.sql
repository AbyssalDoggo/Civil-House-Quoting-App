SELECT
  /*%expand*/*
FROM
  images
WHERE
  image_id = /* imageId */'a'
FOR UPDATE NOWAIT