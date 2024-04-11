package com.example.common.util;

import java.math.BigDecimal;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.ObjectUtils;
import com.example.common.cnst.CoreConst;

public class Utils {
  /**
   * Get order by clause.
   *
   * @param orderBy column order
   * @param direction asc/desc
   * @return string
   */
  public static String getOrderByString(String orderBy, String direction) {

    StringBuffer sb = new StringBuffer();

    if (!StringUtils.isEmpty(orderBy)) {
      sb.append("ORDER BY ").append(camelToSnake(orderBy));
      if (!StringUtils.isEmpty(direction)) {
        sb.append(" ").append(direction);
      }
    } else {
      return null;
    }

    return sb.toString();
  }

  /**
   * Get order by clause.
   *
   * @param orderBy column order
   * @param defaultOrderBy asc/desc
   * @param direction column default order
   * @return string
   */
  public static String getOrderByString(String orderBy, String direction, String defaultOrderBy) {

    String temp = getOrderByString(orderBy, direction);
    if (StringUtils.isEmpty(temp)) {
      return "ORDER BY " + defaultOrderBy;
    }
    return temp;
  }

  /**
   * CamelCase string to snake_case.
   *
   * @param camel string.
   */
  public static final String camelToSnake(final String camel) {
    if (StringUtils.isEmpty(camel)) {
      return camel;
    }
    final StringBuilder sb = new StringBuilder(camel.length() + camel.length());
    for (int i = 0; i < camel.length(); i++) {
      final char c = camel.charAt(i);
      if (Character.isUpperCase(c)) {
        sb.append(sb.length() != 0 ? '_' : "").append(Character.toLowerCase(c));
      } else {
        sb.append(Character.toLowerCase(c));
      }
    }
    return sb.toString();
  }

  /**
   * snake_case convert to CamelCase string.
   *
   * @param snake string.
   */
  public static final String snakeToCamel(final String snake) {
    if (StringUtils.isEmpty(snake)) {
      return snake;
    }
    final StringBuilder sb = new StringBuilder(snake.length() + snake.length());
    for (int i = 0; i < snake.length(); i++) {
      final char c = snake.charAt(i);
      if (c == '_') {
        sb.append((i + 1) < snake.length() ? Character.toUpperCase(snake.charAt(++i)) : "");
      } else {
        sb.append(sb.length() == 0 ? Character.toUpperCase(c) : Character.toLowerCase(c));
      }
    }
    return sb.toString();
  }

  /**
   * Convert Boolean to Flag.
   *
   * @param input boolean
   * @return flag
   */
  public static final String booleanToFlag(Boolean input) {
    if (ObjectUtils.isEmpty(input)) {
      return CoreConst.FLG_N;
    }
    return Boolean.TRUE.equals(input) ? CoreConst.FLG_Y : CoreConst.FLG_N;
  }

  /**
   * Convert Boolean to Flag keep null.
   *
   * @param input boolean
   * @param keepNull options keep null
   * @return flag
   */
  public static final String booleanToFlag(Boolean input, boolean keepNull) {
    if (keepNull && ObjectUtils.isEmpty(input)) {
      return null;
    }
    if (ObjectUtils.isEmpty(input)) {
      return CoreConst.FLG_N;
    }
    return Boolean.TRUE.equals(input) ? CoreConst.FLG_Y : CoreConst.FLG_N;
  }

  /**
   * Convert Flag to boolean.
   *
   * @param input Flag
   * @return boolean
   */
  public static final boolean flagToBoolean(String input) {
    return CoreConst.FLG_Y.equals(input);
  }

  /**
   * Convert String to BigDecimal.
   */
  public static BigDecimal stringToBigDecimal(String value) {
    if (!StringUtils.isEmpty(value)) {
      return new BigDecimal(value);
    }
    return null;
  }

  /**
   * Convert null to BigDecimal zero.
   */
  public static BigDecimal nullToZero(BigDecimal value) {
    if (value != null) {
      return value;
    }
    return BigDecimal.ZERO;
  }

  /**
   * Convert BigDecimal to String.
   */
  public static String bigDecimalToString(BigDecimal value) {
    if (value != null) {
      return String.valueOf(value);
    }
    return null;
  }
}
