package com.company.enterprise.dto.cto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CtoDashboardDTO {
    private List<StatCardDTO> kpis;
    private List<VelocityDTO> velocityData;
    private List<SquadDTO> activeSquads;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StatCardDTO {
        private String title;
        private String value;
        private String trend;
        private String trendType;
        private String icon;
        private String color;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VelocityDTO {
        private String sprint;
        private int frontend;
        private int backend;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SquadDTO {
        private String name;
        private String lead;
        private int members;
        private int velocity;
        private String status;
    }
}
