SELECT
  /*%expand*/*
FROM
  m_user
WHERE
  phone_number = /* phoneNumber */'a'
FOR UPDATE NOWAIT