package com.company.enterprise.service.cto;

import com.company.enterprise.dto.cto.CtoDashboardDTO;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class CtoService {

    public CtoDashboardDTO getDashboardData() {
        return new CtoDashboardDTO(
            Arrays.asList(
                new CtoDashboardDTO.StatCardDTO("Total Engineering Squads", "14", "120 Engineers", "up", "💻", "blue"),
                new CtoDashboardDTO.StatCardDTO("Average Sprint Velocity", "84 pts", "+8 pts QoQ", "up", "📈", "emerald"),
                new CtoDashboardDTO.StatCardDTO("System Uptime", "99.99%", "Multi-region AWS", "up", "⚡", "purple"),
                new CtoDashboardDTO.StatCardDTO("Open P1 Bugs", "0", "Resolved", "up", "🐛", "amber"),
                new CtoDashboardDTO.StatCardDTO("Cloud Cost", "₹14,500/mo", "-5% MoM", "down", "☁️", "sky"),
                new CtoDashboardDTO.StatCardDTO("Security Incidents", "0", "All Clear", "up", "🛡️", "emerald"),
                new CtoDashboardDTO.StatCardDTO("API Success Rate", "99.99%", "Optimal", "up", "🔌", "blue"),
                new CtoDashboardDTO.StatCardDTO("Tech Debt Score", "A+", "Refactored", "up", "🧹", "purple")
            ),
            Arrays.asList(
                new CtoDashboardDTO.VelocityDTO("Sprint 37", 38, 42),
                new CtoDashboardDTO.VelocityDTO("Sprint 38", 40, 44),
                new CtoDashboardDTO.VelocityDTO("Sprint 39", 42, 45),
                new CtoDashboardDTO.VelocityDTO("Sprint 40", 41, 48),
                new CtoDashboardDTO.VelocityDTO("Sprint 41", 45, 50),
                new CtoDashboardDTO.VelocityDTO("Sprint 42", 48, 52)
            ),
            Arrays.asList(
                new CtoDashboardDTO.SquadDTO("Core Auth & RBAC Squad", "Michael Chang", 8, 48, "HEALTHY"),
                new CtoDashboardDTO.SquadDTO("AI Monitoring & Inference Squad", "Dr. Aris Thorne", 12, 64, "HEALTHY"),
                new CtoDashboardDTO.SquadDTO("Enterprise Billing & Finance Squad", "Sarah Jenkins", 6, 36, "HEALTHY"),
                new CtoDashboardDTO.SquadDTO("Mobile App & Native Agent Squad", "David Ross", 10, 52, "WARNING")
            )
        );
    }
}
