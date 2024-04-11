package com.example.common.util;

import org.apache.commons.lang3.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.YearMonth;
import java.time.chrono.JapaneseChronology;
import java.time.format.DateTimeFormatter;

/**
 * 日付、時刻に関する共通部品.
 *
 * @author masataka.higashijima
 *
 */
public class DateUtils {

  /**
   * 機関の月数を返す。月数に満たない日数は小数として返す。開始日付 ＞ 終了日付の場合は負の値で返す.
   *
   * @param date1 開始日付
   * @param date2 終了日付
   * @return 月数
   */
  public static Double getMonthsBetween(LocalDate date1, LocalDate date2) {
    int y1 = date1.getYear();
    int m1 = date1.getMonthValue();
    int d1 = date1.getDayOfMonth();
    int y2 = date2.getYear();
    int m2 = date2.getMonthValue();
    int d2 = date2.getDayOfMonth();
    Period period = Period.between(LocalDate.of(y1, m1, 1), LocalDate.of(y2, m2, 1));
    int date = d2 - d1;

    if (isEndObMonth(date1, date2)) {
      date = 0;
    }

    Double ret = (double) (period.getYears() * 12 + period.getMonths()) + (double) (date) / 31.0d;

    return ret;

  }

  /**
   * 2つの日付がともに月末であるかを判定する.
   *
   * @param date1 日付1
   * @param date2 日付2
   * @return True if 2つの日付がともに月末である
   */
  private static boolean isEndObMonth(LocalDate date1, LocalDate date2) {
    return date1.plusDays(1).getDayOfMonth() == 1 && date2.plusDays(1).getDayOfMonth() == 1;
  }

  /**
   * フォーマット化された日付を返却する.
   *
   * @param date 日付
   * @param format 日付のフォーマット
   * @return 指定フォーマットの日付
   */
  public static String getFormattedLocalDate(LocalDate date, String format) {
    if (date == null) {
      return null;
    }
    return date.format(DateTimeFormatter.ofPattern(format));
  }

  /**
   * フォーマット化された日付を元号で返却する.
   *
   * @param date 日付
   * @param format 日付のフォーマット
   * @return 指定フォーマットの日付
   */
  public static String getFormattedLocalDateByEraName(LocalDate date, String format) {
    if (date == null) {
      return null;
    }
    return date
        .format(DateTimeFormatter.ofPattern(format).withChronology(JapaneseChronology.INSTANCE));
  }

  /**
   * フォーマット化された日付時間を返却する.
   *
   * @param dateTime 日付時間
   * @param format 日付時間のフォーマット
   * @return 指定フォーマットの日付時間
   */
  public static String getFormattedLocalDateTime(LocalDateTime dateTime, String format) {
    if (dateTime == null) {
      return null;
    }
    return dateTime.format(DateTimeFormatter.ofPattern(format));
  }

  /**
   * 日付時間を返却する.
   *
   * @param value 日付文字列
   * @param format 日付のフォーマット
   * @return 日付
   */
  public static LocalDate getLocalDate(String value, String format) {
    if (StringUtils.isBlank(value)) {
      return null;
    }
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
    return LocalDate.parse(value, formatter);
  }

  /**
   * 日付時間を返却する.
   *
   * @param value 日付時間文字列
   * @param format 日付時間のフォーマット
   * @return 日付時間
   */
  public static LocalDateTime getLocalDateTime(String value, String format) {
    if (StringUtils.isBlank(value)) {
      return null;
    }
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
    return LocalDateTime.parse(value, formatter);
  }

  /**
   * 日付がともに月末であるかを判定する.
   *
   * @param date1 日付
   * @return True if 日付がともに月末である
   */
  public static boolean isEndOfMonth(LocalDate date) {
    return date.plusDays(1).getDayOfMonth() == 1;
  }

  /**
   * 日付がともに月初であるかを判定する.
   *
   * @param date 日付
   * @return True if 日付がともに月初である
   */
  public static boolean isFirtDateOfMonth(LocalDate date) {
    return date.getDayOfMonth() == 1;
  }

  /**
   * 日付を変換する.
   *
   * @param value 日付
   * @param sourceFormat 日付のフォーマット
   * @param desFormat 日付のフォーマット
   * @return 年月文字
   */
  public static String convertDate(String value, String sourceFormat, String desFormat) {
    if (StringUtils.isBlank(value)) {
      return null;
    }
    LocalDate localDate = LocalDate.parse(value, DateTimeFormatter.ofPattern(sourceFormat));
    return localDate.format(DateTimeFormatter.ofPattern(desFormat));
  }

  /**
   * 年月を変換する.
   *
   * @param value 年月
   * @param sourceFormat 年月のフォーマット
   * @param desFormat 年月のフォーマット
   * @return 年月文字
   */
  public static String convertYearMonth(String value, String sourceFormat, String desFormat) {
    if (StringUtils.isBlank(value)) {
      return null;
    }
    YearMonth yearMonth = YearMonth.parse(value, DateTimeFormatter.ofPattern(sourceFormat));
    return yearMonth.format(DateTimeFormatter.ofPattern(desFormat));
  }

  /**
   * 年月を返却する.
   *
   * @param value 年月文字
   * @param format 年月のフォーマット
   * @return 年月
   */
  public static YearMonth getYearMonth(String value, String format) {
    if (StringUtils.isBlank(value)) {
      return null;
    }
    return YearMonth.parse(value, DateTimeFormatter.ofPattern(format));
  }

  /**
   * 年月文字を返却する.
   *
   * @param value 年月
   * @param format 年月のフォーマット
   * @return 年月文字
   */
  public static String getFormattedYearMonth(YearMonth value, String format) {
    if (value == null) {
      return null;
    }
    return value.format(DateTimeFormatter.ofPattern(format));
  }
}
