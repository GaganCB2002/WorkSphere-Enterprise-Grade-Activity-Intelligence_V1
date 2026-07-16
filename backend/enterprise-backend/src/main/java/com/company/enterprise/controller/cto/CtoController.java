package com.company.enterprise.controller.cto;

import com.company.enterprise.dto.cto.CtoDashboardDTO;
import com.company.enterprise.service.cto.CtoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cto")
public class CtoController {

    private final CtoService ctoService;

    @Autowired
    public CtoController(CtoService ctoService) {
        this.ctoService = ctoService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<CtoDashboardDTO> getDashboard() {
        return ResponseEntity.ok(ctoService.getDashboardData());
    }
}
