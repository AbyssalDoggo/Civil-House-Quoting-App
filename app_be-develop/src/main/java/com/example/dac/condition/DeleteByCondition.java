package com.example.dac.condition;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * @author Ba Vuong
 *
 */
@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class DeleteByCondition {

  private String packageId;

}
