package com.example.Calculator.resource;

import com.example.Calculator.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;

@RestController
public class CalculatorController
{
    private final CalculatorService myservice;

    @Autowired
    public CalculatorController(CalculatorService service)
    {
        this.myservice = service;
    }

    @CrossOrigin
    @GetMapping("/add/{k1}/{k2}/")
    public String Add(@PathVariable String k1, @PathVariable String k2)
    {
        double d1 = Double.parseDouble(k1);
        double d2 = Double.parseDouble(k2);
        double d3 = this.myservice.add(d1, d2);
        return Double.toString(d3);
    }
    @CrossOrigin
    @GetMapping("/div/{k1}/{k2}/")
    public String Divide(@PathVariable String k1, @PathVariable String k2)
    {
        double d1 = Double.parseDouble(k1);
        double d2 = Double.parseDouble(k2);
        double d3 = this.myservice.div(d1, d2);
        return Double.toString(d3);
    }
    @CrossOrigin
    @GetMapping("/mul/{k1}/{k2}/")
    public String Multiply(@PathVariable String k1, @PathVariable String k2)
    {
        double d1 = Double.parseDouble(k1);
        double d2 = Double.parseDouble(k2);
        double d3 = this.myservice.mul(d1, d2);
        return Double.toString(d3);
    }
    @CrossOrigin
    @GetMapping("/sub/{k1}/{k2}/")
    public String Subtract(@PathVariable String k1, @PathVariable String k2)
    {
        double d1 = Double.parseDouble(k1);
        double d2 = Double.parseDouble(k2);
        double d3 = this.myservice.sub(d1, d2);
        return Double.toString(d3);
    }
    @CrossOrigin
    @GetMapping("/square/{k}/")
    public String Square(@PathVariable String k)
    {
        double d = Double.parseDouble(k);
        double d3 = this.myservice.square(d);
        System.out.println(d3);
        return Double.toString(d3);
    }

    @CrossOrigin
    @GetMapping("/root/{k}/")
    public String Root(@PathVariable String k)
    {
        double d = Double.parseDouble(k);
        double d3 = this.myservice.root(d);
        return Double.toString(d3);
    }
    @CrossOrigin
    @GetMapping("/reciprocal/{k}/")
    public String Reciprocal(@PathVariable String k)
    {
        double d = Double.parseDouble(k);
        double d3 = this.myservice.reciprocal(d);
        return Double.toString(d3);
    }
    @CrossOrigin
    @GetMapping("/percent/{k}/")
    public String Percent(@PathVariable String k)
    {
        double d = Double.parseDouble(k);
        double d3 = this.myservice.percent(d);
        return Double.toString(d3);
    }
    @GetMapping("/")
    public String welcome()
    {
        return "HELLO WORLD";
    }
}
