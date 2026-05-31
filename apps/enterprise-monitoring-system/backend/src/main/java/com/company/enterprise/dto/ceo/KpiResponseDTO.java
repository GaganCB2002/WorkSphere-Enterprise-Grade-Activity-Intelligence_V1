package com.company.enterprise.dto.ceo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KpiResponseDTO {
    private String title;
    private String value;
    private String trend;
    private String trendType;
    private String prevMonth;
    private String prevYear;
    private String forecast;
    private String aiRec;
}
