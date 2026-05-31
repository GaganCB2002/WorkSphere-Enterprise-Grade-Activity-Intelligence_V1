package com.company.enterprise.service.ceo;

import com.company.enterprise.dto.ceo.KpiResponseDTO;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CeoService {

    public Map<String, KpiResponseDTO> getKpis() {
        Map<String, KpiResponseDTO> kpis = new HashMap<>();
        
        kpis.put("totalRevenue", new KpiResponseDTO(
                "TOTAL REVENUE", "₹24.8B", "+12.4%", "up", "₹22.1B", "₹19.8B", "₹25.6B", 
                "Global revenue is trending 4.2% above forecasts, driven by strong APAC performance."
        ));
        kpis.put("netProfit", new KpiResponseDTO(
                "NET PROFIT", "₹4.2B", "+8.1%", "up", "₹3.8B", "₹3.2B", "₹4.5B", 
                "Supply chain disruptions in EU manufacturing are posing a moderate risk to Q4 margins."
        ));
        kpis.put("grossMargin", new KpiResponseDTO(
                "GROSS MARGIN %", "68.4%", "-1.2%", "down", "69.6%", "70.2%", "68.0%", 
                "AI recommends reallocating logistics budget to expedited air freight for critical components."
        ));
        kpis.put("opex", new KpiResponseDTO(
                "OPEX", "₹1.1B", "-3.4%", "up", "₹1.2B", "₹1.4B", "₹1.0B", 
                "Maintain operating costs below ₹1.2B to optimize EBITDA margin."
        ));
        kpis.put("marketCap", new KpiResponseDTO(
                "MARKET CAP", "₹142B", "+15.2%", "up", "₹135B", "₹120B", "₹150B", 
                "Excellent liquid reserves and valuation multipliers."
        ));
        kpis.put("globalHeadcount", new KpiResponseDTO(
                "GLOBAL HEADCOUNT", "12,450", "+2.1%", "up", "12,190", "11,500", "12,800", 
                "Hiring pipeline indicates tech lead onboarding is tracking on schedule."
        ));
        kpis.put("csatScore", new KpiResponseDTO(
                "CSAT SCORE", "94.2", "+0.8", "up", "93.4", "91.2", "95.0", 
                "Slight customer satisfaction uptick due to automated IT helpdesk SLA resolutions."
        ));
        kpis.put("riskIndex", new KpiResponseDTO(
                "RISK INDEX", "Low", "Stable", "flat", "Low", "Medium", "Low", 
                "Stable across all business regions. Monitor EU supply chain triggers."
        ));

        return kpis;
    }

    public Map<String, Object> getCompanyOverview() {
        Map<String, Object> overview = new HashMap<>();
        overview.put("healthScore", 92);
        
        // Constructing mock data matching the frontend's expected format
        Map<String, Object> charts = new HashMap<>();
        charts.put("buPerformance", new Object[] {
            Map.of("region", "Americas", "revenue", 428.5, "margin", 32.4, "growth", "+4.2%", "status", "On Target"),
            Map.of("region", "EMEA", "revenue", 312.0, "margin", 28.1, "growth", "-0.8%", "status", "Stable"),
            Map.of("region", "APAC", "revenue", 185.2, "margin", 22.5, "growth", "-2.1%", "status", "At Risk")
        });
        overview.put("charts", charts);

        return overview;
    }
}
