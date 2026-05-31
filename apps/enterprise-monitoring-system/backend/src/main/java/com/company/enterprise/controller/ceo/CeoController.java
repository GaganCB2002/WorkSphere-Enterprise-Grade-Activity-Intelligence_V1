package com.company.enterprise.controller.ceo;

import com.company.enterprise.dto.ceo.KpiResponseDTO;
import com.company.enterprise.service.ceo.CeoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/ceo")
public class CeoController {

    private final CeoService ceoService;

    @Autowired
    public CeoController(CeoService ceoService) {
        this.ceoService = ceoService;
    }

    @GetMapping("/kpis")
    public ResponseEntity<Map<String, KpiResponseDTO>> getKpis() {
        return ResponseEntity.ok(ceoService.getKpis());
    }

    @GetMapping("/company-overview")
    public ResponseEntity<Map<String, Object>> getCompanyOverview() {
        return ResponseEntity.ok(ceoService.getCompanyOverview());
    }
}
